import React, { Component } from 'react'
import MenuSection from './MenuSection'

const Menu = (props) => {
  return(
    <div className='menu'>
      <h3>Menu Items Under $5:</h3>
      {props.categories.map(category =>  <MenuSection category={category} menuItems={props.menuItems.filter(item =>  item.category === category)} />)}
    </div>
  )
}

export default Menu
