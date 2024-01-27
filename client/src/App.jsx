import { useState } from 'react'
import './App.css'
import { Main } from './Components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Main />
    </>
  )
}

export default App
