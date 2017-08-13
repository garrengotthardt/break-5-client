import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const MenuItem = (props) => {
    return(

      <List.Item as='li' value=''>
      <h3>{props.item.name}</h3>
      <List.Item as='ul'>
        {props.item.item_variations.map(variation => (<List.Item as='li' value='-'>{variation.variation} — ${variation.price.toString()}</List.Item>))}
      </List.Item>
    </List.Item>
    )
}

export default MenuItem
