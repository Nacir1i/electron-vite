import { AiOutlineSearch } from 'react-icons/ai';
import Select, { components } from 'react-select';

const IconSelect = (props) => {
  const Control = ({ children, ...props }) => {
    let { iconComponent } = props.selectProps;
    if (!iconComponent) {
      iconComponent = AiOutlineSearch
    }
    const IconComponent = iconComponent
    const { iconStyle, iconClassName } = props.selectProps;
    return (
      <components.Control {...props}>
        <div className={iconClassName} style={iconStyle}>
          <IconComponent />
        </div>
        {children}
      </components.Control>
    )
  }
  return (
    <Select components={{Control}} {...props}/>
  )
}

export default IconSelect;