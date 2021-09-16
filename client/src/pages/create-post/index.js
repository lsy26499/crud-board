import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Main, PostHeader } from '../../compoentns';
import { actions } from '../../modules/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { checkImageSize } from '../../utils';
import './index.scss';

const CreatePost = () => {
  const [values, setValues] = useState({
    title: '',
    summary: '',
    content: '',
  });
  const [images, setImages] = useState([]);
  const imageInputRef = useRef();
  const dispatch = useDispatch();

  const onChangeValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onChangeImage = (e) => {
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
        const url = URL.createObjectURL(file);
        selectedFiles.push({ file, url });
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

    const files = images.map((image) => image.file);
    dispatch(
      actions.createPost({
        title: values.title,
        content: values.content,
        summary: values.summary,
        images: files,
      })
    );
  };

  return (
    <div>
      <PostHeader onSubmit={onSubmit} />
      <Main>
        <section className='create-post'>
          <form className='form' onSubmit={onSubmit}>
            <div className='form-item'>
              <input
                name='title'
                placeholder='제목'
                value={values.title}
                onChange={onChangeValues}
              ></input>
            </div>
            <div className='form-item'>
              <input
                name='summary'
                placeholder='1줄 요약'
                value={values.summary}
                onChange={onChangeValues}
              ></input>
            </div>
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
            <div className='form-item'>
              <textarea
                name='content'
                value={values.content}
                onChange={onChangeValues}
              ></textarea>
            </div>
          </form>
        </section>
      </Main>
    </div>
  );
};

export default CreatePost;
