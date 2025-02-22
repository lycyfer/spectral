import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './layout/layout'
import Main from './components/main/main'
import "./assets/styles/main.scss"
import VenuesLoader from './components/venuesLoader/venuesLoader'
import { adminLoader, getHallById, getHalls } from './lib/loader'
import HallById from './components/hallById/hallById'
import Login from './components/auth/login/login'
import Register from './components/auth/register/register'
import Admin from './components/admin/admin'


function App() {

 const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [

      {
        path: '/',
        element: <Main/>
      },

      {
        path: '/all',
        element: <VenuesLoader/>,
        loader: getHalls
      },
      {
        path: '/hall/:id',
        element: <HallById/>,
        loader: getHallById
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/admin',
        element: <Admin/>,
        loader: adminLoader
      }
    ]
  }
 ])

 return (
  <div className='App'>
    <div className='container'>
      <RouterProvider router={router}/>
    </div>
  </div>
 )

}

export default App
