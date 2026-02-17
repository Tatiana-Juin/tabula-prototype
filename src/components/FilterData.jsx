

export default function FilterData({file,setFilesList}) {

    const toggleColumn = (columnName)=>{
        setFilesList((prevFiles) =>
            prevFiles.map((f) =>{
                if(f.id === file.id){
                    return{
                        ...f,
                        columns:f.columns.map((col) =>
                            col.name === columnName
                            ? {...col,visible: !col.visible}
                            : col
                        )
                    }
                }
                return f;
            })
        )
    }
  return (
    <>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        
            {file.columns.map((col) => (
            <label key={col.name}>
            <input
                type="checkbox"
                checked={col.visible}
                onChange={() => toggleColumn(col.name)}
            />
            {col.name}
            </label>
        ))}
        </div>
    </>
  )
}
