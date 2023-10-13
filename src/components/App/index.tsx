import React, { useEffect } from 'react'

import Header from '../Header'
import Main from '../Main'
import Preloader from '../Preloader'
import './styles.scss'

function App() {
  const [isAppLoading, setIsAppLoading] = React.useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsAppLoading(false)
    }, 3000)
  }, [])
  return (
    <div className="app">
      <Header title="Users" />
      <Main />
      {isAppLoading && <Preloader />}
    </div>
  )
}

export default App
