import React, { Component } from 'react';
import './GoogleApiWrapper.scss';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


const mapStyles = {
  width: '100%',
  height: '100%'
};



export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: null
    }
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.setState({position: pos});
      }, (error) => console.log(error))
    }
  }


  render() {
    return (
      <div className='mapStyles'>
      <Map
        google={this.props.google}
        zoom={14}
        styles={mapStyles}
        initialCenter={{
         lat: 35.228350,
         lng: -80.835180
        }}
        >
        {this.state.position &&
        <Marker
          title="You are here"
          name="You are here"
          position={this.state.position}
          icon={{
            url: "https://cdn4.iconfinder.com/data/icons/map-pins-2/256/13-512.png",
            anchor: new google.maps.Point(32,32),
            scaledSize: new google.maps.Size(64,64)
          }}
          />
        }
      </Map>
      </div>
    );
  }
};




    // InfoWindow.setPosition(pos);
    // InfoWindow.setContent('Location found.');
    
    // InfoWindow.open(map);
    // map.setCenter(pos);
    // console.log(setContent, setPosition);
//   }, function() {
//     handleLocationError(true, InfoWindow, map.getCenter());
//   });
// } else {
//   // Browser doesn't support Geolocation
//   handleLocationError(false, InfoWindow, map.getCenter());
// }


function handleLocationError(browserHasGeolocation, InfoWindow, pos) {
// InfoWindow.setPosition(pos);
// InfoWindow.setContent(browserHasGeolocation ?
//                       'Error: The Geolocation service failed.' :
//                       'Error: Your browser doesn\'t support geolocation.');
// InfoWindow.open(map);
}

//export default GoogleApiWrapper(MapContainer);
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCcfXJfUVhsnkC9HHFu6C7WJADS_AoJLqA'
})(MapContainer);