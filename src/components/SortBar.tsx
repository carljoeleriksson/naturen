import React from 'react'

function SortBar() {
  return (<>
    <select className="sorting">
        <option value="Alphabetically">A - Z</option>
        <option value="Price">Pris</option>
    </select>
  </>
  )
}

export default SortBar