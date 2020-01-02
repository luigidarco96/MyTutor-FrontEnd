import React, { Component, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Card from "../Card/Card";
import Button from "components/CustomButton/CustomButton";

const Upload = props => {
  const maxSize = 1048576;

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
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

          <ul className="list-group mt-2">
            {acceptedFiles.length > 0 &&
              acceptedFiles.map(acceptedFile => (
                <li className="list-group-item list-group-item-success">
                  {acceptedFile.name}
                  <i className="pe-7s-close" onClick="elimina"></i>
                </li>
              ))}
          </ul>
          <Button bsStyle="primary">Invia Candidatura</Button>
        </div>
      }
    />
  );
};

export default Upload;
