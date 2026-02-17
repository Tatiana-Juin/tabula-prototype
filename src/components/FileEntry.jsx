
import DataTable from "./DataTable"
import ClearData from "./ClearData"
export default function FileEntry({file}) {
    
  return (
    <div className="file-section">
        {/* Pour afficher le nom des fichier  */}
        <h2 style={{ color: "#333" }}>Fichier : {file.name}</h2>
        
        <DataTable rows={file.rows} columns={file.columns} />
    </div>
  )
}
