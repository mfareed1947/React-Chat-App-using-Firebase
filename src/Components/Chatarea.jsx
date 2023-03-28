import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

const Chatarea = () => {

  const { data } = useContext(ChatContext)

  return (
    <div className='chatarea'>
      <div className="chatarea-info">
      <ion-icon name="arrow-back-outline"></ion-icon>
        <span>{data.user.displayName}</span>
        <div className="chat-icons">
          <ion-icon name="videocam"></ion-icon>
          <ion-icon name="person-add"></ion-icon>
          <ion-icon name="menu"></ion-icon>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chatarea
