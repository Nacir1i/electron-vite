import { APPOINTMENT_SHARED } from "../utils/common"
import { AiOutlineClockCircle, AiOutlineCheckCircle , AiOutlineQuestion } from "react-icons/ai";

const AppointmentStatus = ({ status }) => {
  const _status = parseInt(status);
  const _statusSymbol = isNaN(_status) ? APPOINTMENT_SHARED.unknown : (APPOINTMENT_SHARED.status.find((a) => a.value === _status) ?? APPOINTMENT_SHARED.unknown);
  const Icon = _statusSymbol.Icon;
  const iconClassName = _statusSymbol.iconClassName;
  const className = ["inline px-2 text-sm", _statusSymbol.className].join(" ");
  return (
    <td>
      <Icon className={iconClassName} />
      <p className={className}>{_statusSymbol.label}</p>
    </td>
  )
}

export default AppointmentStatus;