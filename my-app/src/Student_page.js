import axios from "axios";
import React, { useState } from "react";

function Student_page() {
  const [srn, setSrn] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/addingstudent/Student_page", { srn });
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="Addingstudent">
      <h1>check pending work</h1>
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
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default Student_page;
