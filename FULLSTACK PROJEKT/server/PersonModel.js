const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: String,
    password: String
});
  
const Person = mongoose.model('Person', personSchema);


exports.createPerson = (name, password) => {
    var person = new Person({
        name: name, 
        password: password
    })

    return person
}

