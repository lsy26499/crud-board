const FileType = require('file-type');
const path = require('path');

module.exports = {
  validateEmail: (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  },
  checkFileType: async (req, file, callback) => {
    //! 업로드 이전에 req에 접근해서 파일 빼온 뒤 validation 해야 함
    console.log(req);
    // const { body } = req;
    // console.log(JSON.stringify(body));
    // const type = await FileType.fromFile(file);
    // const mimeType = type.mime.split('/')[0];
    // const isImage = mimeType === 'image';
    // if (isImage) {
    //   callback(null, true);
    // } else {
    //   callback('이미지만 업로드 가능');
    // }
  },
};
