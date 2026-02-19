

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
                   

                </div>
            )}
        </div>
    </>
   
  )
}
