import React from 'react'
import { Link } from 'react-router-dom'

const MenuItem = (props) => {
  return(
    <div className='menuItem'>
      <div className="menuItemName"><p>{props.item.name}</p></div>
      {
        props.item.item_variations.reverse().map(itemVar => (
          <div className="menuItemVar">
          <div className="menuItemVarName">
            {itemVar.variation.toLowerCase()}
          </div>
          <div className="menuItemVarPrice">
            ${itemVar.price.toString()}
          </div>
        </div>
        ))
      }
    </div>
  )
}

export default MenuItem
