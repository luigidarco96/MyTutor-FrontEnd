import React, {useCallback} from "react";
import { useDropzone } from "react-dropzone";
import Card from "../Card/Card";
import Button from "components/CustomButton/CustomButton";
import axios from "axios";

const Upload = props => {

  
  //Update of the candidatures.
  const updateCandidature = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    let today = new Date();
    let last_edit = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let documents = [];

    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
    acceptedFiles.forEach(acceptedFile => {
     
      let document;
      getBase64(acceptedFile)
        .then(result => {
          document = {
            student: user.email,
            notice_protocol: props.notice_protocol,
            file_name: acceptedFile.name,
            file: result,
          }
          documents.push(document);
        })
        .catch(error => {
          
        })


    })


    const data = {
      candidature: {
        student: user,
        notice_protocol: props.notice_protocol,
        last_edit: last_edit,
        state: 'Editable',
        documents: documents,
      }
    }

    const headers = {
      'Authorization': localStorage.getItem('token'),
    }
    //Take all candidatures
    axios
      .get('http://localhost:3001/api/candidatures', { headers: headers })
      .then(blob => {
        let create=true;
        blob.data.candidatures.forEach(candidature => 
          candidature.notice_protocol === props.notice_protocol?create=false:null
        )
        //Update candidature.
        if (!create) {
          axios
            .patch('http://localhost:3001/api/candidatures', data, { headers: headers })
            .then(blob => {

              if (document.getElementById('2') != null) {
                let el = document.getElementById('2');
                el.remove();
              }

              var para = document.createElement("p");
              var node = document.createTextNode("Inserimento effettuto con successo");
              para.appendChild(node);
              para.style.cssText = 'color:green;, margin-top:3px;';
              para.id = '2'
              document.getElementById('1').appendChild(para);

            })
            .catch(error => {

              if (document.getElementById('2') != null) {
                let el = document.getElementById('2');
                el.remove();
              }

              var para = document.createElement("p");
              var node = document.createTextNode("Errore, impossibile effettuare l'inserimento.");
              para.appendChild(node);
              para.style.cssText = 'color:red; margin-top:3px;';
              para.id = '2';
              document.getElementById('1').appendChild(para);
            })
        }
        //Create candidature.
        else {
          axios
            .put('http://localhost:3001/api/candidatures', data, { headers: headers })
            .then(blob => {
              if (document.getElementById('2') != null) {
                let el = document.getElementById('2');
                el.remove();
              }

              var para = document.createElement("p");
              var node = document.createTextNode("Inserimento effettuto con successo");
              para.appendChild(node);
              para.style.cssText = 'color:green;, margin-top:3px;';
              para.id = '2'
              document.getElementById('1').appendChild(para);

            })
            .catch(error => {
              if (document.getElementById('2') != null) {
                let el = document.getElementById('2');
                el.remove();
              }

              var para = document.createElement("p");
              var node = document.createTextNode("Errore, impossibile effettuare l'inserimento.");
              para.appendChild(node);
              para.style.cssText = 'color:red; margin-top:3px;';
              para.id = '2';
              document.getElementById('1').appendChild(para);
            })

        }

      });


  }
  const uploadRanking = () => {
    const headers = {
      'Authorization': localStorage.getItem('token'),
    }
    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
    acceptedFiles.forEach(acceptedFile => {
      
      let rankingPdf;
      getBase64(acceptedFile)
        .then(result => {
          rankingPdf = {
            gradedList: result,
          }


          axios
          .put('http://localhost:3001/api/notices/grades/pdf/'+props.notice_protocol,rankingPdf,{headers:headers})
          .then(blob=>{
         
            axios
            .get('http://localhost:3001/api/notices/'+props.notice_protocol,{headers:headers})
            .then(blob=>{
              const element = blob.data.notices[0];
              element.state='Closed';
              element.deadline = element.deadline.split("T")[0];
              axios
              .patch('http://localhost:3001/api/notices/state',{notice:element},{headers:headers})
              .then(blob=>{
                if (document.getElementById('2') != null) {
                  let el = document.getElementById('2');
                  el.remove();
                }
  
                var para = document.createElement("p");
                var node = document.createTextNode("Inserimento effettuto con successo");
                para.appendChild(node);
                para.style.cssText = 'color:green;, margin-top:3px;';
                para.id = '2'
                document.getElementById('1').appendChild(para);
  
              })
              .catch(error=>{
                if (document.getElementById('2') != null) {
                  let el = document.getElementById('2');
                  el.remove();
                }
  
                var para = document.createElement("p");
                var node = document.createTextNode("Errore, impossibile effettuare l'inserimento.");
                para.appendChild(node);
                para.style.cssText = 'color:red; margin-top:3px;';
                para.id = '2';
                document.getElementById('1').appendChild(para);
              })
            })
          })
          .catch(error=>{
            if (document.getElementById('2') != null) {
              let el = document.getElementById('2');
              el.remove();
            }
  
              var para = document.createElement("p");
              var node = document.createTextNode("Errore, impossibile effettuare l'inserimento.");
              para.appendChild(node);
              para.style.cssText = 'color:red; margin-top:3px;';
              para.id = '2';
              document.getElementById('1').appendChild(para);
  
          })
        })
        .catch(error => {
         
         
        })

        


    })
  
  }
  //Upload and approve notice and approve notice.
  const uploadAndApproveNotice = ()=>{
    const headers = {
      'Authorization': localStorage.getItem('token'),
    }
  
    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
 
    acceptedFiles.forEach(acceptedFile => {
      let noticePdf;
      getBase64(acceptedFile)
        .then(result => {
          noticePdf = {
            notice: result,
          }
          axios
          .put('http://localhost:3001/api/notices/pdf/'+props.notice_protocol,noticePdf,{headers:headers})
          .then(blob=>{
           
            axios
            .get('http://localhost:3001/api/notices/'+props.notice_protocol,{headers:headers})
            .then(blob=>{
              const element = blob.data.notices[0];
              element.state='Approved';
              element.deadline = element.deadline.split("T")[0];
              axios
              .patch('http://localhost:3001/api/notices/state',{notice:element},{headers:headers})
              .then(blob=>{
                if (document.getElementById('2') != null) {
                  let el = document.getElementById('2');
                  el.remove();
                }
  
                var para = document.createElement("p");
                var node = document.createTextNode("Inserimento effettuto con successo");
                para.appendChild(node);
                para.style.cssText = 'color:green;, margin-top:3px;';
                para.id = '2'
                document.getElementById('1').appendChild(para);
  
              })
              .catch(error=>{
                if (document.getElementById('2') != null) {
                  let el = document.getElementById('2');
                  el.remove();
                }
  
                var para = document.createElement("p");
                var node = document.createTextNode("Errore, impossibile effettuare l'inserimento.");
                para.appendChild(node);
                para.style.cssText = 'color:red; margin-top:3px;';
                para.id = '2';
                document.getElementById('1').appendChild(para);
              })
            })
          })
          .catch(error=>{
            if (document.getElementById('2') != null) {
              let el = document.getElementById('2');
              el.remove();
            }
  
              var para = document.createElement("p");
              var node = document.createTextNode("Errore, impossibile effettuare l'inserimento.");
              para.appendChild(node);
              para.style.cssText = 'color:red; margin-top:3px;';
              para.id = '2';
              document.getElementById('1').appendChild(para);
  
          })
        })
        .catch(error => {
          
         
        })


    })
  
  }
  const maxSize = 1048576;

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.map((acceptedFile) => { return ''})
  }, []);

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    acceptedFiles,
    rejectedFiles
  } = useDropzone({
    onDrop,
    accept: "application/pdf",
    minSize: 0,
    maxSize,
    multiple: window.location.pathname.split("/P")[0] === '/student/modificaCandidatura' || window.location.pathname.split('/P')[0]==='/student/detailNotices',
  });



  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  if (window.location.pathname.split("/P")[0] === "/ddi/uploadNotice") {
    return (
      <Card
        plain={props.plain}
        title="Carica bando"
        content={
          <div className="text-center" id='textUpload'>
            <div {...getRootProps()}>
              <input {...getInputProps() }></input>
              {!isDragActive && <i style={{fontSize:'150px'}}className='pe-7s-cloud-upload'></i>}
                {isFileTooLarge && (
                  <div className="text-danger mt-2">File is too large.</div>
                )}            </div>
            <ul className="list-group mt-2">
              {acceptedFiles.length > 0 &&
                acceptedFiles.map(acceptedFile => (
                  <li className="list-group-item list-group-item-success">
                    {acceptedFile.name}
                    <i className="pe-7s-close" onClick="elimina"></i>
                  </li>
                ))}
            </ul>
            <div id='1'></div>
            <Button bsStyle="success" onClick={uploadAndApproveNotice}>Approva e invia bando</Button>
          </div>
        }
      />
    );

  }
  else if(window.location.pathname.split("/P")[0] === "/ddi/uploadRanking"){
    return (
      <Card
        plain={props.plain}
        title="Carica graduatoria"
        content={
          <div className="text-center">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {!isDragActive && <i style={{fontSize:'150px'}}className='pe-7s-cloud-upload'></i>}
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
            <div id='1'></div>
            <Button bsStyle="primary" onClick={uploadRanking}>Carica graduatoria firmata</Button>
          </div>
        }
      />
    );

  }
  else{
      return (
        <Card
          plain={props.plain}
          title="Carica Documenti Candidatura"
          content={
            <div className="text-center">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {!isDragActive && <i style={{fontSize:'150px'}}className='pe-7s-cloud-upload'></i>}
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
              <div id='1'></div>
              <Button bsStyle="success" onClick={updateCandidature}>Invia Candidatura</Button>
  
            </div>
          }
        />
      );
    
  }
};


export default Upload;
