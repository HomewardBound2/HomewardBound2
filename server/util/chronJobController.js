const schedule = require('node-schedule');
const chronJobController = {};
const User = require('./../user/userController');
const twilioController = require('./twilioController');

/*
*   Search npm node-schedule for documentation
*/



/*
*   The chronjob that will run the hourly 
*/
chronJobController.scheduleJob = function (req, res, next) {
    schedule.scheduleJob('0 * * * *', function(){
        User.find({}, (err, users) => {
            if (err) console.log(err);
            else{
                for (user in users) {
                    for (query in user.queries){
                        // set results to be what is returned from the craigslist call
                        //  chronJobController.sendMessage(/*results*/, query.viewed, user.phone);
                    }
                }
            }
        });
    });
}

/*
*   HACK HACK HACK
*/
chronJobController.sendMessage = function (results, viewed, phone) {
    const client = twilioController.getClient();
    const titles = [];
    // holds the pages that have not been viewed before
    const validPage = [];
    let msg = '';
    // gets the titles of all the viewed objects
    for (let index = 0; index < viewed.length; index++) {
        titles.push(viewed[index].title);
    }
    for(let index = 0; index < results.length; index++) {
        if (!titles.includes(results[index].title))
            validPages.push(results[index]);
    }
    // validPages

    for(page in validPages) {
        msg.concat(page.url + " %0a ");
    }

    client.messages.create({
        to: phone,
        from: "+18185325408",
        body: msg,
        }, function(err, message) {
            console.log(message.sid);
    });

}

module.exports = chronJobController;