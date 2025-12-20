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
			iconButton
			style={{ position: 'absolute', right: '4px', top: '-6%'}}
			title={
				actived ? 'Esconder senha' : 'Mostrar senha'
			}
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
