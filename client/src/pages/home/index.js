import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Main } from '../../compoentns';
import { actions } from '../../modules/store';
import { formatDistance } from 'date-fns';
import './index.scss';

const Home = () => {
  const { posts } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const history = useHistory();

  const onClickPost = (id) => {
    history.push(`/post/${id}`);
  };

  useEffect(() => {
    dispatch(actions.getPostList());
  }, []);

  return (
    <div className='home'>
      <Header />
      <Main>
        <ul className='article-container'>
          {posts.map((post) => (
            <li
              className='article-card'
              key={post.id}
              onClick={() => onClickPost(post.id)}
            >
              <h3 className='article-title'>{post.title}</h3>
              <p className='article-summary'>{post.summary}</p>
              <div className='article-desc'>
                <span className='article-username'>{`by ${post.userId}`}</span>
                <span className='article-created-at'>
                  {`${formatDistance(
                    new Date(post.createdAt),
                    new Date()
                  )} ago`}
                </span>
                {/* <span className='article-end-date'>{post.endDate}</span> */}
              </div>
            </li>
          ))}
        </ul>
      </Main>
    </div>
  );
};

export default Home;
