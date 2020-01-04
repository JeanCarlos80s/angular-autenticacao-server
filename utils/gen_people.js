var mongoose = require("mongoose");
var faker = require("faker");
var PersonModel = require("../models/PersonModel");

const uri = 'mongodb+srv://<username>:<password>@cluster0-<cluster>.mongodb.net/<tablename>?retryWrites=true&w=majority';
// Prints "MongoError: bad auth Authentication failed."
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).then(
    () => console.log('Conected...')
).catch(
    err => console.log(err.reason)
);

async function add(n) {
    try {
        for (let i = 0; i < n; i++) {
            const p = new PersonModel();
            p.name = faker.name.firstName();
            p.country = faker.address.country();
            p.email = faker.internet.email();
            p.company = faker.company.companyName();
            await p.save();
        }
    } catch (error) {
        console.log(error);
    }
}

add(100).then(() => {
    console.log("Ok");
    mongoose.disconnect();
})