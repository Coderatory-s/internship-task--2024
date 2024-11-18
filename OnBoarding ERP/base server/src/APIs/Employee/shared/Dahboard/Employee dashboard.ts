import Models1 from '../model/Employee.model'
import Models2 from '../model/companyTour'
import { Request, Response } from 'express'

export const getEmployees = async (req: Request, res: Response): Promise<Response> => {
    const email: string = req.body.email

    try {
        const GreetMessage = "Welcome to the team! Together, we’ll tackle challenges and celebrate successes. We're glad you're here!"

        const employees = await Models1.find()
        console.log(email)
        console.log('Employees data:', employees)

        if (employees) {
            return res.status(200).json({
                welcomeMessage: "Welcome To Our Employee Dashboard! Here are some employee data's. You can search the employees' data by ID.",
                GreetMessage,
                employees
            })
        } else {
            return res.status(404).json({ message: 'No employees found' }) // Appropriate message when no employees found
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error }) // Error response
    }
}

export const getEmployeeById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params
        const employee = await Models1.findById(id)

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' }) // Return response if not found
        }

        const welcomeMessage = `Welcome To Our Employee Dashboard: ${employee.firstName} ${employee.lastName}! You are a part of the ${employee.department} team.`
        const greetingmessage = `Congratulations on joining our team! We look forward to embarking on this exciting journey together and achieving new milestones.: ${employee.firstName} ${employee.lastName}`

        return res.status(200).json({ welcomeMessage, greetingmessage, employee }) // Return the employee data and greeting message as JSON
    } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: 'Server error', error }) // Return error response
    }
}

export const addTourStep = async (req: Request, res: Response): Promise<void> => {
    const { title, description, link, order } = req.body
    try {
        const existingtitle = await Models2.findOne({ title })
        if (existingtitle) {
            res.status(400).json({ message: 'This title is already exist' })
            return
        }
        const newStep = new Models2({
            title,
            description,
            link,
            order
        })
        await newStep.save()
        console.log('New tour step added:', newStep)
        res.status(201).json({ message: `Company Description Registered Successfully: ${title} ${description}` })
    } catch (error) {
        res.status(500).json({ message: 'registration failed', error })
        // console.error(error);
    }
}
export const TourCompany = async (req: Request, res: Response): Promise<void> => {
    const title: string = req.body.title
    try {
        // const Tour="Welcome to the Our Company!.Lets Tour Our company";
        const companyTour = await Models2.find()
        console.log(title)
        console.log("Let's Tour The Comapany:", companyTour)
        res.status(200).json({
            message:
                'Welcome to our company! Today, you’ll embark on an exciting journey to discover the heart and soul of our organization. We’re thrilled to have you here, and we can’t wait to show you what makes us a special place to work.',
            companyTour
        })
    } catch (error) {
        res.status(500).json({ message: 'Some Errors', error })
        // console.error(error);
    }
}
