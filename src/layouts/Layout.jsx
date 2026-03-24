import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {routes} from '../routes';
import { useEffect } from 'react';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const getCurrentRoute = () => {
  let currentRoute = routes.find(route => route.path === location.pathname);
  if (!currentRoute) {
    currentRoute = routes.find(route => {
      if (route.children && location.pathname.startsWith(route.path)) {
        return true;
      }
      return false;
    });
  }
  
  if (!currentRoute) {
    currentRoute = routes.find(route => route.path === '*');
  }
  
  return currentRoute;
};
  
  const currentRoute = getCurrentRoute();

  const showNavigation = currentRoute?.showInNav
  const showInFooter = currentRoute?.showInFooter
  const isAdmin = currentRoute?.isAdmin

  if (isAdmin) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-grey">
      {showNavigation && <Navbar />}
      <main className={`pl-0 mx-auto`}>
        <Outlet />
      </main>
      {showInFooter && <Footer />}
    </div>
  );
};

export default Layout;