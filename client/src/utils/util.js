import FileType from 'file-type/browser';

export const validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};

export const checkValueEmpty = (values) => {
  return Boolean(
    Object.keys(values).filter((value) => !value || value.trim() === '').length
  );
};

export const checkRequiredValueExist = (errors) => {
  const inputNames = Object.keys(errors);
  return Boolean(
    inputNames.filter((key) => errors[key]?.type === 'required').length
  );
};

export const checkImageMimeType = async (file) => {
  const type = await FileType.fromBlob(file);
  const mimeType = type.mime.split('/')[0];
  return mimeType === 'image';
};

export const checkImageSize = (images) => {
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
