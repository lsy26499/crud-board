import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Main } from '../../compoentns';
import { Pagination } from '@material-ui/lab';
import { actions } from '../../modules/store';
import { formatDistance } from 'date-fns';
import './index.scss';

const Home = () => {
  const { posts, pagination, search } = useSelector((state) => state.board);
  const { page, pageSize, totalPages } = pagination;
  const dispatch = useDispatch();
  const history = useHistory();

  const onClickPost = (id) => {
    history.push(`/post/${id}`);
  };

  const onChangePagination = (e, page) => {
    dispatch(actions.getPostList({ page: page - 1, pageSize, search }));
  };

  const onClickButton = async () => {};

  useEffect(() => {
    dispatch(actions.getPostList({ page, pageSize, search }));
  }, []);

  return (
    <div className='home'>
      <Header />
      <Main>
        <div onClick={onClickButton}>결제 테스트</div>
        <div className='main-wrapper'>
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
                </div>
              </li>
            ))}
          </ul>
          <div className='pagination'>
            <Pagination
              shape='rounded'
              count={totalPages}
              page={page + 1}
              onChange={onChangePagination}
            />
          </div>
        </div>
      </Main>
    </div>
  );
};

export default Home;
