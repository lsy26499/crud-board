import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Header } from '../../compoentns';
import { actions } from '../../modules/store';

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
    dispatch(actions.deletePost({ id }));
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
      <div>
        {user.userId === userId && (
          <div>
            <button onClick={onClickUpdateButton}>수정</button>
            <button onClick={onClickDeleteButton}>삭제</button>
          </div>
        )}
        <h1>{title}</h1>
        <div>
          <h5>{userId}</h5>
          <h5>{created_at}</h5>
        </div>
        <main>{content}</main>
      </div>
    </div>
  );
};

export default Post;