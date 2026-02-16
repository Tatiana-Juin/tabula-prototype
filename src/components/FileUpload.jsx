import Papa from 'papaparse';

export default function FileUpload({setFilesList,fileInputRef}) {


    // fonction pour uploader des  fichiers 
    const handleFileUpload = (e)=>{
    // Recupere tous les fichiers qui de base sont une FileList mais sont convertie en tableau 
    const files = Array.from(e.target.files);
    // Boucle pour recuperer les donnes
    files.forEach((file) => {
      
      Papa.parse(file, {
        // 1er ligne header
        header: true,
        
        skipEmptyLines: true,
        // Quand le traitement ou plutot papaParse est fini 
        complete: (results) => {
          if (results.data.length > 0) {
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


  return (
    <>
        <h3>Charger un fichier CSV </h3>
        {/* accept => uniquement le fichier csv, multiple : plusieurs fichier  */}
        
        <input 
        ref={fileInputRef}
          type="file" 
          accept='.csv' 
          multiple
          onChange={handleFileUpload}
        />
    </>
  )
}
