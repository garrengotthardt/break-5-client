import React from 'react'
import { Link } from 'react-router-dom'
import MenuItem from './MenuItem'

const MenuSection = (props) => {
  console.log(props)
    return(
      <div className='menuSection'>
        <div className='categoryHeader'>{props.category.toUpperCase()}</div>
        <div className='menuItems'>
          {props.menuItems.map(item => (<MenuItem item={item}/>))}
        </div>
    </div>
    )
}

export default MenuSection
