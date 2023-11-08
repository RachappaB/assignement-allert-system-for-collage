import axios from 'axios';
import React, { useState } from 'react';

function Addingstudent() {
  const [name, setName] = useState("");
  const [srn, setSrn] = useState("");
  const [phone, setPhone] = useState("");
  const [gmail, setGmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/addingstudent', { name, srn, phone, gmail });
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  }

  return (
    <div className="Addingstudent">
      <h1>Please add a student in Group</h1>
      <form onSubmit={handleSubmit}>
                Name: <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} /><br />

        SRN: <input type="text" value={srn} onChange={(e) => { setSrn(e.target.value) }} /><br />
        Phone: <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} /><br />
        Gmail: <input type="text" value={gmail} onChange={(e) => { setGmail(e.target.value) }} /><br />

        <button type='submit'>send</button>
      </form>
    </div>
  );
}

export default Addingstudent;
