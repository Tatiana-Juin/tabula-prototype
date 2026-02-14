// import { useState } from 'react';
import Papa from 'papaparse';
import { useState, useRef } from 'react'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import './App.css'
// On enregistre les composants pour les utiliser on fait cela pour que ca soit plus leger et on utilise que ce que l'on a besoin 
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
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
              rows:results.data,
              // Pour le graphique 
              showChartConfig:false,
              selectedX:"",
              selectedY:""
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

  // FONCTION POUR CHANGER LA VALEUR DE SHOWCHARTCONFIG AFIN DE POURVOIR CREER LES GRAPHIQUE 
  const toggleChartConfig = (fileId)=>{
    // on récupere pour etre sur que c'est le bon fichier 
    setFilesList(prevList=>
      prevList.map(file =>
        file.id === fileId 
        ?{...file,showChartConfig: !file.showChartConfig}
        : file
      )
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

  // Pour mettre a jours les axeX et Y => pour recuperer la valeur 
  const updateAxis = (fileId,axisName,newValue) =>{
    setFilesList(prevList =>
      prevList.map(file =>{
        if(file.id === fileId){
          return {
            ...file,
            /*
            [axisName ] => entre crochet recupere la valeur 
            utilise cléf dynamique 
              Si axisName vaut "selectedX", l'objet devient { ...file, selectedX: newValue }.

              Si axisName vaut "selectedY", l'objet devient { ...file, selectedY: newValue }.
            */
            [axisName]:newValue
          }
        }
        return file;
      })
    )
  }


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
        {filesList.map((fileObj) => {
          // --- LOGIQUE DE CALCUL (AVANT LE RETURN) POUR QUE Y soit UN NB ---
          const validRows = fileObj.rows.filter(row => {
            const valY = row[fileObj.selectedY];
            return valY !== undefined && valY.trim() !== "" && !isNaN(parseFloat(valY));
          });
          // CREATION DE DEUX CONSTANTE UNE POUR LES LABEL UNE POUR LES VALEURS 
          const chartLabels = validRows.map(row => row[fileObj.selectedX]);
          const chartValues = validRows.map(row => parseFloat(row[fileObj.selectedY]));
          // Pour dessiner le graphique 
          const data = {
            // Pour la legende ce que l'on va voir en haut 
            labels: chartLabels,
            // contient 1 ou plusieurs Objet  - chaque objet represente une serie de données par exemple une barre sur un graphqiue 
            datasets: [
              {
                label: fileObj.selectedY, 
                data: chartValues,      
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgb(75, 192, 192)',
              },
            ],
          };

          return (
            <div key={fileObj.id} style={{ marginTop: '40px', borderTop: '2px solid #eee' }}>
              <h2 style={{ color: "#333" }}>Fichier : {fileObj.name}</h2>

              <div style={{ marginBottom: '10px' }}>
                {/* POUR LES FILTRE  */}
                <strong>Filtrer les colonnes :</strong>
                {fileObj.columns.map((col, index) => (
                  <label key={index} style={{ marginLeft: '10px' }}>
                    <input
                      type="checkbox"
                      checked={col.visible}
                      onChange={() => toggleColumn(fileObj.id, col.name)}
                    />
                    {col.name}
                  </label>
                ))}
              </div>

              <button onClick={() => toggleChartConfig(fileObj.id)}>
                {fileObj.showChartConfig ? "❌ Fermer les réglages" : "📊 Créer un graphique"}
              </button>

              {fileObj.showChartConfig && (
                <div style={{ marginTop: '15px', padding: '10px', background: '#f9f9f9', borderRadius: '8px' }}>

                  <p style={{ color: 'green' }}>✅ {chartValues.length} données valides détectées.</p>
                  {/* CHOISI LA DONNE X  */}
                  <div>
                    <label>Axe X : </label>
                    <select value={fileObj.selectedX} onChange={(e) => updateAxis(fileObj.id, "selectedX", e.target.value)}>
                      <option value="">Choisir ---</option>
                      {fileObj.columns.map((col, i) => <option key={i} value={col.name}>{col.name}</option>)}
                    </select>
                  </div>

                  {/* CHOISI Y  */}
                  <div style={{ marginTop: '10px' }}>
                    <label>Axe Y : </label>
                    <select value={fileObj.selectedY} onChange={(e) => updateAxis(fileObj.id, "selectedY", e.target.value)}>
                      <option value="">-- Choisir --</option>
                      {fileObj.columns.map((col, i) => <option key={i} value={col.name}>{col.name}</option>)}
                    </select>
                  </div>

                    {/* Condition pour générer  le graphique */}
                   {fileObj.selectedX && fileObj.selectedY ?(
                      <div style={{ height: '400px', marginTop: '20px' }}>
                        <Bar data={data} options={{ maintainAspectRatio: false }} />
                      </div>
                    ): (
                      <p style={{ color: '#666', marginTop: '20px' }}>
                        💡 Sélectionnez un axe X et un axe Y pour générer le graphique.
                    </p>
                    )
            
                  }
                </div>
              )}
             

              {/* POUR AFFICHER LE TABLEAU*/}
              <div style={{ overflowX: 'auto', marginTop: '20px' }}>
                <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead>
                    <tr style={{ background: "#f4f4f4" }}>
                      {fileObj.columns.map((col, i) => (
                        col.visible && <th key={i} style={{ padding: '10px' }}>{col.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fileObj.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {fileObj.columns.map((col, colIndex) => (
                          col.visible && (
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
          );
        })}
     </div>
    </>
  )
}

export default App
