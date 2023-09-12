import { FormInputLabel, GroupDiv, Input } from "./form-input.style.jsx"
export default function FormInput({label, ...otherProps}) {
  return (
    <GroupDiv className="group">
    <Input className="form-input"{...otherProps}/>
    { label &&
    <FormInputLabel shrink = {otherProps?.value?.length}>{label}</FormInputLabel>}
    </GroupDiv>
  )
}
