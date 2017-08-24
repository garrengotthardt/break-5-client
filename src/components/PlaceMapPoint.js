import React, { Component } from 'react'
import ResultListItem from './ResultListItem'
import { Item, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class PlaceMapPoint extends Component {
  constructor(props){
    super(props)

    this.state = {
      displayDetails: false
    }
  }

  onMouseOver = () => {
    if (this.props.icon === 'circle'){
      this.setState({
        displayDetails: true
      })
    }
  }

  onMouseOut = () => {
    if (this.props.icon === 'circle'){
      this.setState({
        displayDetails: false
      })
    }
  }

  render(){
    return(
      <Link to={this.props.linkTo} >
        { this.state.displayDetails ?
          <div style={{position:'absolute', display: 'block', bottom: '-4px', left: '20px', backgroundColor:'#969696', opacity: '.95', height: '60px', width: '220px', zIndex: '10000', padding: '10px 15px', borderRadius: '10px 10px 10px 0'}}>
            <div style={{color:'#fff', fontSize: '16px'}}>{this.props.name}</div>
            <div style={{color:'#ccc', fontSize: '16px', fontStyle: 'italic', padding: '5px 0'}}>{this.props.numberOfItems} items under $5</div>
          </div>
          :
          null
        }
        <Icon name={`${this.props.icon}`} onMouseOver={() => this.onMouseOver()} onMouseOut={() => this.onMouseOut()} size='big' />
      </Link>
    )
  }
}

export default PlaceMapPoint
