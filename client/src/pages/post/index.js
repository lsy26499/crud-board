import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Header } from '../../compoentns';
import { actions } from '../../modules/store';
import './index.scss';

const Post = () => {
  const { user } = useSelector((state) => state.auth);
  const { currentPost } = useSelector((state) => state.board);
  const { title, userId, content, created_at } = currentPost;
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { id } = params;

  const onClickUpdateButton = () => {
    history.push(`/update-post/${id}`);
  };

  const onClickDeleteButton = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      dispatch(actions.deletePost({ id }));
    }
  };

  useEffect(() => {
    if (!id) {
      history.push('/');
    }
    dispatch(actions.getPost({ id }));
  }, []);

  return (
    <div>
      <Header></Header>
      <section className='post'>
        {user.userId === userId && (
          <div>
            <button onClick={onClickUpdateButton}>수정</button>
            <button onClick={onClickDeleteButton}>삭제</button>
          </div>
        )}
        <h1 className='title'>{title}</h1>
        <div className='title-desc'>
          <h5>{userId}</h5>
          <h5>{created_at}</h5>
        </div>
        <main className='content'>{content}</main>
      </section>
    </div>
  );
};

export default Post;
