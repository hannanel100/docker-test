import React, { useState, useRef } from "react";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const fileInputRef = useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log(selectedFile);
    //TODO: add http to post selected file to backend
  };
  const fileInputHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <label htmlFor="img">Select image:</label>
      <input
        type="file"
        id="img"
        name="img"
        accept="image/*"
        onChange={(e) => fileInputHandler(e)}
      />
      <input type="submit" />
    </form>
  );
};

export default Form;
