import { Request } from 'express'
import { ICandidate } from '../APIs/recruitment/model/Candidate'
import { JwtPayload } from 'jsonwebtoken'

export type THttpResponse = {
    success: boolean
    statusCode: number
    request: {
        ip?: string | null
        method: string
        url: string
    }
    message: string
    data: unknown
}

export type THttpError = {
    success: boolean
    statusCode: number
    request: {
        ip?: string | null
        method: string
        url: string
    }
    message: string
    data: unknown
    trace?: object | null
}

export interface IAuthenticateRequest extends Request {
    authenticatedUser: ICandidate
}

export interface IDecryptedJwt extends JwtPayload {
    userId: string
}
declare module 'express-serve-static-core' {
    interface Request {
      user?: JwtPayload | string;
    }
  }