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
        element : <Auth/>
      },
      {
        path : "products",
        element : <Products/>
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(

  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>

)
