import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Message = ({ message }) => {

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)
  const ref = useRef()

useEffect(() => {
  ref.current?.scrollIntoView({behavior:'smooth'});

}, [message])


  return (
    <div ref={ref} className={`message ${message.SenderId === currentUser.uid && 'owner'} `}>
      <div className="message-info">
        <img src={message.SenderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span>Just now</span>
      </div>
      <div className="message-content">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message
