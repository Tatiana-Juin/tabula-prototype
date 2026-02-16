// import { useState } from 'react';

import { useState, useRef } from 'react'; 
import FileUpload from './components/FileUpload';
import './App.css'

function App() {
  // tableau qui contient tous les fichier importer 
  const  [filesList,setFilesList] = useState([]);
  // permet de créer une référencement vers un élément HTML ici input file - réinitialise input plus tard 
  const fileInputRef = useRef(null); 
  
 




  return (
    <>
     
      <FileUpload setFilesList={setFilesList} />
     
    </>
  )
}

export default App
