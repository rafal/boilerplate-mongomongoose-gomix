require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const { Schema } = mongoose;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
  const person = new Person({name: "John Doe", age: 69, favoriteFoods: ["Cocoa", "Milk"] })
  person.save((error, data) => {
    if (error) return done(error);
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, people) => {
    if (error) return console.err(error);
    done(null, people)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (error, people) => {
    if (error) return console.err(error)
    done(null, people)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (error, person) => {
    if (error) return console.err(error)
    done(null, person)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, person) => {
    if (error) return console.err(error)
    done(null, person)
  })
};

const findEditThenSave = (personId, done) => {

  const foodToAdd = "hamburger";

  Person.findById(personId, (error, person) => {

    if (error) return done(error)

    person['favoriteFoods'].push(foodToAdd)

    person.save((error, updatedPerson) => {

      if (error) return done(error);

      done(null, updatedPerson);

    })

  })

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    {name: personName},
    {age: ageToSet},
    { new: true },
    (error, person) => {
      if (error) return console.err(error)
      console.log(person)
      done(null, person)
    }
  )
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, person) => {
    if (error) return console.err(error)
    console.log(person)
    done(null, person)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (error, response) => {
    if (error) return console.err(error)
    console.log(response)
    done(null, response)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
