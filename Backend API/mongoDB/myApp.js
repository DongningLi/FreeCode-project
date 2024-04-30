require('dotenv').config();

// 1. Install and Setup Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//check mongoose has been connected
// mongoose.connection.on('connected', () => {
//   console.log("Mongoose is connected!")
// })

// 2. create a schema
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
})

const Person = mongoose.model('Person', personSchema);

//3. Create a person
const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Suaashi'],
  });

  person.save(function (err, data) {
    if (err) return console.error("err:", err);
    done(null, data);
  })

};
// createAndSavePerson;


//4. create multiple people
const arrayOfPeople = [
  { name: "Frankie", age: 74, favoriteFoods: ["Del Taco"] },
  { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
  { name: "Robert", age: 78, favoriteFoods: ["wine"] }
];

const createManyPeople = function (arrayOfPeople, done) {

  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};
// createManyPeople(arrayOfPeople);


const findPeopleByName = (personName, done) => {

  Person.find({ name: personName }, (err, peopleFound) => {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, personFoundByFood) => {
    if (err) return console.log(err);
    done(null, personFoundByFood);
  });

};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFoundById) => {
    if (err) return console.log(err);
    done(null, personFoundById);
  });
}

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  /*
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      if (err) return console.log(err);
      done(null, updatedDoc);
    }
  );
  */

  Person.findOne({ name: personName }, (err, person) => {
    if (err) return console.log(err);

    person.age = ageToSet;

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

// findAndUpdate("John Doe1")

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Frankie";

  Person.remove({ name: nameToRemove }, (err, dataToremove) => {
    if (err) return console.log(err);
    done(null, dataToremove);
  });
};

const queryChain = (done) => {
  const foodToSearch = "Pizza";

  Person.find({ favoriteFoods: foodToSearch })
    .sort('name')
    .limit(2)
    .select(['name', 'favoriteFoods'])
    .exec((err, data) => {
      if (err) return console.log(err);
      done(err, data);
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
