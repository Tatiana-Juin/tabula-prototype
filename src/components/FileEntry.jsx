
import DataTable from "./DataTable"
import FilterData from "./FilterData"
import ChartData from "./ChartData"
export default function FileEntry({file,setFilesList}) {
    
  return (
    <div className="file-section">
        {/* Pour afficher le nom des fichier  */}
        <h2 style={{ color: "#333" }}>Fichier : {file.name}</h2>
        <FilterData file={file} setFilesList={setFilesList} />
        
        {/* Pour le graphique */}
        <ChartData file={file} setFilesList={setFilesList} />
        <DataTable rows={file.rows} columns={file.columns} />
    </div>
  )
}
