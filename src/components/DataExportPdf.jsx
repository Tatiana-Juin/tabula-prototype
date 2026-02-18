import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function DataExportPdf({printRef,filesList}) {

    const handleDownload = async()=>{
        const element = printRef.current;
        if(!element)  return;
    }

    // pour ne pas afficher le bouton exporter s'il a aucun fichier 
    if(!filesList || filesList.length === 0){
        return null
    }
  return (
    <>
        <button onClick={handleDownload} className='btn-export'>Exporter en pdf </button>
    </>
  )
}
