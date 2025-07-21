import { FilterStatus } from "@/types/FilterStatus";
import {CircleCheck, CircleDashed} from 'lucide-react-native';


export function StatusIcon ({status}: { status: FilterStatus }) {
  return status === FilterStatus.DONE ? (
    <CircleCheck size={16} color="#2C46B1" /> 
  ) : (
    <CircleDashed size={16} color="#000000" />
  )
}