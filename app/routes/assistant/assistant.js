//const { logger, config } = require('../../core')

function getHandler(req, res, next) {  
        res.status(200).send('hello World!!! get Request')
}
function postHandler(req, res, next) {  
        res.status(200).send('hello World!!! Post Request')
}


module.exports = { 
	getHandler,
	postHandler
}

