import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Main, PostHeader } from '../../compoentns';
import { actions } from '../../modules/store';
import './index.scss';

const UpdatePost = () => {
  const { currentPost } = useSelector((state) => state.board);
  const { id, title, content, summary } = currentPost;
  const [values, setValues] = useState({
    title,
    content,
    summary,
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
      actions.updatePost({
        id,
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
