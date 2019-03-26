import { formatDistance } from 'date-fns'

export default function DateDisplay(date) {
    
    let txt = formatDistance(new Date(date), new Date())
  
    return (txt + ' ago')

}