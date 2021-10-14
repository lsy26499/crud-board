import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Main } from '../../compoentns';
import { Pagination } from '@material-ui/lab';
import { actions } from '../../modules/store';
import { formatDistance } from 'date-fns';
import './index.scss';

const Home = () => {
  const { isLoggedIn, cid, user } = useSelector((state) => state.auth);
  const { posts, pagination, search } = useSelector((state) => state.board);
  const { orderNumber } = useSelector((state) => state.order);
  const [productId, quantity] = [1, 1];
  const { page, pageSize, totalPages } = pagination;
  const dispatch = useDispatch();
  const history = useHistory();

  const onClickPost = (id) => {
    history.push(`/post/${id}`);
  };

  const onChangePagination = (e, page) => {
    dispatch(actions.getPostList({ page: page - 1, pageSize, search }));
  };

  const onClickButton = () => {
    if (!isLoggedIn) {
      alert('로그인 후에 결제가 가능합니다');
      return;
    }
    dispatch(actions.kakaoPaymentReady({ productId, quantity }));
  };

  const onClickIamportReady = () => {
    if (!isLoggedIn) {
      alert('로그인 후에 결제가 가능합니다');
      return;
    }
    dispatch(actions.imaportPaymentReady({ productId, quantity }));
  };

  const onClickIamport = () => {
    if (!isLoggedIn) {
      alert('로그인 후에 결제가 가능합니다');
      return;
    }
    const IMP = window.IMP;
    IMP.init(cid);

    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: orderNumber,
        name: '테스트',
        amount: quantity * 1000,
        buyer_email: user.email,
        buyer_name: user.userId,
        buyer_tel: '010-0000-0000',
        buyer_addr: '서울특별시 중구',
        buyer_postcode: '01181',
      },
      function (rsp) {
        console.log(rsp);
        if (rsp.success) {
          // 성공 API 요청
          const { paid_amount, imp_uid, merchant_uid } = rsp;
          dispatch(
            actions.imaportPaymentApproval({
              productId,
              quantity,
              paid_amount,
              imp_uid,
              merchant_uid,
            })
          );
        } else {
          // 실패/취소 API 요청
          dispatch(actions.imaportPaymentFailure({ orderNumber }));
        }
      }
    );
  };

  useEffect(() => {
    dispatch(actions.getPostList({ page, pageSize, search }));
  }, []);

  return (
    <div className='home'>
      <Header />
      <Main>
        <div onClick={onClickButton}>카카오페이 결제 테스트</div>
        <div onClick={onClickIamportReady}>아임포트 결제 준비</div>
        {orderNumber && (
          <div onClick={onClickIamport}>아임포트 결제 테스트</div>
        )}
        <div className='main-wrapper'>
          <ul className='article-container'>
            {posts.map((post) => (
              <li
                className='article-card'
                key={post.id}
                onClick={() => onClickPost(post.id)}
              >
                <h3 className='article-title'>{post.title}</h3>
                <p className='article-summary'>
                  {post.hashtag.map((tag) => tag.name).join(', ')}
                </p>
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
