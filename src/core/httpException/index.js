const HttpException = require('./httpException')
const AuthFailed = require('./authFailed')
const Forbidden = require('./forbidden')
const NotFound = require('./notFound')
const ParameterException = require('./parameterException')
const Success = require('./success')
const LikeError = require('./likeError')
const DislikeError = require('./dislikeError')

module.exports = { HttpException, AuthFailed, Forbidden, NotFound, ParameterException, Success, LikeError, DislikeError }
