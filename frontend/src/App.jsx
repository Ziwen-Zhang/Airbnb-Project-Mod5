import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
// import Spots from './components/Spots/Spots';
import { Spots, SpotDetail, CreateSpot } from './components/Spots';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Spots/>
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetail/>
      },
      {
        path: '/spots/new',
        element: <CreateSpot/>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;