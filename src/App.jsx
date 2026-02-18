// import { useState } from 'react';

import { useState, useRef } from 'react'; 
import FileUpload from './components/FileUpload';
import FileEntry from './components/FileEntry';
import ClearData from './components/ClearData';
import DataExportPdf from './components/DataExportPdf';
import './App.css'


function App() {
  // tableau qui contient tous les fichier importer 
  const  [filesList,setFilesList] = useState([]);
  // permet de créer une référencement vers un élément HTML ici input file - réinitialise input plus tard 
  const fileInputRef = useRef(null); 
  // useRef pour exporter en pdf 
  const printRef = useRef(null);
  

  return (
    <>
        <div style={{padding:'20px'}} className='container'>
          <div className="toolbar">
              <FileUpload setFilesList={setFilesList} fileInputRef={fileInputRef} />
            {/* Boucle sur tout les fichier sur tout le tableau qui contient tout les fichier pour les afficher dans une table différentes  */}

              <ClearData setFilesList={setFilesList} filesList={filesList} fileInputRef={fileInputRef} />
              <DataExportPdf printRef={printRef} filesList={filesList} />
          </div>

          {/* Zone de contenu a capturer */}
          <div ref={printRef} className='print-zone'>
              {filesList.map((file) =>(
                  <FileEntry key={file.id} file={file} setFilesList={setFilesList}/>
            ))}
          </div>
            

          
      </div>
     
    </>
  )
}

export default App
