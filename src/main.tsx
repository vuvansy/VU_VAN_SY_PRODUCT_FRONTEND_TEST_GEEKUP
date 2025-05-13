import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AlbumPage from '@/pages/admin/manage.album';
import UserPage from '@/pages/admin/manage.user';
import LayoutAdmin from 'components/layout/layout.admin';
import DetailAlbums from 'components/albums/detail.album';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <Navigate to="/albums" />,
      },
      {
        path: "/albums",
        element: <AlbumPage />,
      },
      {
        path: "/albums/:id",
        element: <DetailAlbums />,
      },
      {
        path: "/users",
        element: <UserPage />,
      },

    ]
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
