import React from 'react';
import styles from './Restaurant.styles.css';
import axios from 'axios';
const key = require('../../../config/google.js');

class Restaurants extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            rID: 0
        }
        this.styleRestaurant = this.styleRestaurant.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.randomSelect = this.randomSelect.bind(this);
        this.openTableLink = this.openTableLink.bind(this);
        this.rID = null;
    }
    
    styleRestaurant(restaurant) {
        return (
            <div> 
            ID: {restaurant.place_id},
            Restaurant: {restaurant.name},
            Price Level: {restaurant.price_level},
            Rating: {restaurant.rating}
            </div>
        )
    };
    
    handleClick(event) {
        const sortData = (eventText) => {
            var innerText = eventText.target.innerText.split(',');
            console.log(innerText);
            var items = [];
            
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
    
    openTableLink(str) {
        var arr = [];
        arr.push(str);
        
        return `${arr[0]}`
    }
    
    handleLink(name) {
        var print; 
        // return id; 
        axios.get(`http://opentable.herokuapp.com/api/restaurants?name=${name}`)
        .then((response) => {
            console.log(response.data.restaurants[0].id);
            var rID = response.data.restaurants[0].id
        //    var print = this.handleLink(rID)
            this.rID = rID;
          })
          .catch(function (error) {
            console.log(error);
          })
        console.log(print);

        return print; 
    }

    
    randomSelect(num) {
        var randomIndex = Math.floor(Math.random() * Math.floor(this.props.list.length - 1));
        var randomRestaurant = this.props.list[randomIndex];
        //   console.log("random restaurant info", randomRestaurant.place_id);
        console.log(randomRestaurant)

        var str = [randomRestaurant.name].join(' ');

        var link = this.handleLink(str[0]);
      
console.log(link);
        var dummyRestaurant = {
            name: "E & O kitchen and bar", 
            address: '300 Ivy Street, San Francisco, CA 94102', 
            price_level: 4, //must reference randomrestaurant object
            opening_hours: {
                open_now: true
            }, 
            ratings: 4,
            reviews: [ //must reference detaislrequestsent object
                { 
                    author_name: 'Allen Smith',
                    rating: 1, 
                    text: 'the food was okay nothing special '
                }, 
                { 
                    author_name: 'Allen Smith',
                    rating: 2, 
                    text: 'the food was okay nothing special '
                }, 
                { 
                    author_name: 'Allen Smith',
                    rating: 3, 
                    text: 'the food was okay nothing special '
                }, 
                { 
                    author_name: 'Allen Smith',
                    rating: 4, 
                    text: 'the food was okay nothing special '
                }, 
                { 
                    author_name: 'Allen Smith',
                    rating: 5, 
                    text: 'the food was okay nothing special '
                }, 
            ]
        }
        

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
    
    return (
        <div className= {styles.restaurantContainer}> 
        
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

       
        <div> OPENING HOURS: {randomRestaurant.opening_hours.open_now ? 'Open Now' : 'Closed' }</div>
        
        <div> REVIEWS </div> 
            <div className={styles.reviews}>  
            {
                dummyRestaurant.reviews.map((review) => {
                    return (
                    <div>
                    <div>" {review.text} "</div>
                    <div> - {review.author_name}, {review.rating} </div>
                    </div>
                 );
                 })
            }
        
            </div>
       
        </div>
        </div>
        </div>
        
        <div className={styles.booking}> 
        {/* {
            axios.get(`http://opentable.herokuapp.com/api/restaurants?name=${this.openTableLink(randomRestaurant.name)}`)
            .then(function (response) {
                console.log(response.data.restaurants[0].id);
                var rID = response.data.restaurants[0].id
                this.handleLink(rID)
                
              })
              .catch(function (error) {
                console.log(error);
              })
        } */}
        {/* <iframe src={`https://www.opentable.com/widget/reservation/canvas?rid=${this.state.rID}&amp;type=standard&amp;theme=standard&amp;overlay=false&amp;domain=com&amp;lang=en-US&amp;r3abvariant=false&amp;r3uid=mDKkyGS6t&amp;newtab=false&amp;disablega=false`} width="224" height="301" frameborder="0" scrolling="no"></iframe> */}
        <iframe src="https://www.opentable.com/widget/reservation/canvas?rid=48010&amp;type=standard&amp;theme=standard&amp;overlay=false&amp;domain=com&amp;lang=en-US&amp;r3abvariant=false&amp;r3uid=mDKkyGS6t&amp;newtab=false&amp;disablega=false" width="224" height="301" frameborder="0" scrolling="no"></iframe>
        {/* <script type='text/javascript' src={`//www.opentable.com/widget/reservation/loader?rid=${this.handleLink()}&type=standard&theme=standard&iframe=true&overlay=false&domain=com&lang=en-US`}></script> */}
        </div>
        </div>
    )
}

render() { 
    // var callThis;
    // callThis = this.state.rID === 0 ? this.randomSelect() : 
    // if (this.state.rID === 0 ? ) {
        return (
            <div className={styles.restaurantsContainer}>
            {/* <h1 className={styles.welcomeTitle}> I Won't Tell Anyone </h1> */}
            <div>
            { this.randomSelect() }
            </div>
            </div>
        )

    } 
    // return null; 


// <script type='text/javascript' src='//www.opentable.com/widget/reservation/loader?rid=347401&type=standard&theme=standard&iframe=true&overlay=false&domain=com&lang=en-US'></script>
//listALL restaurants
// render() { 
//     return (
//         <div>
//         <h1> Restaurant List </h1>
//         <div>
//         {
//             this.props.list.map((restaurant) => {
//                 return (
//                     <div value={restaurant} className={styles.restaurantContainer} onClick={this.handleClick}> 
//                     {this.styleRestaurant(restaurant)}
//                     </div>
//                 )
//             })
//         }
//         </div>
//         </div>
//     )
// }
}

export default Restaurants;