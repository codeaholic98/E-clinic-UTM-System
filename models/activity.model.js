const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    activity_name: {
        type: String,
        required: true
    },
    file : {
        type: String
    }
 
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
