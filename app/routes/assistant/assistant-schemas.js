
var Joi = require('joi')

const getAssistantSchema = Joi.object({
 
})

const postAssistantSchema = Joi.object({
    city: Joi.string().required().optional(),
})


module.exports = {
	getAssistantSchema,
	postAssistantSchema

}
