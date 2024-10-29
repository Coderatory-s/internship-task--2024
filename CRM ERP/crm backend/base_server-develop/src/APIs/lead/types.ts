// src/APIs/lead/types.ts
export interface Lead {
    name: string
    contactInfo: {
        phone: string
        email: string
    }
    leadSource: string
    status: string
}
