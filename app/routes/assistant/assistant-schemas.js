
var Joi = require('joi')

const getAssistantSchema = Joi.object({
 
})

const postAssistantSchema = Joi.object({
    name: Joi.string().required(),
})


module.exports = {
	getAssistantSchema,
	postAssistantSchema

}
