import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1 className='p-2 inline-flex bg-blue-400'>hello kitty</h1>
    </div>
  )
}

export default App
