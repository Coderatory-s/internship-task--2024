import mongoose from 'mongoose';
import {ITourStep} from '../types/comapanyTour.interface';



const tourStepSchema=new mongoose.Schema<ITourStep>({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    link: { 
        type: String, 
        required: false 
    },
    order: { 
        type: Number, 
        required: true 
    },
}, {
    timestamps: true, // Automatically create createdAt and updatedAt fields
});

// Create the Tour Step model
const TourStep = mongoose.model<ITourStep>('TourStep', tourStepSchema);

export default TourStep;
