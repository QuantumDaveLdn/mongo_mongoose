const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://davronbecki44:${password}@cluster0.lscn81l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

let Person;

const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number, 
  favoriteFoods: [String]

});

Person = mongoose.model("Person", personSchema);
const person = new Person({
    name: "John Doe", 
    age: 30,
    favoriteFoods: ["pizza", "pasta", "sushi"]
  });

const createAndSavePerson = (done) => {
  person.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  }); 
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person) {
    if (err) return console.error(err);

    person.favoriteFoods.push(foodToAdd);

    person.save(function(err, updatedPerson) {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });

  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    {name: personName},
    {age: ageToSet},
    {new: true}, 
    function(err, person) {
    if (err) return console.error(err);
    done(null, person);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, person) {
    if (err) return console.error(err);
    done(null, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select("-age")
  .exec(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
