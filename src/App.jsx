// import { useState } from 'react';

import { useState, useRef } from 'react'; 
import FileUpload from './components/FileUpload';
import FileEntry from './components/FileEntry';
import DataTable from './components/DataTable';
import './App.css'


function App() {
  // tableau qui contient tous les fichier importer 
  const  [filesList,setFilesList] = useState([]);
  // permet de créer une référencement vers un élément HTML ici input file - réinitialise input plus tard 
  const fileInputRef = useRef(null); 
  
 




  return (
    <>
        <div style={{padding:'20px'}}>
          <FileUpload setFilesList={setFilesList} fileInputRef={fileInputRef} />
            {/* Boucle sur tout les fichier sur tout le tableau qui contient tout les fichier pour les afficher dans une table différentes  */}
            {filesList.map((file) =>(
              <div key={file.id} className="file-container" >
                  <FileEntry file={file} />
                  <DataTable rows={file.rows} columns={file.columns} />
              </div>
            ))}

          
      </div>
     
    </>
  )
}

export default App
