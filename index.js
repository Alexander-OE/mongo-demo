const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to mongoDB...", err));

//  ############### SCHEMA #################3
// This is used to define the shape of documents in a mongoDB collection
// Schema Types are : String, Number, Date, Buffer, Boolean, ObjectID, Array

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  // Default value
  date: { type: Date, default: Date.now },
  isPulished: Boolean,
});



// ########### MODEL ###############

// Classes(human) & object(an instance of a class eg: john)
// A class is a blueprint but an object is an instance of that blueprint

// Takes two arguments:
// 1st -- is the singular name that the collection is for.

// 2nd -- the schema that defines the shape of documents in this collection.
// pascal naming convention is being used to name the variable so this means this is a class.



const Course = mongoose.model("Course", courseSchema);
// The object(camela case)
async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Ichigo",
    tags: ["angular", "frontend"],
    isPulished: true,
  });

  const result = await course.save();
  console.log(result);
}

// ############## FIND ####################
// ##############  comparison operators  #####################
// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to)
// lt (less than)
// lte (less than or equal to)
// in 
// nin (not in)
// ##########  EXAMPLE ###########
// .find({Proce: 10}) - original
// .find({price: {$gt: 10, $lte: 20}})
    // .find({price: {$in: [10, 15, 20] }})

// ############## LOGICAL OPERATORS ################
// or
// and 
// ##############################################
// ####### EXAMPLE #########
    // .find()
    // .or([{author: "Ichigo"}, {isPulished: true}])
    // .and([{}, {}])


// ############ REGULAR EXPRESSIONS #################
    // Starts with ichigo
    // .find({author: /^Ichigo/ })
    
    // ########### Contains Ichigo ############
    // .* means we can have zero or more characters before or after ichigo
// .find({author: /.*Ichigo.*/})



    // Ends with bankai
    // this is normally case-seneitive but to make it insensitive we add 'i' after the slash
    // .find({author: /bankia$/i})

async function getCourses() {
// Pagination
const pageNumber = 2;
const pageSize = 10;
// In a real world application You pass these values as query string paramters to our RESTful API
// /aoi/courses?pageNUmber=2&pageSize=10

  const courses = await Course
    .find({ author: "Ichigo", isPulished: true })

    .limit(10)
    // key-value pairs(by their name)
    // 1 idencates ascending order
    // -1 is the opposite

    .skip((pageNUmber - 1) * pageSize)
    .sort({name: 1})
    // we can select the properties we want to return
    .select({name: 1, tags: 1})
    // counts - this gives us the number of documents we have in a collection and is sometimes used instead of the ".select()" method
    // .count()
  console.log(courses);
}

getCourses();
