import React from 'react'
import { Item, Icon, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const ResultListItem = (props) => {
    return(
      <div>
      <div className='resultsListItem'>
          <div className='restaurantSaveList'>
            <Icon name='heart empty' color='grey' ></Icon>
          </div>

          <div className='resultsListItemText'>
            <Link to={`/places/${props.place.id}`}>
              <h3>
              {props.place.name}
            </h3>
            <p className='resultsListItemMeta'><em>{props.place.menu_items.length.toString()} items under $5</em></p>
            </Link>
          </div>

          <div className='resultsListItemDistance'>
            <Link to={`/places/${props.place.id}`}>
            <p className='resultsListItemMeta'><em>{(Math.round(props.place.distance/1609.344 * 10)/10).toString()} miles</em></p>
            </Link>
          </div>


            <div className='resultsListItemArrow'>
              <Link to={`/places/${props.place.id}`}>
                  <Icon name='angle right' size='big' color='grey'></Icon>
              </Link>
            </div>
      </div>
      <hr className='resultsListHr'/>
    </div>

    )
}

export default ResultListItem
