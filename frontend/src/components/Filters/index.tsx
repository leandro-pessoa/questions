import { useState } from 'react'
import { StyledSection } from './styles'
import Button from '../Button'
import { FunnelPlus, ChevronUp, ChevronDown } from 'lucide-react'

const Filters = () => {
	const [display, setDisplay] = useState<boolean>(false)

	return (
		<StyledSection $display={display}>
			<Button
				title='Filtros'
				backgroundColor='transparent'
				style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
				onClick={() => setDisplay(!display)}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: '4px'}}>
					<FunnelPlus />
					Filtros
				</div>
				{
					display ?
						<ChevronUp />
					:
						<ChevronDown />
				}
			</Button>
			<div className='filters__content'>
				<div>
					dsadas
				</div>
			</div>
		</StyledSection>
	)
}

export default Filters
