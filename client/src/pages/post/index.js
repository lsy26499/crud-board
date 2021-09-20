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
  // const { title, userId, content, createdAt, summary, images, loading } =
  //   currentPost;
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
        {currentPost && (
          <section className='post'>
            {user.userId === currentPost.userId && (
              <ul className='nav-buttons'>
                <li onClick={onClickUpdateButton}>수정</li>
                <li onClick={onClickDeleteButton}>삭제</li>
              </ul>
            )}
            <section className='post-content'>
              <h1 className='title'>{currentPost.title}</h1>
              <p className='summary'>{currentPost.summary}</p>
              <div className='title-desc'>
                <span>{`by ${currentPost.userId}`}</span>
                {currentPost.createdAt && (
                  <span>
                    {`${formatDistance(
                      new Date(currentPost.createdAt),
                      new Date()
                    )} ago`}
                  </span>
                )}
              </div>
              <main className='content'>
                {currentPost.images &&
                  currentPost.images.length > 0 &&
                  currentPost.images.map((image, i) => (
                    <img src={image.url} key={i} />
                  ))}
                <p className='paragraph'>{currentPost.content}</p>
              </main>
            </section>
          </section>
        )}
      </Main>
    </div>
  );
};

export default Post;
