import React, { Component, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Card from "../Card/Card";
import Button from "components/CustomButton/CustomButton";
import axios from "axios";
import { Modal } from "react-bootstrap";

const Upload = props => {
  const updateCandidature =()=>{
  const user = JSON.parse(localStorage.getItem('user'))
  let today = new Date();
  let last_edit = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let documents=[];
  acceptedFiles.map(acceptedFile=>{
    let document = {
      student: user.email,
      notice_protocol: props.notice_protocol,
      file_name: acceptedFile.name,
      file: acceptedFile,
    }
    documents.push(document);
  })
  const data = {
    candidature:{
      student:user.email,
      notice_protocol: props.notice_protocol,
      last_edit: last_edit,
      state: 'Editable',
      documents: documents,
    }
  }
  const headers ={
    'Authorization': localStorage.getItem('token'),
  }
    axios
    .patch('http://localhost:3001/api/candidatures',data,{headers:headers})
    .then(blob=>{
      console.log(blob.data);
      var para = document.createElement("p");
      var node = document.createTextNode("Inserimento effettuto con successo");
      para.appendChild(node);
      para.style.cssText='color:green, margin-top:3px';
      document.getElementById('1').appendChild(para);
      
    })
    .catch(error=>{
      var para = document.createElement("p");
      var node = document.createTextNode("Errore, impossibile effettuare l'inserimento.");
      para.appendChild(node);
      para.style.cssText='color:red, margin-top:3px';
      document.getElementById('1').appendChild(para);
    })
  }
  const maxSize = 1048576;

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.map((acceptedFile)=>{console.log(acceptedFile)})
  }, []);

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    acceptedFiles,
    rejectedFiles
  } = useDropzone({
    onDrop,
    accept: "application/pdf",
    minSize: 0,
    maxSize
  });

  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  return (
    <Card
      plain = {props.plain}
      title="Carica Documenti Candidatura"
      content={
        <div className="text-center">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {!isDragActive && "Click here or drop a file to upload!"}
            {isDragActive && !isDragReject && "Drop it like it's hot!"}
            {isDragReject && "File type not accepted, sorry!"}
            {isFileTooLarge && (
              <div className="text-danger mt-2">File is too large.</div>
            )}
          </div>

          <ul id ='1' className="list-group mt-2">
            {acceptedFiles.length > 0 &&
              acceptedFiles.map(acceptedFile => (
                <li className="list-group-item list-group-item-success">
                  {acceptedFile.name}
                  <i className="pe-7s-close" onClick="elimina"></i>
                </li>
              ))}
          </ul>
          <Button bsStyle="primary" onClick={updateCandidature}>Invia Candidatura</Button>
        </div>
      }
    />
  );
};

export default Upload;
