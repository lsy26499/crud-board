import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Main, PostHeader } from '../../compoentns';
import { actions } from '../../modules/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { checkImageSize, checkImageMimeType } from '../../utils';
import './index.scss';

const UpdatePost = () => {
  const { currentPost } = useSelector((state) => state.board);
  const { id, title, content, summary, images: postImages } = currentPost;
  const imageUrls = postImages.map((image) => image.url);

  const [values, setValues] = useState({
    title,
    content,
    summary,
  });
  const [images, setImages] = useState([]);
  const imageInputRef = useRef();
  const dispatch = useDispatch();

  const onChangeValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onChangeImage = async (e) => {
    const files = e.target.files;
    let slicedFiles = [];
    if (images.length + files.length > 10) {
      alert('이미지는 최대 10개까지 업로드 가능합니다');
      const length = 10 - images.length;
      slicedFiles = [...files].slice(0, length);
    } else {
      slicedFiles = [...files];
    }

    if (slicedFiles.length > 0) {
      let selectedFiles = [];
      for (let file of slicedFiles) {
        const isImage = await checkImageMimeType(file);
        if (isImage) {
          const url = URL.createObjectURL(file);
          selectedFiles.push({ file, url });
        } else {
          alert('이미지 파일만 업로드할 수 있습니다');
        }
      }
      const checkedImages = checkImageSize(selectedFiles);
      setImages([...images, ...checkedImages]);
    }
    imageInputRef.current.value = '';
  };

  const onRemoveImage = (i) => {
    imageInputRef.current.value = '';
    const newImages = images.filter((url, index) => i !== index);
    setImages(newImages);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (values.title.trim() === '') {
      alert('제목을 입력해주세요');
      return;
    }
    const files = images.map((image) => image.file || image.url);
    dispatch(
      actions.updatePost({
        id,
        title: values.title,
        content: values.content,
        summary: values.summary,
        images: files,
      })
    );
  };

  const getImageBlobUrl = (url) => {
    return new Promise((res, rej) => {
      fetch(url)
        .then((r) => r.blob())
        .then((blob) => res({ blob, url }))
        .catch((err) => {
          console.log(err);
          rej(err);
        });
    });
  };

  const getFileUrlFromBlob = (item) => {
    const { blob, url } = item;
    const fileName =
      postImages.find((image) => image.url === url).name ||
      `${new Date().getTime()}.jpg`;
    const ext = fileName.split('.')[1];
    const metadata = { type: `image/${ext}` };
    return new File([blob], fileName, metadata);
  };

  useEffect(() => {
    const promises = imageUrls.map((url) => getImageBlobUrl(url));
    Promise.all(promises)
      .then((data) => {
        const files = data.map((item) => {
          const file = getFileUrlFromBlob(item);
          return {
            // file: file,
            url: item.url,
          };
        });
        setImages(files);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <PostHeader onSubmit={onSubmit} />
      <Main>
        <section className='update-post'>
          <form className='form' onSubmit={onSubmit}>
            <input
              name='title'
              value={values.title}
              placeholder='제목'
              onChange={onChangeValues}
            ></input>
            <input
              name='summary'
              value={values.summary}
              placeholder='1줄 요약'
              onChange={onChangeValues}
            ></input>
            <div className='form-item file'>
              <input
                ref={imageInputRef}
                name='file'
                type='file'
                accept='image/*'
                multiple='multiple'
                onChange={onChangeImage}
              ></input>
              <div className='file-upload-button'></div>
              {images.length > 0 && (
                <ul className='images'>
                  {images.map((image, i) => (
                    <li
                      className='image'
                      key={i}
                      onClick={() => onRemoveImage(i)}
                    >
                      <img src={image.url} />
                      <div className='icon'>
                        <FontAwesomeIcon icon={faTimes} size='sm' />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <textarea
              name='content'
              value={values.content}
              onChange={onChangeValues}
            ></textarea>
          </form>
        </section>
      </Main>
    </div>
  );
};

export default UpdatePost;
