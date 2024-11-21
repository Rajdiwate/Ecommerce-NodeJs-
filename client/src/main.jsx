import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Auth from './components/Auth/Auth.jsx'
import { Provider } from 'react-redux'
import { store } from './utils/redux/store.js'


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
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(

  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>

)
