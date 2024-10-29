import Opportunity, { IOpportunity } from '../models/opportunityModel'

const createOpportunity = async (opportunityData: IOpportunity): Promise<IOpportunity> => {
    const opportunity = new Opportunity(opportunityData)
    return await opportunity.save()
}
const getOpportunities = async (): Promise<IOpportunity[]> => {
    return await Opportunity.find() // Fetches all opportunities
}

export default {
    createOpportunity,
    getOpportunities
}
