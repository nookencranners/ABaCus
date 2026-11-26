import { useState } from 'react'
import './App.css'

import './scss/main.scss'

import Header from './components/Header'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import TeacherDashboard from './components/TeacherDashboard'

function App() {
  const [isSigning, setIsSigning] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [isViewingDashboard, setViewingDashboard] = useState(false);
  const [count, setCount] = useState(0)
  const [userRole, setUserRole] = useState(0);

  return (
    <>
      <Header/>
      
      {isSigning ? (
        <>
          {isLogging ? (
            <LoginPage
              setIsSigning={setIsSigning}
              setIsLogging={setIsLogging}
              setUserRole={setUserRole}
            />
          ) : (
            <RegisterPage
              setIsSigning={setIsSigning}
              setIsLogging={setIsLogging}
            />
          )}
        </>
      ) : isViewingDashboard ? (
        <>
          <TeacherDashboard
            setViewingDashboard={setViewingDashboard}
          />
        </>
      ) : (
        <>
          <HomePage
            setIsSigning={setIsSigning}
            setIsLogging={setIsLogging}
            setViewingDashboard={setViewingDashboard}
            setUserRole={setUserRole}
          />
        </>
      )}
    </>
  )
}

export default App
