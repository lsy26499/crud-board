import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../compoentns';
import { actions } from '../../modules/store';

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
    <div>
      <Header />
      <main>
        {posts.map((post) => (
          <article key={post.id} onClick={() => onClickPost(post.id)}>
            <h3>{post.title}</h3>
            <h4>{post.userId}</h4>
            <span>{post.created_at}</span>
          </article>
        ))}
      </main>
    </div>
  );
};

export default Home;
