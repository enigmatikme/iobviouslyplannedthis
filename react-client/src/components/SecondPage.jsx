import React from 'react';
import styles from './SecondPage.styles.css';
import Restaurants from './Restaurants.jsx';

export default class SecondPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nearbyRestaurants: []
        };
    }
    
    componentDidMount() {
        var that = this;
        var center = new google.maps.LatLng(this.props.latitude, this.props.longitude);
        
        var nearbyRestaurantsList = [];
        let map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: this.props.latitude, lng: this.props.longitude},
            zoom: 18,
            mapTypeId: 'roadmap',
        });
        
        var request = {
            location: center,
            radius: 1000,
            type: ['restaurant']
        }
        
        var placeId = `${this.props.placeId}`;
        var infowindow = new google.maps.InfoWindow();
        
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request,function callback (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                    nearbyRestaurantsList.push(results[i]);
                }
            }
            that.setState({nearbyRestaurants: nearbyRestaurantsList});
        });
        
        // PLACE DETAILS REQ
        // service.getDetails({placeId}, function callback (place, status) {
        //     if (status === google.maps.places.PlacesServiceStatus.OK) {
        //         var marker = new google.maps.Marker({
        //             map: map,
        //             position: place.geometry.location
        //         });
        //         console.log(place);
        
        //         google.maps.event.addListener(marker, 'click', function() {
        //             infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        //             'Place ID: ' + place.place_id + '<br>' +
        //             place.formatted_address + '</div>');
        //             infowindow.open(map, this);
        //             // infowindow.setContent(place.name);
        //             //         infowindow.open(map, this);
        //         });
        //     }
        // });
        
        new window.google.maps.Marker({
            map: map,
            position: {lat: this.props.latitude, lng: this.props.longitude},
        });
        
        var createMarker = (place) => {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: placeLoc
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
            });
        }
        
        map.addListener('zoom_changed', () => {
            this.setState({
                zoom: map.getZoom(),
            });
        });
        
        map.addListener('maptypeid_changed', () => {
            this.setState({
                maptype: map.getMapTypeId(),
            });
        });
        
    }
    
    render() {
        if (this.state.nearbyRestaurants.length !== 0) {
            return (
                <div className={styles.restaurantContainer}> 
                <Restaurants list={this.state.nearbyRestaurants}/> 
                </div>
            );
            
        }
        return null;
    }
};


