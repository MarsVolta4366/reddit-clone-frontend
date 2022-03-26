import { useState } from 'react'
import './App.css'
import SignUpFormDialog from './components/TopNavigation/SignUpFormDialogue'
import TopNavigation from './components/TopNavigation/TopNavigation'
import { SignUpContext } from './context/SignUpContext'

function App() {

  let [toggleSignUp, setToggleSignUp] = useState(false)

  return (
    <div id="app">
      <SignUpContext.Provider value={{ toggleSignUp, setToggleSignUp }}>
        <TopNavigation />
        {toggleSignUp ? <SignUpFormDialog /> : null}
      </SignUpContext.Provider>
    </div>
  )
}

export default App
