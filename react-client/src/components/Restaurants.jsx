import React from 'react';
import styles from './Restaurant.styles.css';
import axios from 'axios';

class Restaurants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rID: 0,
            randomRestaurant: null,
            str: ''
        }
        this.styleRestaurant = this.styleRestaurant.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.randomSelect = this.randomSelect.bind(this);
        this.openTableLink = this.openTableLink.bind(this);
        this.rID = null;
    }
    
    componentDidMount () {
        this.randomSelect()
    }
    
    styleRestaurant (restaurant) {
        return (
            <div>
            ID: {restaurant.place_id},
            Restaurant: {restaurant.name},
            Price Level: {restaurant.price_level},
            Rating: {restaurant.rating}
            </div>
        )
    };
    
    handleClick (event) {
        debugger
        const sortData = (eventText) => {
            let innerText = eventText.target.innerText.split(',');
            console.log(innerText);
            let items = [];
            
            for (let i = 0; i < innerText.length; i++) {
                if (i !== 0) {
                    items.push(parseFloat((innerText[i].split(':')[1])));
                } else {
                    items.push((innerText[i].split(':'))[1]);
                }
            }
            
            var data = {
                placeID: items[0],
                name: items[1],
                price_level: items[2],
                rating: items[3],
                count: 1
            }
            console.log(data);
            return data;
        };
        
        axios.post('/savedLikes', sortData(event))
        .then((response) => {
            console.log("success response in handleclikc", response)
        })
        .catch(error => {
            console.log('unable to save into db, handleclick', error);
        });
        
    }
    
    openTableLink (str) {
        var arr = [];
        arr.push(str);
        
        return `${arr[0]}`
    }
    
    handleLink (address) {
        axios.get(`http://opentable.herokuapp.com/api/restaurants?address=${address}`)
        .then((response) => {
            if(response.data.restaurants.length === 0){
                this.randomSelect()
            } else {
                let rID = response.data.restaurants[0].id
                this.setState({rID: rID})
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    randomSelect () {
        let randomIndex = Math.floor(Math.random() * Math.floor(this.props.list.length - 1));
        let randomRestaurant = this.props.list[randomIndex];
        this.setState({randomRestaurant: randomRestaurant})
        let address = randomRestaurant.vicinity.split(',')[0]
        let newadd = address.replace(/\s+/g, '%20')
        console.log(newadd)
        
        this.handleLink(address);
    }
    
    render () {
        const {randomRestaurant} = this.state
        if (this.state.randomRestaurant === null) {
            return (
                <div>
                Loading
                </div>
            )
        } else {
            return (
                <div className={styles.restaurantsContainer}>
                <div>
                <div className={styles.restaurantContainer}>
                
                <div className={styles.restaurantContainerTitle}>
                
                <div className="restaurantInfoContainer" >
                <div className={styles.restaurantName}> {randomRestaurant.name} </div>
                
                <div className={styles.restaurantInfo}>
                <div className={styles.address}> {randomRestaurant.vicinity} </div>
                
                <div className={styles.formattedRating}>
                <div className={styles.restaurantRating}>
                {randomRestaurant.rating}
                <div className={styles.ratingTitle}> Rating </div>
                </div>
                
                <div className={styles.restaurantPriceLevel}>
                {randomRestaurant.price_level}
                <div className={styles.priceTitle}> Price </div>
                </div>
                </div>
                <div> OPENING HOURS: {randomRestaurant.opening_hours.open_now ? 'Open Now' : 'Closed'}</div>
                <div> REVIEWS </div>
                </div>
                </div>
                </div>
                <div className={styles.booking}>
                {
                    this.state.rID ? 
                    <div>
                    <iframe src={`https://www.opentable.com/widget/reservation/canvas?rid=${this.state.rID}&amp;type=standard&amp;theme=standard&amp;overlay=false&amp;domain=com&amp;lang=en-US&amp;r3abvariant=false&amp;r3uid=mDKkyGS6t&amp;newtab=false&amp;disablega=false`} width="224" height="301" frameBorder="0" scrolling="no" />
                    </div>
                    :
                    null
                }
                </div>
                </div>
                </div>
                </div>
            )
        }
    }
}

export default Restaurants;


//CORB error
//     axios(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${randomRestaurant.place_id}&fields=reviews,formatted_phone_number&key=${key.API_KEY}`, {
//     method: 'GET',
//     mode: 'no-cors',
//     headers: {
//         'crossDomain': true,
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'application/json',
//     },
//     withCredentials: true,
//     credentials: 'same-origin',
// }).then(response => {
//     console.log("get details", response);
// })
// .catch((error) => {
//     console.log(error)
// });