import axios from "axios";
import React, { useState } from "react";

function Submit() {
  const [srn, setSrn] = useState("");
    const [sub, setsub] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/addingstudent/submit", { srn, sub });
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="Submit">
      <h1>Please submit the assigment</h1>
      <form onSubmit={handleSubmit}>
        <br />
        SRN:{" "}
        <input
          type="text"
          value={srn}
          onChange={(e) => {
            setSrn(e.target.value);
          }}
        />
        <br />
        SUb:{" "}
        <input
          type="text"
          value={sub}
          onChange={(e) => {
            setsub(e.target.value);
          }}
        />
        <br />
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default Submit;
