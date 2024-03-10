import React from 'react';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Login from './components/Login/Login';
import './App.css'
import Chat from './components/Chat/Chat';
const App = () => {
 
  return (
    <div>
    <Router>
     
     <Routes>
      <Route exact path='/' element={<Login/>}/>
      <Route exact path='/chat' element={<Chat/>}/>
     </Routes>

    </Router>
 

    </div>
  )
}

export default App