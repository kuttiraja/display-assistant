
var Joi = require('joi')

const getAssistantSchema = Joi.object({
 
})

const postAssistantSchema = Joi.object({
    city: Joi.string().required(),
})


module.exports = {
	getAssistantSchema,
	postAssistantSchema

}
