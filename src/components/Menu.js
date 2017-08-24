import React, { Component } from 'react'
import MenuSection from './MenuSection'

const Menu = (props) => {
  return(
    <div>
      <h1>{props.name}</h1>
      <h5>{props.address}</h5>
      <h2>Menu Items Under $5:</h2>

      <div>
        {props.categories.map(category =>  <MenuSection category={category} menuItems={props.menuItems.filter(item =>  item.category === category)} />)}
      </div>
    </div>
  )
}

export default Menu
