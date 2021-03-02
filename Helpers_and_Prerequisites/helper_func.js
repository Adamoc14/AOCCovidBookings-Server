const appointment = require('../DB/Models/appointment'),
    user = require('../DB/Models/user');

const getType = (type) => {
    const types = {
        "Appointments" : appointment,
        "Users": user
    }
    return types[type]
}

module.exports = {
    getType
}