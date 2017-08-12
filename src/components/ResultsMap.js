import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react';
import PlaceMapPoint from './PlaceMapPoint'

const Resultsmap = ({ text }) => <div>{text}</div>;

class ResultsMap extends Component {
  // static defaultProps = {
  //   center: ,
  //   zoom: 11
  // };
  constructor(props){
    super(props)
  }

  render() {
    return (
      <Container style={{width: '100%', height: '400px'}}>
      <GoogleMapReact
        center={{lat: 40.6660731, lng: -73.9840833}}
        defaultZoom={11}
      >

        <PlaceMapPoint
          lat={this.props.currentUserLat}
          lng={this.props.currentUserLong}
          text='your set location'
          linkTo={`/places/search`}
          icon='target'
        />


        {this.props.allPlaces.map(place => (<PlaceMapPoint
          lat={place.lat}
          lng={place.long}
          text={place.name}
          linkTo={`/places/${place.id}`}
          icon='circle'
        />))}

      </GoogleMapReact>
    </Container>
    );
  }
}

export default ResultsMap
