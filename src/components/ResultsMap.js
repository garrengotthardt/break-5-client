import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import PlaceMapPoint from './PlaceMapPoint'

const ResultsMap = (props) => {
  return(
    <div style={{width: '100%', height: '72vh', filter: 'grayscale(70%)'}}>
      <GoogleMapReact
        center={{lat: props.user.lat, lng: props.user.long}}
        defaultZoom={14}
      >
        <PlaceMapPoint
          lat={props.user.lat}
          lng={props.user.long}
          text='your set location'
          linkTo={`/places/search`}
          icon='target'
        />
        {props.allPlaces.map(place => (<PlaceMapPoint
          lat={place.lat}
          lng={place.long}
          name={place.name}
          numberOfItems={place.menu_items.length.toString()}
          place={place}
          linkTo={`/places/${place.id}`}
          icon='circle'
        />))}
      </GoogleMapReact>
    </div>
  )
}

export default ResultsMap
