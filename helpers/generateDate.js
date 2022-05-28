const moment = require('moment')

module.exports = {
    generateDate : (date, format) => {
        return moment(date).format(format)
    }
}