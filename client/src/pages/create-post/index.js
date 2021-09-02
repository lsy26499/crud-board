import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Main, PostHeader } from '../../compoentns';
import { actions } from '../../modules/store';
import './index.scss';

const CreatePost = () => {
  const [values, setValues] = useState({
    title: '',
    summary: '',
    content: '',
  });
  const dispatch = useDispatch();

  const onChangeValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (values.title.trim() === '') {
      alert('제목을 입력해주세요');
      return;
    }
    dispatch(
      actions.createPost({
        title: values.title,
        content: values.content,
        summary: values.summary,
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
