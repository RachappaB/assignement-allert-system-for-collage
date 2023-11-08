
import axios  from 'axios';
import React from 'react';
import { useState } from 'react';

function Addingassignment() {
  const [sub,setsub] = useState("")
  const [text,settext] = useState("")
  const [link,setlink] = useState("")
  const [deadline,setdealine] = useState("")
  
  const handleSubmit = async e => {
   
    e.preventDefault()
    try{
      
        await  axios.post('/addingassignment',{sub,text,link,deadline})
        
        window.location.href ="/"

    }catch(err)
    {
        alert(err.response.data.msg)
    }

}
  return (
    <div className="App">
      <h1>Mail by nodemailer</h1>
      <form  onSubmit={handleSubmit}>
      SUb:  <input type="text" value={sub} onChange={(e) =>{setsub(e.target.value)}}/><br/>
      Text:  <input type="text" value={text} onChange={(e) =>{settext(e.target.value)}}/><br/>
      file_link:  <input type="text" value={link} onChange={(e) =>{setlink(e.target.value)}}/><br/>
      DeadLine:<input type="datetime-local" value={deadline} onChange={(e) =>{setdealine(e.target.value)}}/><br/>
      <button type='submit'>send</button>
      </form>
    </div>
  );
}

export default Addingassignment;
