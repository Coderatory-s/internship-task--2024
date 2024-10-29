import LeadList from '@/components/LeadList';
import LeadForm from '@/components/LeadForm';

export default function LeadsPage() {
  
  return (
    <div className="w-full mx-auto p-10">
      <h1 className='text-center  my-5 font-bold text-3xl'>Leads Management</h1>
      <LeadForm  />
      <LeadList />
    </div>
  );
}
