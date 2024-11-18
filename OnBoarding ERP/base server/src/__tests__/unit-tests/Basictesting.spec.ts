import { Request, Response } from 'express'
import { register, loginHandler, UserPasswordResetEmail, userPasswordReset } from '../../APIs/Employee/controllers'
import bcrypt from 'bcrypt'
import Models1 from '../../APIs/Employee/shared/model/Employee.model'
import transporter from '../../APIs/Employee/shared/emailconfig.ts/emailcon' // Adjust the path as necessary
// import config from '../../config/config'
import jwt from 'jsonwebtoken'
import { getEmployees } from '../../APIs/Employee/shared/Dahboard/Employee dashboard' // Adjust the path to your controller
// import Models2 from '../../APIs/Employee/shared/model/companyTour'

jest.mock('../../APIs/Employee/shared/model/Employee.model.ts')
jest.mock('jsonwebtoken')
jest.mock('../../APIs/Employee/shared/emailconfig.ts/emailcon.ts')
jest.mock('bcrypt')
// jest.mock('../../APIs/Employee/shared/model/companyTour.ts') // Mock the Models1 model

describe('User Authentication Handlers', () => {
    let req: Partial<Request>
    let res: Partial<Response>
    let statusMock: jest.Mock
    let jsonMock: jest.Mock
    let sendMock: jest.Mock

    beforeEach(() => {
        req = {
            body: {}
        }
        statusMock = jest.fn().mockReturnThis()
        jsonMock = jest.fn()
        sendMock = jest.fn()
        res = {
            status: statusMock,
            json: jsonMock,
            send: sendMock,
            cookie: jest.fn()
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('register', () => {
        it('should return 400 if required fields are missing', async () => {
            req.body = { firstName: 'John', lastName: 'Doe' } // Incomplete data

            await register(req as Request, res as Response)

            expect(statusMock).toHaveBeenCalledWith(400)
            expect(jsonMock).toHaveBeenCalledWith({ message: 'All fields are required' })
        })

        it('should return 400 if email format is invalid', async () => {
            req.body = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'invalid-email',
                position: 'Developer',
                department: 'Engineering',
                salary: 60000,
                isActive: true,
                password: 'Password123!'
            }

            await register(req as Request, res as Response)

            expect(statusMock).toHaveBeenCalledWith(400)
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Invalid email format' })
        })

        it('should return 400 if an employee with the same email already exists', async () => {
            req.body = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                position: 'Developer',
                department: 'Engineering',
                salary: 60000,
                isActive: true,
                password: 'Password123!'
            }
            ;(Models1.findOne as jest.Mock).mockResolvedValue(true)

            await register(req as Request, res as Response)

            expect(statusMock).toHaveBeenCalledWith(400)
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Employee with this email already exists' })
        })

        it('should return 201 if registration is successful', async () => {
            req.body = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                position: 'Developer',
                department: 'Engineering',
                salary: 60000,
                isActive: true,
                password: 'Password123!'
            }
            ;(bcrypt.genSalt as jest.Mock).mockResolvedValue('salt')
            ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword')
            ;(Models1.findOne as jest.Mock).mockResolvedValue(null)
            ;(Models1.prototype.save as jest.Mock).mockResolvedValue(true)

            await register(req as Request, res as Response)

            expect(statusMock).toHaveBeenCalledWith(201)
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Employee registered successfully: John Doe' })
        })
    })
})
describe('loginHandler', () => {
    let req: Partial<Request>
    let res: Partial<Response>
    let statusMock: jest.Mock
    let sendMock: jest.Mock

    beforeEach(() => {
        req = {
            body: {}
        }
        statusMock = jest.fn().mockReturnThis()
        sendMock = jest.fn()
        res = {
            status: statusMock,
            send: sendMock,
            cookie: jest.fn()
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should return 400 if user is not found', async () => {
        req.body = { email: 'notfound@example.com', password: 'Password123!' }
        ;(Models1.findOne as jest.Mock).mockResolvedValue(null)

        await loginHandler(req as Request, res as Response)

        expect(statusMock).toHaveBeenCalledWith(400)
        expect(sendMock).toHaveBeenCalledWith('Login not successful: User not found')
    })

    it('should return 400 if password is incorrect', async () => {
        req.body = { email: 'john@example.com', password: 'WrongPassword!' }
        ;(Models1.findOne as jest.Mock).mockResolvedValue({ password: 'hashedPassword' })
        ;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

        await loginHandler(req as Request, res as Response)

        expect(statusMock).toHaveBeenCalledWith(400)
        expect(sendMock).toHaveBeenCalledWith('Login not successful: Incorrect password')
    })

    it('should return 200 and set cookie if login is successful', async () => {
        req.body = { email: 'john@example.com', password: 'Password123!' }
        ;(Models1.findOne as jest.Mock).mockResolvedValue({ _id: 'userId', email: 'john@example.com', password: 'hashedPassword' })
        ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)
        ;(jwt.sign as jest.Mock).mockReturnValue('testToken')

        await loginHandler(req as Request, res as Response)

        expect(statusMock).toHaveBeenCalledWith(200)
        expect(sendMock).toHaveBeenCalledWith('Login successful')
        expect(res.cookie).toHaveBeenCalledWith(
            'token',
            'testToken',
            expect.objectContaining({
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000
            })
        )
    })

    it('should return 500 if an error occurs during processing', async () => {
        req.body = { email: 'error@example.com', password: 'Password123!' }
        ;(Models1.findOne as jest.Mock).mockRejectedValue(new Error('Database error'))

        await loginHandler(req as Request, res as Response)

        expect(statusMock).toHaveBeenCalledWith(500)
        expect(sendMock).toHaveBeenCalledWith('Internal server error')
    })
})

