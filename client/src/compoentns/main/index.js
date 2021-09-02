import './index.scss';

const Main = ({ children }) => {
  return (
    <main className='main'>
      <div className='main-container'>{children}</div>
    </main>
  );
};

export default Main;
