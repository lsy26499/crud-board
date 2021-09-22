const FileType = require('file-type');

module.exports = {
  validateEmail: (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  },
  checkFileLength: (files) => {
    if (files.length > 10) {
      throw new Error('파일 개수 초과');
    } else {
      return files;
    }
  },
  checkFileType: async (files) => {
    let checkedFiles = [];
    for (let file of files) {
      const type = await FileType.fromFile(file.path);
      const mimeType = type.mime.split('/')[0];
      const isImage = mimeType === 'image';
      if (isImage) {
        checkedFiles.push(file);
      }
    }
    if (files.length > checkedFiles.length) {
      throw new Error('이미지 파일만 업로드 가능');
    } else {
      return checkedFiles;
    }
  },
  checkFileSize: (files) => {
    const limitPerFile = 1024 * 1024 * 10;
    const checkedFiles = files.filter((image) => image.size <= limitPerFile);
    if (checkedFiles.length < files.length) {
      throw new Error('10MB 초과하는 파일 존재');
    } else {
      return files;
    }
  },
};
