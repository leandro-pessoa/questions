import { StyledLabel } from './styles'

interface ICheckboxProps {
	label: React.ReactNode | string | [React.ReactNode | string][]
	checkHandle: () => void
	checked: boolean
}

const Checkbox = ({ label, checkHandle, checked }: ICheckboxProps) => {
	return (
		<StyledLabel>
			{label}
			<input
				type='checkbox'
				className='checkbox__input'
				onChange={checkHandle}
				checked={checked}
			/>
			<span className='checkbox__checkmark'></span>
		</StyledLabel>
	)
}

export default Checkbox
