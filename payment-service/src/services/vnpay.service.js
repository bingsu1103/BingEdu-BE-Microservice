const {
  VNPay,
  ignoreLogger,
  ProductCode,
  VnpLocale,
  dateFormat,
} = require("vnpay");
const crypto = require("crypto");
const qs = require("qs");

const createVNPayPayment = async (amount, id) => {
  try {
    const vnpay = new VNPay({
      tmnCode: process.env.vnp_TmnCode,
      secureSecret: process.env.vnp_HashSecret,
      vnpayHost: process.env.vnp_Url,
      testMode: true,
      hashAlgorithm: "SHA512",
      loggerFn: ignoreLogger,
    });

    const expire = new Date();
    expire.setTime(expire.getTime() + 10 * 60 * 1000 * 43); // 10 phút
    //có nghĩa là nếu thời gian hiện tại tương đương expire.setTime(expire.getTime() + 10 * 60 * 1000 * 42)
    //và nếu cứ cộng lên 1 thì tăng lên 10 phút với n[0] = 42
    // thông tin thẻ mẫu: https://sandbox.vnpayment.vn/apis/vnpay-demo/

    const vnpayResponse = await vnpay.buildPaymentUrl({
      vnp_Amount: amount,
      vnp_IpAddr: "127.0.0.1",
      vnp_TxnRef: id,
      vnp_OrderInfo: `${id}`,
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: process.env.vnp_Return,
      vnp_Locale: VnpLocale.VN,
      vnp_CreateDate: dateFormat(new Date()),
      vnp_ExpireDate: dateFormat(expire),
    });

    return {
      status: true,
      EC: 0,
      message: "VNPay return successfully!",
      data: vnpayResponse,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: "Error from VNPay or server!",
      data: null,
    };
  }
};
const verifyReturnParams = (query) => {
  const secret = process.env.vnp_HashSecret;
  const params = { ...query };
  const vnp_SecureHash = params.vnp_SecureHash;

  delete params.vnp_SecureHash;
  delete params.vnp_SecureHashType;

  const sorted = Object.keys(params)
    .sort()
    .reduce((acc, k) => ((acc[k] = params[k]), acc), {});
  const signData = qs.stringify(sorted, { encode: true });

  const calcHash = crypto
    .createHmac("sha512", secret)
    .update(Buffer.from(signData, "utf-8"))
    .digest("hex");

  const hashOK =
    String(calcHash).toLowerCase() === String(vnp_SecureHash).toLowerCase();
  const success =
    params.vnp_ResponseCode === "00" && params.vnp_TransactionStatus === "00";

  return { hashOK, success, data: params };
};

module.exports = { createVNPayPayment, verifyReturnParams };
