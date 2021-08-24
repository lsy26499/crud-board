import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Header } from '../../compoentns';
import { actions } from '../../modules/store';

const CreatePost = () => {
  const [values, setValues] = useState({
    title: '',
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
    dispatch(
      actions.createPost({ title: values.title, content: values.content })
    );
  };

  return (
    <div>
      <Header></Header>
      <main>
        <form onSubmit={onSubmit}>
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
      </main>
    </div>
  );
};

export default CreatePost;
