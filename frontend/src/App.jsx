import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LeftSide from './component/LeftSide'
import RightSide from './component/RightSide'

function App() {
  // const [count, setCount] = useState(0)

  return (

    <div className='h-screen w-screen flex'>
      {/* left side bar */}
      <div className='w-1/4 border-r md:block hidden'>
        <LeftSide  />
      </div>

      <div className=' w-full flex h-full  justify-center'>
        <RightSide />
      </div>
    </div>

  )
}

export default App
