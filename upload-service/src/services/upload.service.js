const uploadImage = (imgFile) => {
  try {
    return {
      status: true,
      EC: 0,
      message: "Upload image successfully!",
      data: {
        url: imgFile.path,
        filename: imgFile.filename,
      },
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

const uploadAudio = (audioFile) => {
  try {
    return {
      status: true,
      EC: 0,
      message: "Upload audio successfully!",
      data: {
        url: audioFile.path,
        filename: audioFile.filename,
      },
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

module.exports = {
  uploadImage,
  uploadAudio,
};
