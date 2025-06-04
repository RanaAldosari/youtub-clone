import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router';
import NavbarMain from '../component/NavbarMain';
import Home from '../pages/Home';
import Signup from '../account/Signup';
import Video from '../pages/Video';
import HomeSign from '../pages/HomeSign';
import VideoSign from '../pages/VideoSign';
function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/sign', element: <Signup /> },
    { path: '/video/:id', element: <Video /> },
    {path:"/home",
      element:<HomeSign></HomeSign>
    },{
      path:'/vedsign/:id',
      element:<VideoSign></VideoSign>
    }
    ],
  },
]);

function Router() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default Router;
