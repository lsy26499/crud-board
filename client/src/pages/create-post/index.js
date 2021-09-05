import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Main, PostHeader } from '../../compoentns';
import { actions } from '../../modules/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

const CreatePost = () => {
  const [values, setValues] = useState({
    title: '',
    summary: '',
    content: '',
    image: null,
  });
  const [imageURL, setImageURL] = useState(null);
  const imageInputRef = useRef();
  const dispatch = useDispatch();

  const onChangeValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onChangeImage = (e) => {
    const files = e.target.files;
    if (files[0]) {
      setValues({ ...values, image: files[0] });
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    }
  };

  const onRemoveImage = () => {
    imageInputRef.current.value = '';
    setImageURL(null);
    setValues({ ...values, image: null });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (values.title.trim() === '') {
      alert('제목을 입력해주세요');
      return;
    }

    const formData = new FormData();
    formData.append('file', values.image);

    dispatch(
      actions.createPost({
        title: values.title,
        content: values.content,
        summary: values.summary,
        image: formData,
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
                // placeholder='1줄 요약'
                onChange={onChangeImage}
              ></input>
              <div className='file-upload-button'></div>
              {imageURL && (
                <ul className='images'>
                  <li className='image' onClick={onRemoveImage}>
                    <img src={imageURL} />
                    <div className='icon'>
                      <FontAwesomeIcon icon={faTimes} size='sm' />
                    </div>
                  </li>
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
