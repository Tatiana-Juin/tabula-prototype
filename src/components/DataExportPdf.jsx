import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function DataExportPdf({printRef,filesList}) {

    const handleDownload = async()=>{
        const element = printRef.current;
        if(!element)  return;
        // Capture avec html2 canvas
        const canvas = await html2canvas(element,{
            // haute résolution - texte lisible meme si on réduit 
            scale:2,
            useCORS: true,
            logging: false,
        })

        const imgData = canvas.toDataURL('image/png');

        // Préparation du pdf (A4)
        const pdf = new jsPDF("p","mm","a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // calcule du ration pour ne pas déformer l'image 
        const imgProps = pdf.getImageProperties(imgData);
        const ratio = imgProps.width / imgProps.height;

        // Ajuste la largeur de l'image a la largeur du pdf et on enleve les marge
        const margin = 10;
        const actualPdfWidth = pdfWidth - (margin * 2);
        const imgHeightInPdf = actualPdfWidth / ratio;

        // Ajout de l'image 
        pdf.addImage(imgData,'PNG',margin,margin,actualPdfWidth,imgHeightInPdf);
        pdf.save("export-donnees.pdf");
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
