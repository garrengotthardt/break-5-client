import React from 'react'
import ResultListItem from './ResultListItem'
import { Item, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const PlaceMapPoint = (props) => {
    return(
      <div>
        <Link to={props.linkTo}><Icon name={`${props.icon}`} size='big'></Icon></Link>
      </div>
    )
}

export default PlaceMapPoint
