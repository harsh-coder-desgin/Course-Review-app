import CreatorHeader from '../components/Header/CreaterHeader';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/index';

const CreatorLayout = () => {
  return (
    <>
      <div className='flex flex-wrap'>
        <CreatorHeader />
        <main className='flex-auto'>
          <Outlet />
        </main>
      </div>
        <Footer />
    </>

  );
};

export default CreatorLayout;
