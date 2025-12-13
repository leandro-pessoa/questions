import { Eye, EyeOff } from 'lucide-react'
import Button from '..'

interface IInspectPassword {
	actived: boolean
	toggleActived: () => void
}

const InspectPassword = ({ actived, toggleActived }: IInspectPassword) => {
	return (
		<Button
			onClick={toggleActived}
			backgroundColor='transparent'
			style={{ position: 'absolute', right: '0', top: '-10%'}}
		>
			{
				actived ?
					<Eye />
				:
					<EyeOff />
			}
		</Button>
	)
}

export default InspectPassword
