import React from 'react'
import ResultListItem from './ResultListItem'
import { Item, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const PlaceMapPoint = (props) => {
    return(
      <Link to={props.linkTo}>
        <Icon name={`${props.icon}`} size='big'/>
      </Link>
    )
}

export default PlaceMapPoint
