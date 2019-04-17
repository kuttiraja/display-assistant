const { getHandler, postHandler } = require('./assistant')
const router = require('express').Router()
const { bodyValidator, paramValidator, queryValidator } = require('../../middleware')
const { getAssistantSchema, 
        postAssistantSchema
        } = require('./assistant-schemas')

router.get('/', queryValidator(getAssistantSchema), getHandler)
router.post('/', postHandler)

module.exports = router
