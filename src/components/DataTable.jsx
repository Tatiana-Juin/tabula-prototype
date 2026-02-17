

export default function DataTable({rows,columns}) {
    if (!rows || rows.length === 0) return null;
  return (
   <>
       {/* POUR AFFICHER LE TABLEAU*/}
              <div style={{ overflowX: 'auto', marginTop: '20px' }}>
                <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead>
                    <tr style={{ background: "#f4f4f4" }}>
                      {columns.map((col, i) => (
                        col.visible && <th key={i} style={{ padding: '10px' }}>{col.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {columns.map((col, colIndex) => (
                          col.visible && (
                            <td key={colIndex} style={{ padding: '10px' }}>
                              {row[col.name]}
                            </td>
                          )
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
   </>
  )
}
