import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import NavBar from './components/NavBar'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import NewAccount from './pages/NewAccount'
import NewTransaction from './pages/NewTransaction'
import NotFound from './pages/404'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter className='min-h-screen'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<NavBar />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/transactions/:id' element={<Transactions />} />
            <Route path='/new-account' element={<NewAccount />} />
            <Route path='/new-transaction' element={<NewTransaction />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
