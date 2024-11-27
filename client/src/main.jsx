import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import { Provider } from 'react-redux'
import { store } from './utils/redux/store.js'
import Products from './pages/Products.jsx'
import Protected from './components/Auth/Protected.jsx'
import ForgotPassword from './components/Auth/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Product from './pages/Product.jsx'
import Admin from './pages/Admin.jsx'
import Dashboard from './components/admin/Dashboard.jsx'
import AdminOrders from './components/admin/Orders.jsx'
import AdminProducts from './components/admin/Products.jsx'
import AdminUsers from './components/admin/Users.jsx'
import NotFound from './pages/NotFound.jsx'
//import withRoleAuthorization from './components/Auth/Protected.jsx'

// const AuthenticatedDashboard=withRoleAuthorization(Dashboard,["admin"]);
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path : "auth",
        children : [
          {
            path : "",
            element : <Auth/>
          },
          {
            path : "forgotPassword",
            element :  <ForgotPassword/>
          }
        ]
      },
      {
        path : "products",
        element : <Products/>
      },
      {
        path: 'product/:productId',
        element : <Product/>
      }
    ]
  },
  {
    path : '/password/reset/:token',
    element : <ResetPassword/>
  },{
    path:"admin",
    element: <Protected><Admin/></Protected>,
    children:[
    {
      path:"dashboard",
      element:<Dashboard/>
    },
    {
      path:"products",
      element:<AdminProducts/>
    },
    {
      path:"orders",
      element:<AdminOrders/>
    },
    {
      path:"users",
      element:<AdminUsers/>
    }
    // },{
    //   path:"reviews",
    //   element:<AdminReviews/>
    // 
    ]
  },
  {
    path: "/not-found",
    element : <NotFound/>
  }
])


createRoot(document.getElementById('root')).render(

  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>

)
