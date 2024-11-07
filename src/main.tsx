import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Auth/Login.tsx'
import Signin from './pages/Auth/Signin.tsx'
import Products from './pages/Products.tsx'
import Favorate from './pages/Favorate.tsx'
import OrederList from './pages/OrederList.tsx'
import CreateProduct from './pages/CreateProduct.tsx'
import EditProduct from './pages/EditProduct.tsx'
import Auth from './pages/Auth/Auth.tsx'

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: '',
        element: <Login />,
      },
      {
        path: 'signin',
        element: <Signin />,
      },
    ],
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Products />,
      },
      {
        path: 'createProduct',
        element: <CreateProduct />,
      },
      {
        path: 'edit/:id',
        element: <EditProduct />,
      },
      {
        path: 'favorate',
        element: <Favorate />,
      },
      {
        path: 'orderlist',
        element: <OrederList />,
      },
    ],
  },
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
