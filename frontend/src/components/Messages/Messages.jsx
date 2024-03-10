import React from 'react'
import './Messages.css';
const Messages = ({user,message,classs}) => {
  if(user)
  {
    return (
        <div className={`msgBox ${classs} `}>
           {user}:{message}
        </div>
      )
  }
  else{
    return (
        <div className={`msgBox ${classs} `}>
            You:{message}
        </div>
      )
  }
}

export default Messages