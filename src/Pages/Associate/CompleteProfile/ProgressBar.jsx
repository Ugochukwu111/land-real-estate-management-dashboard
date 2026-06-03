import { Dot } from 'lucide-react'

export default function ProgressBar({ active1=true, active2=false, active3=false }) {
  return (
    <div className="flex items-center gap-1">
      <Dot style={{ transform: 'scale(4.2)' }} size={25} color = {`${active1 ? '#733939' : '#ccc'}`}/>
      <Dot style={{ transform: 'scale(4.2)' }} size={25} color = {`${active2 ? '#d3a23e' : '#ccc'}`}/>
      <Dot style={{ transform: 'scale(4.2)' }} size={25} color = {`${active3 ? '#388E3C' : '#ccc'}`}/>
    </div>
  )
}
