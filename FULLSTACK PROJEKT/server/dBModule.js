const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webshop', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

exports.findInDB = async (element) => {
  return await element.find({})
}


exports.storeElement = async (element) => {
  
     await element.save(()=>{
       console.log("Successfully saved element in database!")
     })
}