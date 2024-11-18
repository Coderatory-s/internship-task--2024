'use client'

import React , {useState , useRef} from 'react'
import { useDrop } from 'react-dnd';
import Drag from '../Drag/Drag';
import {
  Card,
} from "@/Components/ui/card"
import Sheets from '../Sheets/Sheets';
import {Button} from '@/Components/ui/button'
import { useUserStore } from '../store/Zustand_Store';
import { Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation';
const api = require('../../Components/api/api');

const Drop : React.FC = () => {

    const ref = useRef<HTMLDivElement>(null);
    const post_data = useUserStore((state) => state.post_data);
    const runLoading = useUserStore((state) => state.runLoading)
    const resetForm_data = useUserStore((state) => state.resetForm_data);
    const run_loading = useUserStore((state) => state.run_loading);
  
    const [droppedItems, setDroppedItems] = useState<any>([]);
    const [selectedItem, setSelectedItem] = useState<any>(null); // To manage selected item for details form
  
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const router = useRouter();

    const [ {isOver} ,  drop] = useDrop(() => ({
      accept: 'ACTION',
      drop: (item : any) => {
        addBlockToCanvas(item);
          setSelectedItem({ ...item, id: droppedItems.length + 1 });
          setIsDetailsOpen(true);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    const addBlockToCanvas = (item : any) => {
      const newItem = { ...item, id: droppedItems.length + 1};
        setDroppedItems((prevItems : any) => [...prevItems, newItem]);
      };

    drop(ref)

  return (
    <>
        
    <div>
    <div  className='h-16  flex justify-between items-center'>
    <Button variant="outline" onClick={() => router.push('/workflow')} >My Work Flows</Button>
    <p className='text-center font-bold text-xl  font-mono' >Drop Your Selected Items</p>
    <Button variant="outline" onClick={() => {
       localStorage.removeItem('token');
       router.push('/login');
    }} >Log out</Button>
    </div>
   
    <Card ref={ref} className="main flex flex-col  px-4  md:w-[1000px] h-[400px] overflow-y-scroll  ">
      {droppedItems.map((block : any) => {
          return  (
             <div className='mt-2'>
            <Drag key={block.id} id={block.id} name={block.name} type={block.type} logo={block.logo} />
            </div>
          )
})}
    </Card>

     <div className=' my-3 '>
       <div className='flex justify-between '> 
        {run_loading  ?  <><Button disabled>
      <Loader2 className="animate-spin" />
      Please wait
    </Button></>  : <>  <Button className='bg-green-600 hover:bg-green-500'   disabled = {droppedItems.length > 0 ? false : true }
     onClick={() => {
          runLoading(true);
          setDroppedItems([]);    
          post_data();
       }}   
       > Run Work Flow</Button></>}  
      

<Button className='bg-red-600 hover:bg-red-500' onClick={ () => {
  setDroppedItems([]);
  resetForm_data();
}} > Reset </Button>
       </div>
       
     </div>
     </div>
     <Sheets 
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      isDetailsOpen={isDetailsOpen} 
      setIsDetailsOpen={setIsDetailsOpen}
      setDroppedItems={setDroppedItems} 
      droppedItems={droppedItems}
       />
     </>
  )
}

export default Drop