import { StyledLabel } from './styles'

interface ICheckboxProps {
	label: React.ReactNode | string | [React.ReactNode | string][]
	topics: string[]
	setSelectedTopics: (topic: string[]) => void
	value: string
}

const Checkbox = ({ label, setSelectedTopics, topics, value }: ICheckboxProps) => {
	// irá atuar quando a checkbox for alterada
	const checkHandle = () => {
		// caso o valor já esteja na lista, irá remover por meio de um filter
		if(topics.includes(value)) {
			setSelectedTopics(topics.filter((topic) => topic !== value))
			return
		}

		// caso não, adicionará o valor na lista
		setSelectedTopics([...topics, value])
	}

	return (
		<StyledLabel>
			{label}
			<input type='checkbox' className='checkbox__input' onChange={checkHandle}/>
			<span className='checkbox__checkmark'></span>
		</StyledLabel>
	)
}

export default Checkbox
