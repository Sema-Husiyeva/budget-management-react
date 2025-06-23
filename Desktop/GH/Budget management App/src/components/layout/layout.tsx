import Footer from '../common/footer/footer';
import Header from '../common/header/header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  )
}

export default Layout