import { FC, useEffect, useState } from 'react'
import AppRouter from './components/Router/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/GeneralComponents/Navbar'
import { useAppDispatch } from './hooks/reduxHooks'
import { checkAuthThunk } from './store/action-creators/checkAuthThunk'
import Footer from './components/GeneralComponents/Footer'

const App: FC = () => {

  const dispatch = useAppDispatch();

  const [loadingCheck, setLoadingCheck] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      await dispatch(checkAuthThunk())
      setLoadingCheck(false)
    })()
  }, [])

  if (loadingCheck) {
    return <main className='mainContainer'>
      <div className='contentWrapper'>
      </div>
    </main>
  }


  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
      <Footer />
    </BrowserRouter >
  )
}

export default App