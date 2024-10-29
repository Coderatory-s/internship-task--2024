// import mongoose, { Document, Schema } from 'mongoose'

// export interface IOpportunity extends Document {
//     leadId: string
//     projectName: string
//     expectedCloseDate: Date
//     projectValue: number
//     stage: string
//     createdAt?: Date
//     updatedAt?: Date
// }

// const OpportunitySchema = new Schema<IOpportunity>(
//     {
//         leadId: { type: String, required: true },
//         projectName: { type: String, required: true },
//         expectedCloseDate: { type: Date, required: true },
//         projectValue: { type: Number, required: true },
//         stage: { type: String, required: true, enum: ['Bid', 'Negotiation', 'Closed', 'Lost'] }
//     },
//     { timestamps: true }
// )

// export default mongoose.model<IOpportunity>('Opportunity', OpportunitySchema)

// models/opportunityModel.ts
import mongoose, { Document, Schema } from 'mongoose'

export interface IOpportunity extends Document {
    opportunityName: string
    linkedCustomerOrLead: mongoose.Types.ObjectId // Reference to Lead or Customer
    expectedCloseDate: Date
    projectValue: number
    stage: 'Bid' | 'Negotiation' | 'Closed'
    assignedSalesRep: string
    revenueForecast: number
    probabilityOfClosing: number
}

const OpportunitySchema = new Schema<IOpportunity>(
    {
        opportunityName: { type: String, required: true },
        linkedCustomerOrLead: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },
        expectedCloseDate: { type: Date, required: true },
        projectValue: { type: Number, required: true },
        stage: { type: String, required: true, enum: ['Bid', 'Negotiation', 'Closed'] },
        assignedSalesRep: { type: String, required: true },
        revenueForecast: { type: Number, required: true },
        probabilityOfClosing: { type: Number, required: true }
    },
    { timestamps: true }
)

export default mongoose.model<IOpportunity>('Opportunity', OpportunitySchema)
