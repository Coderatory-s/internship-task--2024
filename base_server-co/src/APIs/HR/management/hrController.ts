import { NextFunction, Request, Response } from 'express'
import httpResponse from '../../../handlers/httpResponse'
import responseMessage from '../../../constant/responseMessage'
import httpError from '../../../handlers/errorHandler/httpError'





deleteUser: (request: Request, response: Response, next: NextFunction) => {
    try {
        // Logic for deleting a user
        httpResponse(response, request, 200, responseMessage.SUCCESS, null)
    } catch (error) {
        httpError(next, error, request, 500)
    }
}
