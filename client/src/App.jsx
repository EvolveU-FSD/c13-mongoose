import './App.css'
import HomePage from './pages/HomePage'
import TractorsPage from './pages/TractorsPage'
import MyProjectPage from './pages/MyProjectPage'
import LoginPage from './pages/LoginPage'
import { useUser, WhenLoggedIn, WhenNotLoggedIn, WithLogin } from './LoginContext'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

function AppRoutes() {
    const user = useUser()
    return (
      <Routes>
        <Route index element={ <HomePage /> }/>
        <Route path="tractors" element= { <TractorsPage /> } />
        { !user && <Route path="my-project" element= { <LoginPage /> } /> }
        { user && <Route path="my-project" element= { <MyProjectPage /> } /> }
        { user && <Route path="login" element= { <Navigate to='/' /> } /> }
        <Route path="login" element= { <LoginPage /> } />
        <Route path="*" element={ <Navigate to='/' />} /> */}
      </Routes>
    )
}

function App() {

  return (
    <BrowserRouter>
      <WithLogin >
        <AppRoutes />
      </WithLogin>
    </BrowserRouter>
  )
}

export default App
