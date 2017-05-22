// Twilio Account Info
const accSid = 'ACecf93d2358b8da19e3a042a161ce12ec';
const accToken = '41844a3136eeb78ee43c23d572ba392f';

// create twilio client
const client = require('twilio')(accSid, accToken);


const twilioController = {};

/*
*   getClient - hacky way to get the chronjob working
*/
twilioController.getClient = function(){
    return client;
}


/*
*   filterData - Filter the data receieved with the previously viewed data
*
*   Type: Middleware
*
*   @param req - http.IncomingRequest
*   @param res - http.ServerResponse
*   @param next - Callback with signature ([err])
*/
twilioController.filterData = function (req, res, next) {
    // // get the new list, and the viewed data
    // const viewed = req.body.viewed;
    // const list = req.body.list;

    // // holds the titles that have been viewed before
    // const titles = [];

    // // holds the pages that have not been viewed before
    // const validTitles = [];

    // // gets the titles of all the viewed objects
    // for (let index = 0; index < viewed.length; index++) {
    //     titles.push(viewed[index].title);
    // }

    // // adds the valid titles to the validTitles array
    // for(let index = 0; index < list.length; index++) {
    //     if (!titles.includes(list[index].title))
    //         validTitles.push(list[index]);
    // }

    // // adds an array of page objects to the request body
    // req.body.pages = validTitles;
    req.body.pages = req.body.list;

    next();
}

/*
*   formatMessage - Format the recieved data and pass to the endpoint
*
*   Type: Middleware
*
*   @param req - http.IncomingRequest
*   @param res - http.ServerResponse
*   @param next - Callback with signature ([err])
*/
twilioController.formatMessage = function (req, res, next) {
    // TODO: Stretch Feature - tinyURL the links
    const pages = req.body.pages;
    let message = '';
    for(page in pages) {
        message.concat(page.url + " %0a ");
    }

    // Adds a message(string) to the request body
    req.body.message = message;

    next();
}

/*
*   postMessage - Send the text message after the data to be sent is filtered,
*   and properly formatted. Wrapper for the client.messages.create function.
*
*   Type: End Point
*
*   @param req - http.IncomingRequest
*   @param res - http.ServerResponse
*   @param next - Callback with signature ([err])
*/
twilioController.postMessage = function (req, res, next) {
    // use the twilio client to send the message to the user
    client.messages.create({
        to: req.body.phone,
        from: "+18185325408",
        body: req.body.message,
        }, function(err, message) {
            console.log(message.sid);
    });
    // End Point
    res.end();
}

module.exports = twilioController;