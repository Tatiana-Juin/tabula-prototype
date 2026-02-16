

export default function FileEntry({file}) {
    
  return (
    <div>
        {/* Pour afficher le nom des fichier  */}
        <h2 style={{ color: "#333" }}>Fichier : {file.name}</h2>
    </div>
  )
}
