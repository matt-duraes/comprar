import { TouchableOpacity, TouchableHighlightProps, Text } from "react-native";
import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { StatusIcon } from "../StatusIcon";

type Props = TouchableHighlightProps & {
  status: FilterStatus
  isActive: boolean
}

export function Filter({status, isActive, ...rest}: Props) {
  return (
    <TouchableOpacity 
      style={[styles.container, {opacity: isActive ? 1 : 0.5}]}
      activeOpacity={0.8}
      {...rest}
    >
      <StatusIcon status={status} />
      <Text style={[styles.title, {fontWeight: isActive ? 'bold' : '400'}]}>
        {status === FilterStatus.DONE ? 'Comprados': 'Pendentes'}
      </Text>
    </TouchableOpacity>
  )
}