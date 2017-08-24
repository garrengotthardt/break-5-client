import React from 'react'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'

const MenuItem = (props) => {
    return(
      <List.Item as='li' value=''>
        <h4>{props.item.name}</h4>
        <List.Item as='ul'>
          {props.item.item_variations.reverse().map(itemVar => (
            <List.Item as='li' value='-'>
              {itemVar.variation} — ${itemVar.price.toString()}
            </List.Item>))}
        </List.Item>
    </List.Item>
    )
}

export default MenuItem
