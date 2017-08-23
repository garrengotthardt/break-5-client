import React, { Component } from 'react'
import { List } from 'semantic-ui-react'
import MenuSection from './MenuSection'

const Menu = (props) => {
  return(
    <div>
      <h1>{props.name}</h1>
      <h5>{props.address}</h5>
      <h3>Menu Items Under $5:</h3>
      
      <List as='ol'>
        {props.categories.map(category =>  <MenuSection category={category} menuItems={props.menuItems.filter(item =>  item.category === category)} />)}
      </List>
    </div>
  )
}

export default Menu
