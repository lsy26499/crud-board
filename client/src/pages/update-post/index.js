import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../compoentns';
import { actions } from '../../modules/store';

const UpdatePost = () => {
  const { currentPost } = useSelector((state) => state.board);
  const { id, title, content } = currentPost;
  const [values, setValues] = useState({
    title,
    content,
  });
  const dispatch = useDispatch();

  const onChangeValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      actions.updatePost({ id, title: values.title, content: values.content })
    );
  };

  return (
    <div>
      <Header></Header>
      <main className='update-post'>
        <section className='form-section'>
          <form className='update-form' onSubmit={onSubmit}>
            <input
              name='title'
              value={values.title}
              onChange={onChangeValues}
            ></input>
            <textarea
              name='content'
              value={values.content}
              onChange={onChangeValues}
            ></textarea>
            <button type='submit'>저장</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default UpdatePost;
