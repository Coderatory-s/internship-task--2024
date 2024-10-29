"use client"
import { useEffect, useState } from 'react';
import { getPipelineOpportunities, updateOpportunityStage } from '@/services/opportunityService';

// Define the structure of an opportunity object
interface Opportunity {
    _id: string;
    opportunityName: string;
    assignedSalesRep: string;
    stage: string;
    revenueForecast: number;
    probabilityOfClosing: number;
}

export default function PipelineOpportunities() {
    // Correctly type the opportunities state as an array of Opportunity objects
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [selectedStage, setSelectedStage] = useState('');

    useEffect(() => {
        const fetchOpportunities = async () => {
            const data = await getPipelineOpportunities();
            setOpportunities(data);
        };
        fetchOpportunities();
    }, []);

    const handleStageChange = async (id: string, stage: string) => {
        await updateOpportunityStage(id, stage);
        const updatedOpportunities = opportunities.map((opp) =>
            opp._id === id ? { ...opp, stage } : opp
        );
        setOpportunities(updatedOpportunities);
    };

    return (
        <div>
            <h2>Sales Pipeline Opportunities</h2>
            <ul>
                {opportunities.map((opp) => (
                    <li key={opp._id} className="border-b py-4">
                        <h3>{opp.opportunityName}</h3>
                        <p>Assigned Sales Rep: {opp.assignedSalesRep}</p>
                        <p>Stage: {opp.stage}</p>
                        <p>Revenue Forecast: ${opp.revenueForecast}</p>
                        <p>Probability of Closing: {opp.probabilityOfClosing}%</p>
                        <select
                            value={opp.stage}
                            onChange={(e) => handleStageChange(opp._id, e.target.value)}
                        >
                            <option value="Bid">Bid</option>
                            <option value="Negotiation">Negotiation</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </li>
                ))}
            </ul>
        </div>
    );
}
