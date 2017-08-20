import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import PlaceMapPoint from './PlaceMapPoint'
import { Container, Label, Icon } from 'semantic-ui-react'
import CurrentLocationLabel from './CurrentLocationLabel'


class ResultsMap extends Component {
  constructor(props){
    super(props)
  }

  render() {
    console.log("results map props",this.props)
    return(
      <div >
        <Container>
          <CurrentLocationLabel currentLocation={this.props.user.address}/>

      <div style={{width: '100%', height: '80vh'}}>
      <GoogleMapReact
        center={{lat: this.props.user.lat, lng: this.props.user.long}}
        defaultZoom={14}
      >

        <PlaceMapPoint
          lat={this.props.user.lat}
          lng={this.props.user.long}
          text='your set location'
          linkTo={`/places/search`}
          icon='target'
        />


        {this.props.allPlaces.map(place => (<PlaceMapPoint
          lat={place.lat}
          lng={place.long}
          place={place}
          linkTo={`/places/${place.id}`}
          icon='circle'
        />))}

      </GoogleMapReact>
    </div>
    </Container>
  </div>
    );
  }
}

export default ResultsMap
