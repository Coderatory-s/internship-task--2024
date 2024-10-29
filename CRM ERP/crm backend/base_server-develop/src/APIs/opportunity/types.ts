export interface Opportunity {
    opportunityName: string
    linkedCustomerOrLead: string // Assuming it's a string ObjectId
    expectedCloseDate: Date
    projectValue: number
    stage: 'Bid' | 'Negotiation' | 'Closed'
}
