import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      console.log(formData);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { fileName, msg } = res.data;
      setUploadedFile({ fileName, msg });
    } catch (error) {
      if (error.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(error.response.data.msg);
      }
    }
  };
  const fileInputHandler = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  return (
    <>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="custom-file"
            onChange={fileInputHandler}
          />
          <label className="custom-file-label" htmlFor="custom">
            {fileName}
          </label>
        </div>

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            {/* <img src={uploadedFile.filePath} style={{ width: "100%" }} /> */}
            <p>{uploadedFile.msg}</p>
          </div>
        </div>
      ) : <p>File not uploaded</p>}
    </>
  );
};

export default Form;
