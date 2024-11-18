export interface ITourStep {
    title: string;             // Title of the tour step
    description: string;       // Description of the tour step
    link?: string;             // Optional link for additional resources
    order: number;             // Order of the step in the tour
    createdAt: Date;           // Timestamp for when the tour step was created
    updatedAt: Date;           // Timestamp for when the tour step was last updated
}