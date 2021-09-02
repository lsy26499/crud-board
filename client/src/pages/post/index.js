import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Header, Main } from '../../compoentns';
import { actions } from '../../modules/store';
import { formatDistance } from 'date-fns';
import './index.scss';

const Post = () => {
  const { user } = useSelector((state) => state.auth);
  const { currentPost } = useSelector((state) => state.board);
  const { title, userId, content, createdAt, summary } = currentPost;
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
      <Header />
      <Main>
        <section className='post'>
          <section className='post-content'>
            <h1 className='title'>{title}</h1>
            <p className='summary'>{summary}</p>
            <div className='title-desc'>
              <span>{`by ${userId}`}</span>
              {createdAt && (
                <span>
                  {`${formatDistance(new Date(createdAt), new Date())} ago`}
                </span>
              )}
            </div>
            <main className='content'>{content}</main>
          </section>
          {user.userId === userId && (
            <ul className='nav-buttons'>
              <li onClick={onClickUpdateButton}>수정</li>
              <li onClick={onClickDeleteButton}>삭제</li>
            </ul>
          )}
        </section>
      </Main>
    </div>
  );
};

export default Post;
