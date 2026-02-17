

export default function ClearData({setFilesList,filesList,fileInputRef}) {
    
    const clearAllFiles = () => {
        setFilesList([]); 
        if (fileInputRef.current) {
        // vide input le texte a coter 
        fileInputRef.current.value = ""; 
        }
     };
  return (
    <>
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
    </>
  )
}
