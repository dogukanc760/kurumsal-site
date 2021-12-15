const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema(
    {
        fullName:{type: 'string', required: true},
        identity: {type: 'string', required: true}
    }
    );

module.exports = mongoose.model("Staff", StaffSchema);