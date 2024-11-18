import { NextFunction, Request, Response } from 'express'
import { IAuthenticateRequest, IDecryptedJwt } from '../types/types'
import jwt from '../utils/jwt'
import config from '../config/config'
import candidateRepo from '../APIs/recruitment/model/Candidaterepo'
import httpError from '../handlers/errorHandler/httpError'
import responseMessage from '../constant/responseMessage'
import asyncHandler from '../handlers/async'

const authmiddleware = asyncHandler(async (request: Request, _response: Response, next: NextFunction) => {
    try {
        const req = request as IAuthenticateRequest
        const { cookies } = req
        const { accessToken } = cookies as { accessToken: string | undefined }

        if (!accessToken) {
            // Send unauthorized error if no token is found
            return httpError(next, new Error(responseMessage.UNAUTHORIZED), request, 401)
        }

        // Verifying token
        const decryptedToken = jwt.verifyToken(accessToken, config.TOKENS.ACCESS.SECRET) as IDecryptedJwt

        if (!decryptedToken || !decryptedToken.userId) {
            return httpError(next, new Error(responseMessage.UNAUTHORIZED), request, 401)
        }

        // Retrieve user from database

        const user = await candidateRepo.getCandidateById(decryptedToken.userId)
        if (!user) {
            return httpError(next, new Error(responseMessage.UNAUTHORIZED), request, 401)
        }

        // Assign authenticated user to the request

        req.authenticatedUser = user
        return next()
    } catch (error) {
        // Handle any unexpected errors
        httpError(next, error, request, 500)
    }
})
export default authmiddleware
