var mongoose = require("mongoose");
var faker = require("faker");
var ProductModel = require("../models/ProductModel");

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
            const p = new ProductModel();
            p.name = faker.commerce.productName();
            p.department = faker.commerce.department();
            p.price = faker.commerce.price();
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