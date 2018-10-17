var mongoose = require('mongoose');
mongoose.connect('mongodb://student:student12345!@ds037498.mlab.com:37498/iobviouslyplannedthis', {
  useMongoClient: true
});

var db = mongoose.connection;

db.on('error', function(err) {
  console.log('mongoose connection error', err);

});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var restaurantSchema = mongoose.Schema({
  name: String,
  price_level: Number,
  rating: Number,
  count: Number
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);

var selectAll = function(callback) {
  Restaurant.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};


var updateLikedRestaurant = (restaurantInfo, callback) => {
  var restaurantItem = new Restaurant({
    place_id: restaurantInfo.place_id,
    name: restaurantInfo.name,
    price_level: restaurantInfo.price_level,
    rating: restaurantInfo.rating,
    count: restaurantInfo.count
  });

  Restaurant.find({name: restaurantInfo.name}, function(err, restaurant) {
    if (restaurant.length === 0) {
      // console.log("empty object found");
      restaurantItem.save((err) => {
        if (err) {
          console.log('NEW error in saving restaurant in db', err);
        } 
      });
    } else {
      var newCount = restaurant[0].count + 1;
      // console.log("RESTAURANT COUNT", restaurant[0].count)
      Restaurant.findOneAndUpdate({name: restaurantInfo.name}, {count: newCount}, function (err, result) {
        if (err) {
          // console.log("could not update count", err);
          callback(err, null);
        } else {
          // console.log('successfully updated entry', result);
          // console.log(result);
          callback(null, result);
        }
      });
    }
  });
}

module.exports = {
  updateLikedRestaurant, selectAll
};