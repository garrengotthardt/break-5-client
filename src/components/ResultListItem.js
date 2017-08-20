import React from 'react'
import { Item, Icon, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const ResultListItem = (props) => {
    return(

      <Item className='resultsListItem'>
          <div className='restaurantSaveList'>
          <Icon name='heart empty' color='grey' ></Icon>
          </div>

          <Item.Content verticalAlign='middle'>
            <Link to={`/places/${props.place.id}`}>
            <Item.Header>
            {props.place.name}
            </Item.Header>
            <Item.Meta><em>{props.place.menu_items.length.toString()} items under $5</em></Item.Meta>
            </Link>
            </Item.Content>


            <Item.Content >
              <Link to={`/places/${props.place.id}`}>
                <div className='resultsListItemArrow'>
                  <Icon name='angle right' size='big'></Icon>
                </div>
              </Link>
            </Item.Content>


          </Item>

    )
}

export default ResultListItem