describe('UserPasswordResetEmail', () => {
    let req: Partial<Request>
    let res: Partial<Response>
    let statusMock: jest.Mock
    let jsonMock: jest.Mock

    beforeEach(() => {
        req = {
            body: {}
        }
        statusMock = jest.fn().mockReturnThis()
        jsonMock = jest.fn()
        res = {
            status: statusMock,
            send: jsonMock
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should return an error if the email field is empty', async () => {
        req.body = { email: '' }

        await UserPasswordResetEmail(req as Request, res as Response)

        expect(jsonMock).toHaveBeenCalledWith({ status: 'failed', message: 'Email field is required' })
    })

    it("should return an error if the email doesn't exist in the database", async () => {
        req.body = { email: 'nonexistent@example.com' }
        ;(Models1.findOne as jest.Mock).mockResolvedValue(null)

        await UserPasswordResetEmail(req as Request, res as Response)

        expect(jsonMock).toHaveBeenCalledWith({ status: 'failed', message: "Email doesn't exist" })
    })

    it('should send a password reset email if the email exists', async () => {
        req.body = { email: 'user@example.com' }
        const user = { _id: 'userId', email: 'user@example.com' }
        const token = 'mockToken'

        ;(Models1.findOne as jest.Mock).mockResolvedValue(user)
        ;(jwt.sign as jest.Mock).mockReturnValue(token)
        ;(transporter.sendMail as jest.Mock).mockResolvedValue({ messageId: 'mockMessageId' })

        await UserPasswordResetEmail(req as Request, res as Response)

        expect(jwt.sign).toHaveBeenCalledWith({ userID: user._id }, expect.any(String), { expiresIn: '15m' })
        expect(transporter.sendMail).toHaveBeenCalledWith(
            expect.objectContaining({
                from: expect.any(String),
                to: user.email,
                subject: 'GeekShop - Password Reset Link',
                html: expect.stringContaining(`http://localhost:3001/ResetPassword/${user._id}/${token}`)
            })
        )
        expect(jsonMock).toHaveBeenCalledWith({
            status: 'success',
            message: 'Password Reset Email Sent. Please check your email.',
            info: expect.objectContaining({ messageId: 'mockMessageId' })
        })
    })
})
describe('userPasswordReset', () => {
    let req: Partial<Request>
    let res: Partial<Response>
    let statusMock: jest.Mock
    let sendMock: jest.Mock

    beforeEach(() => {
        req = {
            body: {},
            params: {}
        }
        statusMock = jest.fn().mockReturnThis()
        sendMock = jest.fn()
        res = {
            status: statusMock,
            send: sendMock
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should return 404 if the user is not found', async () => {
        req.params = { id: 'nonexistentId', token: 'validToken' }
        ;(Models1.findById as jest.Mock).mockResolvedValue(null)

        await userPasswordReset(req as Request, res as Response)

        expect(statusMock).toHaveBeenCalledWith(404)
        expect(sendMock).toHaveBeenCalledWith({ status: 'failed', message: 'User not found' })
    })

    it('should return 400 if required fields are missing', async () => {
        req.params = { id: 'userId', token: 'validToken' }
        req.body = { password: '', password_confirmation: '' }
        ;(Models1.findById as jest.Mock).mockResolvedValue({ _id: 'userId' })

        await userPasswordReset(req as Request, res as Response)

        expect(statusMock).toHaveBeenCalledWith(400)
        expect(sendMock).toHaveBeenCalledWith({ status: 'failed', message: 'All Fields are Required' })
    })

    it('should return 400 if password does not meet criteria', async () => {
        req.params = { id: 'userId', token: 'validToken' }
        req.body = { password: '12345', password_confirmation: '12345' }
        ;(Models1.findById as jest.Mock).mockResolvedValue({ _id: 'userId' })

        await userPasswordReset(req as Request, res as Response)

        expect(statusMock).toHaveBeenCalledWith(400)
        expect(sendMock).toHaveBeenCalledWith({
            status: 'failed',
            message:
                'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
        })
    })

    it('should return 400 if passwords do not match', async () => {
        req.params = { id: 'userId', token: 'validToken' }
        req.body = { password: 'Password123!', password_confirmation: 'Mismatch123!' }
        ;(Models1.findById as jest.Mock).mockResolvedValue({ _id: 'userId' })

        await userPasswordReset(req as Request, res as Response)

        expect(statusMock).toHaveBeenCalledWith(400)
        expect(sendMock).toHaveBeenCalledWith({ status: 'failed', message: "New Password and Confirm New Password don't match" })
    })

    it('should reset the password successfully', async () => {
        req.params = { id: 'userId', token: 'validToken' }
        req.body = { password: 'Password123!', password_confirmation: 'Password123!' }
        const user = { _id: 'userId' }
        ;(Models1.findById as jest.Mock).mockResolvedValue(user)
        ;(jwt.verify as jest.Mock).mockImplementation(() => true)
        ;(bcrypt.genSalt as jest.Mock).mockResolvedValue('salt')
        ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword')
        ;(Models1.findByIdAndUpdate as jest.Mock).mockResolvedValue({})

        await userPasswordReset(req as Request, res as Response)

        expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 'salt')
        expect(Models1.findByIdAndUpdate).toHaveBeenCalledWith(user._id, { $set: { password: 'hashedPassword' } })
        expect(sendMock).toHaveBeenCalledWith({ status: 'success', message: 'Password Reset Successfully' })
    })

    it('should return 500 if there is an invalid token or server error', async () => {
        req.params = { id: 'userId', token: 'invalidToken' }
        req.body = { password: 'Password123!', password_confirmation: 'Password123!' }
        ;(Models1.findById as jest.Mock).mockResolvedValue({ _id: 'userId' })
        ;(jwt.verify as jest.Mock).mockImplementation(() => {
            throw new Error('Invalid Token')
        })

        await userPasswordReset(req as Request, res as Response)

        expect(statusMock).toHaveBeenCalledWith(500)
        expect(sendMock).toHaveBeenCalledWith({ status: 'failed', message: 'Invalid Token or Server Error' })
    })
})

describe('getEmployees', () => {
    let req: Partial<Request>
    let res: Partial<Response>
    let jsonMock: jest.Mock
    let statusMock: jest.Mock

    beforeEach(() => {
        jsonMock = jest.fn()
        statusMock = jest.fn().mockReturnValue({ json: jsonMock })
        req = {
            body: {
                email: 'test@example.com'
            }
        }
        res = {
            status: statusMock
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should return employee data and welcome messages if employees are found', async () => {
        const mockEmployees = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' }
        ]

        ;(Models1.find as jest.Mock).mockResolvedValue(mockEmployees)

        await getEmployees(req as Request, res as Response)

        expect(statusMock).toHaveBeenCalledWith(200)
        expect(jsonMock).toHaveBeenCalledWith({
            welcomeMessage: "Welcome To Our Employee Dashboard! Here are some employee data's. You can search the employees' data by ID.",
            GreetMessage: "Welcome to the team! Together, we’ll tackle challenges and celebrate successes. We're glad you're here!",
            employees: mockEmployees
        })
    })

    it('should return a 404 status and a "No employees found" message if no employees are found', async () => {
        ;(Models1.find as jest.Mock).mockResolvedValue(null)

        await getEmployees(req as Request, res as Response)

        expect(statusMock).toHaveBeenCalledWith(404)
        expect(jsonMock).toHaveBeenCalledWith({ message: 'No employees found' })
    })

    it('should return a 500 status and a "Server error" message if an error occurs', async () => {
        const mockError = new Error('Test Error')
        ;(Models1.find as jest.Mock).mockRejectedValue(mockError)

        await getEmployees(req as Request, res as Response)

        expect(statusMock).toHaveBeenCalledWith(500)
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Server error', error: mockError })
    })
})
