import React from 'react'
import Sidebar from './Sidebar'
import Chatarea from './Chatarea'

const Home = () => {
  return (
    <div className='home'>
     <div className="home-container">
      <Sidebar/>
      <Chatarea/>
     </div>
    </div>
  )
}

export default Home
