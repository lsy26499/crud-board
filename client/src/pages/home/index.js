import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../compoentns';
import { actions } from '../../modules/store';
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
      <main className='home-container'>
        <section className='article-container'>
          {posts.map((post) => (
            <article
              className='article-card'
              key={post.id}
              onClick={() => onClickPost(post.id)}
            >
              <h3 className='article-title'>{post.title}</h3>
              <h4 className='article-username'>{post.userId}</h4>
              <span className='article-created-at'>{post.created_at}</span>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
