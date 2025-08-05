const Review = require("../models/review");
const validateReview = require("../utils/validateReview");

const createReview = async (review) => {
  try {
    const { userID, courseID } = review;
    const isValid = await validateReview(userID, courseID);
    if (!isValid.status) {
      return {
        status: false,
        EC: 1,
        message: "Data not valid (userID || courseID)",
        data: null,
      };
    }
    const newReview = await Review.create(review);
    if (!newReview) {
      return {
        status: false,
        EC: 1,
        message: "Create review failed!",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Create review successfully!",
      data: { ...review, rating: Number(review.rating) },
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: 0,
      message: message.error || "ERROR FROM SERVER!",
      data: null,
    };
  }
};

const updateReview = async (id, updatedData) => {
  try {
    const updatedReview = await Review.updateOne({ _id: id }, updatedData);
    if (!updatedReview) {
      return {
        status: false,
        EC: 1,
        message: "Update review failed!",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Update review successfully!",
      data: updatedReview,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    };
  }
};

const deleteReview = async (id) => {
  try {
    const result = await Review.deleteOne({ _id: id });
    if (!result) {
      return {
        status: false,
        EC: 1,
        message: "Delete review failed!",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Delete review successfully!",
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER",
      data: null,
    };
  }
};
const getReview = async (coursesID) => {
  try {
    const listReview = await Review.find({ coursesID: coursesID });
    if (!Array.isArray(listReview) || listReview.length === 0) {
      return {
        status: false,
        EC: -1,
        message: "No data founded",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Get list review successfully!",
      data: listReview,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    };
  }
};

// const getReviewByCourse = async (courseID) => {
//   try {
//     const listReview = await Review.find({ courseID: courseID });
//     if (!listReview) {
//       return {
//         status: false,
//         EC: 1,
//         message: "Empty or not found review",
//         data: null,
//       };
//     }
//     return {
//       status: true,
//       EC: 0,
//       message: "Success!",
//       data: listReview,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       status: false,
//       EC: -1,
//       message: error.message || "ERROR FROM SERVER!",
//       data: null,
//     };
//   }
// };

module.exports = {
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
