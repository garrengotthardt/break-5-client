import React from 'react'
import { Item, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const ResultListItem = (props) => {
    return(

      <Item onClick={() => props.handleCurrentPlaceSelect(props.place)}>
        <Item.Content verticalAlign='middle'>
          <Item.Header>
            <Link to={`/places/${props.place.id}`}>
            {props.place.name}
           </Link>
         </Item.Header>
          <Item.Meta>{props.place.name}</Item.Meta>
        </Item.Content>
     </Item>
    )
}

export default ResultListItem
