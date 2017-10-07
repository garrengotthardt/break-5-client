import React from 'react'
import ResultListItem from './ResultListItem'

const List = (props) => {
  console.log("list props", props)
    return(
      <div className='resultsListContainer'>
        <hr className='resultsListHr'/>
        {props.displayedPlaces.map(place => (<ResultListItem userID={props.user.id} place={place} savedPlaces={props.savedPlaces} favoritePlace={props.favoritePlace} unfavoritePlace={props.unfavoritePlace}/>))}
      </div>
    )
}

export default List
