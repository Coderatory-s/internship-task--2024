// import Opportunity from '../models/opportunityModel'
// import { IOpportunity } from '../models/opportunityModel'

// const createOpportunity = async (opportunityData: IOpportunity) => {
//     const opportunity = new Opportunity(opportunityData)
//     return await opportunity.save()
// }

// export default {
//     createOpportunity
// }
import opportunityRepository from '../repositories/opportunityRepository'
import Opportunity, { IOpportunity } from '../models/opportunityModel'

const createOpportunity = async (opportunityData: IOpportunity) => {
    return await opportunityRepository.createOpportunity(opportunityData)
}

const getPipelineOpportunities = async (): Promise<IOpportunity[]> => {
    return await Opportunity.find().exec()
}
export const getAllOpportunities = async () => {
    return await Opportunity.find() // Assuming you’re using Mongoose
}

const updateOpportunityStage = async (id: string, stage: string): Promise<IOpportunity | null> => {
    return await Opportunity.findByIdAndUpdate(id, { stage }, { new: true })
}
export default {
    createOpportunity,
    getPipelineOpportunities,
    updateOpportunityStage,
    getAllOpportunities
}
