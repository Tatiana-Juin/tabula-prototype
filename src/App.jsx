// import { useState } from 'react';
import Papa from 'papaparse';
import { useState, useRef } from 'react'; // On ajoute useRef ici
import './App.css'

function App() {
  // tableau qui contient les données de chaque files 

  const [filesList,setFilesList] = useState([]);
  // on créer une reference
  const fileInputRef = useRef(null); 
  /*
    STRCUTURE ATTENTDU 
    [
      {
        id,
        name,
        columns,
        rows
      },
      ...
    ]

  */
  // uploader les fichiers csv
  const handleFileUpload = (e)=>{
    // Recupere tous les fichiers qui de base sont une FileList mais sont convertie en tableau 
    const files = Array.from(e.target.files);
    // Boucle pour recuperer les donnes
    files.forEach((file) => {
      // lit le fichier 
      Papa.parse(file, {
        // 1er ligne header
        header: true,
        // ignore les ligne vides
        skipEmptyLines: true,
        // Quand le traitement ou plutot papaParse est fini 
        complete: (results) => {
          if (results.data.length > 0) {
            // Chaque colonnes et transformer en objet ainsi on poura recuperer le nom et faire switcher ca visibilité de true a false ou de false a true
            const colObjects = Object.keys(results.data[0]).map(colName => ({
                name: colName,
                visible: true 
            }));
            //On créer un objet pour chaque fichier precis 
            const newFileEntry={
              id:Math.random().toString(36),
              name:file.name,
              columns:colObjects,
              rows:results.data
            } 
            // spread operator pour ajouter le nouveau fichier et ne pas ecraser les autre fichier 
            setFilesList((prev) => [...prev,newFileEntry]);
          }
        },
      });
    });
  }

  // Pour le toggle 
  const toggleColumn = (fileId,colName) =>{
    // fileId => identifiant unique du fichier CSV => pour pas modifier tout les tableaux en meme temps 
    //colName =>  nom de la colonnes
    // prevlist +> liste actuelle du fichier 
    setFilesList(prevList =>

      prevList.map(file =>{
        // cherche le bon id du fichier et on retourne les information du fichier 
        if(file.id === fileId){
          return{
            ...file,
            //parcours les colonnes 
            columns:file.columns.map(col=>
              // si le nom de la colonnest est celui qu'on cherche on va modifier la valeurs de visible sinon on retourne la collonne sans changement
              col.name ===colName ? {...col,visible: !col.visible} :col
            )
          }
        }
        return file;
      })
    )
  }

  // POUR VIDER LA PAGE 
  const clearAllFiles = () => {
    setFilesList([]); 
    if (fileInputRef.current) {
      // vide input le texte a coter 
      fileInputRef.current.value = ""; 
    }
  };


  return (
    <>
     <div style={{padding:'20px'}}>
        <h3>Charger un fichier CSV </h3>
        {/* accept => uniquement le fichier csv, multiple : plusieurs fichier  */}
        <input 
        ref={fileInputRef}
          type="file" 
          accept='.csv' 
          multiple
          onChange={handleFileUpload}
        />

        {/* Affiche elbouton initialiser que s'il a des données est ficher */}
     
        {filesList.length > 0 && (
          <button 
            onClick={clearAllFiles}
            style={{
              backgroundColor: '#cc0000',
              color: 'white',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ❌ Tout effacer
          </button>
          
          


        )}
    {/* BOUCLE SUR CHAQUE FICHIER CHARGER - fileObj => un fichier csv  */}
        {filesList.map((fileObj) =>(

          <div key={fileObj.id} style={{ marginTop: '40px', borderTop: '2px solid #eee' }}>
            {/* nom du fichier  */}
            <h2 style={{color:"#333"}}>Fichier : {fileObj.name}</h2>
            

            <div style={{marginBottom:'10px'}}>
                <strong>Filtrer les colonnes</strong>
                {/* pour recuperer le nom de chaque colonnes  */}
                {fileObj.columns.map((col,index) =>(
                  <label key={index} style={{marginLeft: '10px'}}>
                    {/* onChange => C'est le declencheur => quand on clique sur la case a cocheer celui ci appelle la fonction toggleColumn on lui envoie id du fichier et le nom de la colonne laf ocntion va mettre a jours la visibilité (visible) et on va mettre a  jours l'affichage  */}
                      <input 
                        type="checkbox"
                        checked={col.visible}
                        onChange={() => toggleColumn(fileObj.id,col.name)} 
                      />
                      {col.name}
                  </label>
                ))}
            </div>
            <button>Créer unn graphique </button>

            <div style={{ overflowX: 'auto' }} >
                <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead>
                      <tr style={{background:"#f4f4f4"}}>

                      {/* DEUXIEEME BOUCLE POUR L'ENTETE DES COLONNES DU HEAD  */}
                        {fileObj.columns.map((col,i) =>(
                          col.visible && <th key={i} style={{ padding: '10px' }}>{col.name}</th>
                        ))}
                      </tr>
                  </thead>

                  <tbody>
                        {/* BOUCLE SUR CHAQUE LIGNE DU FICHIER CSV*/}
                        {fileObj.rows.map((row,rowIndex) =>(
                          <tr key={rowIndex}>
                            {/* POUR CHAQUE LIGNE ONT PARCOURS LES COLONNE ET ON AFFICHE LES VALEURS QUI CORRESPONDENT  */}
                              {fileObj.columns.map((col,colIndex) =>(
                                col.visible &&(
                                <td key={colIndex} style={{ padding: '10px' }}>
                                    {row[col.name]}
                                </td>
                                )
                              ))}
                          </tr>
                        ))}
                  </tbody>

                </table>
            </div>

          </div>
        ))}
     </div>
    </>
  )
}

export default App
