import React from 'react'
import { Item, Icon, Grid } from 'semantic-ui-react'

const ResultListItem = (props) => {
    return(

      <Item className='resultsListItem'>
          <div className='restaurantSaveList'>
          <Icon name='heart empty' color='grey' ></Icon>
          </div>
          <Item.Content verticalAlign='middle' href={`/places/${props.place.id}`}>
            <Item.Header>
            {props.place.name}
            </Item.Header>
            <Item.Meta><em>{props.place.menu_items.length.toString()} items under $5</em></Item.Meta>
            </Item.Content>
            <Item.Content href={`/places/${props.place.id}`}>
              <div className='resultsListItemArrow'>
              <Icon name='angle right' size='big'></Icon>
            </div>
            </Item.Content>

     </Item>

    )
}

export default ResultListItem
