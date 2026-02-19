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
// import './App.css'
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

export default function ChartData({file,setFilesList}) {

    const toogleChartConfig = () =>{
        setFilesList(prevFiles =>
            prevFiles.map(f =>{
                if(f.id === file.id){
                    return {...f,showChartConfig: !f.showChartConfig};
                }
                return f;
            })
        )
    }

    //Pour mettre a jours les axeX et Y => pour recuperer la valeur 
    const updateAxis = (axisName,newValue) =>{
        setFilesList(prevFiles =>
            prevFiles.map(f =>{
                if(f.id === file.id){
                    return {
                        ...f,
                        [axisName] : newValue
                    }
                }
                return f;
            })
        )
    }

    const canShowChart = file.selectedX && file.selectedY;
    const chartData = canShowChart ? {
        labels: file.rows.map(row => row[file.selectedX]),
        datasets: [
      {
        label: file.selectedY,
        // On transforme le texte du CSV en vrai nombre 🔢
        data: file.rows.map(row =>{
            const value = row[file.selectedY];
            return parseFloat(value.toString().replace(',', '.'));
        }),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
    } : null
  return (
    <>
         <div style={{ margin: '10px 0', padding: '10px', border: '1px solid #eee' }}>
            {/* BOUTON  */}
            <button onClick={toogleChartConfig} style={{ cursor: 'pointer', padding: '8px' }}>
                {file.showChartConfig ? "❌ Fermer les réglages" : "📊 Créer un graphique"}
            </button>

            {/* On voie le bouton que si c'est true  */}
            {file.showChartConfig && (
                <div style={{ marginTop: '15px', background: '#f9f9f9', padding: '10px' }}>
                    <h4>Configuraion des axes</h4>
                    <div>
                            {/* Axe X */}
                        <label htmlFor=""> Axe X</label>
                        <select 
                            value={file.selectedX}
                            onChange={(e) => updateAxis("selectedX",e.target.value)}
                        >
                            <option value=""> ----- Choisir une colonne---</option>
                            {file.columns.map((col,i) =>(
                                <option key={i} value={col.name}>{col.name}</option>
                            ))}
                        </select>
                    </div>
                 

                    {/* AXE Y  */}
                    <div style={{marginTop:"10px"}}>
                         <label htmlFor=""> Axe Y</label>
                        <select value={file.selectedY}
                            onChange={(e) => updateAxis("selectedY",e.target.value)}
                        >
                            <option value=""> ----- Choisir une colonne---</option>
                            {file.columns.map((col,i) =>(
                                <option key={i} value={col.name}>{col.name}</option>
                            ))}
                        </select>
                    </div>
                   
                    {canShowChart && (
                        <div style={{ marginTop: '20px', height: '300px', background: 'white', padding: '10px' }}>
                            <Bar data={chartData} />
                        </div>
                    )}
                </div>
            )}
        </div>
    </>
   
  )
}
