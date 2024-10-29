import axios from 'axios';

const API_URL = 'http://localhost:3000/v1/leads';

export const getLeads = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const createLead = async (lead: any) => {
  const { data } = await axios.post(API_URL, lead);
  return data;
};

export const updateLead = async (id: string, lead: any) => {
  const { data } = await axios.patch(`${API_URL}/${id}`, lead);
  return data;
};
export const qualifyLead = async (id:string, lead:any)=>{
  const { data } = await axios.patch(`${API_URL}/${id}`, lead);
  return data;
}
export const convertLeadToOpportunity = (id:string) => axios.post(`${API_URL}/${id}/convert`);


export const deleteLead = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
