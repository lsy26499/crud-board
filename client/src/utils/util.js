import FileType from 'file-type/browser';

export const validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};

export const checkIamgeMimeType = async (file) => {
  const type = await FileType.fromBlob(file);
  console.log(type);
};

export const checkImageSize = async (images) => {
  const limitPerFile = 1024 * 1024 * 10;

  const checkedFiles = images.filter(
    (image) => image.file.size <= limitPerFile
  );
  if (checkedFiles.length < images.length) {
    alert(`이미지는 개당 10MB까지 업로드 가능합니다.`);
    return checkedFiles;
  }

  return images;
};
