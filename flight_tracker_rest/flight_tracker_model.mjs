import mongoose from 'mongoose';

// Connect to the flight collection in the MongoDB server. Runs on port 27017.
mongoose.connect(
    'mongodb://localhost:27017/flights',
    { useNewUrlParser: true }
)

const db = mongoose.connection;

// Validate db connection
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose.');
});

// define schema for the flight object
const flightSchema = mongoose.Schema({
    departingAirport: { type: String, required: true },
    arrivingAirport: { type: String, required: true},
    departingDate: { type: String, required: true},
    arrivingDate: { type: String, required: false}
});

// define schema for email object
const emailSchema = mongoose.Schema({
    emailAddress: { type: String, required: true },
});

// define schema for flight results object
const flightResultsSchema = mongoose.Schema({
    results: { type: Array, required: true },
});

// Compile the model from the schema
const Flight = mongoose.model('Flight', flightSchema);

// Compile the model from email schema
const Email = mongoose.model('Email', emailSchema);

// Compile the model from flightresults schema
const FlightResults = mongoose.model('FlightResults', flightResultsSchema);

/**
 * Creates an Flight object
 * 
 * @param {String} departingAirport
 * @param {String} arrivingAirport
 * @param {String} departingDate
 * @param {String} arrivingDate
 * @returns Promise - resolved to JSON after .save
 */

 const createFlight = async (departingAirport, arrivingAirport, departingDate, arrivingDate) => {
    const flight = new Flight({ departingAirport: departingAirport,
                                arrivingAirport: arrivingAirport,
                                departingDate: departingDate,
                                arrivingDate: arrivingDate });
    return flight.save();
}

/**
 * Creates an Email object
 * 
 * @param {String} emailAddress
 * @returns Promise - resolved to JSON after .save
 */

const createEmail = async (emailAddress) => {
    const email = new Email({ emailAddress: emailAddress })
    return email.save()
}

/**
 * Creates an FlightResults object
 * 
 * @param {Array} results
 * @returns Promise - resolved to JSON after .save
 */

const createFlightResults = async (results) => {
    const flightResults = new FlightResults({ results: results});
    return flightResults.save();
}


export { createFlight, createEmail, createFlightResults };
