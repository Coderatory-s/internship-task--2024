
'use client'

import React, { useRef } from 'react'
import { useDrag } from 'react-dnd';
import {
  Card,
  CardTitle,
} from "@/Components/ui/card"

interface DragProps {
  id: number;
  name: string;
  type: string;
  logo: string;
}

const Drag : React.FC<DragProps>=  ({ id, name, type , logo }) => {
   

    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'ACTION',
        item: { id , name , type , logo },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }));

      drag(ref);

  return (
    <>

<Card ref={ref} className={` p-2 py-3   shadow-md cursor-move  ${isDragging && ( 'opacity-5' ) }`}    >
    <CardTitle className='flex items-center'>
       { logo && (
      <span className='px-2'>
      <img src={logo} height={'40px'} width={'40px'}  />
    </span>
        )}
      {name}
    </CardTitle>
</Card>
    </>
  )
}

export default Drag;
