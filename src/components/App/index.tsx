import React, { useEffect, useState } from 'react'

import Header from '../Header'
import Main from '../Main'
import Preloader from '../Preloader'
import UserListPage from '../UserListPage'
import './styles.scss'

const MIN_PRELOADER_TIME = 3000

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [isMinPreloaderTimeCompleted, setIsMinPreloaderTimeCompleted] = useState(false)

  // For showing preloader at least for MIN_PRELOADER_TIME
  useEffect(() => {
    setTimeout(() => {
      setIsMinPreloaderTimeCompleted(true)
    }, MIN_PRELOADER_TIME)
  }, [])

  // For hiding preloader when initial list is loaded and MIN_PRELOADER_TIME is completed
  useEffect(() => {
    if (isPageLoaded && isMinPreloaderTimeCompleted) {
      setIsAppLoading(false)
    }
  }, [isPageLoaded, isMinPreloaderTimeCompleted])

  return (
    <div className="app">
      <Header title="Users" />
      <Main>
        <UserListPage onPageLoaded={() => setIsPageLoaded(true)} />
      </Main>
      {isAppLoading && <Preloader />}
    </div>
  )
}

export default App
