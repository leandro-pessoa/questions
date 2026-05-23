import { StyledLabel } from './styles'

import type { ReactChildren } from '@/types/ReactChildren'
import type { ChangeEvent } from 'react'

interface ICheckboxProps {
	label: ReactChildren
	checkHandle: (e?: ChangeEvent<HTMLInputElement>) => void
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
