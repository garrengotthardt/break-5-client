import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import MenuItem from './MenuItem'

const MenuSection = (props) => {
  console.log(props)
    return(
      <List.Item as='li' value=''>
        <div className='categoryHeader'>{props.category.toUpperCase()}</div>
        <List.Item as='ul'>
          {props.menuItems.map(item => (<MenuItem item={item}/>))}
        </List.Item>
    </List.Item>
    )
}

export default MenuSection
