import { flex } from '@/utils/flex'
import styled from 'styled-components'
import { useAppDispatch } from '@/app/hooks'
import { vars } from '@/styles/vars'
import { clearModal } from '@/app/reducers/modal'

import Button from '../Button'

interface IModalButtonsDivProps {
	mode?: 'put' | 'post'
}

export const StyledDiv = styled.div`
	${flex('row', 'auto', 'center', '16px')}
	grid-column: 1 / 3;
	margin-top: 12px;
`

const ModalButtonsDiv = ({ mode = 'post' }: IModalButtonsDivProps) => {
	const dispatch = useAppDispatch()

	return (
		<StyledDiv>
			<Button
				type='submit'
				backgroundColor={vars.colors.yellow}
				style={{ color: vars.colors.black }}
			>
				{mode === 'put' ? 'Atualizar' : 'Adicionar'}
			</Button>
			<Button onClick={() => dispatch(clearModal())}>Cancelar</Button>
		</StyledDiv>
	)
}

export default ModalButtonsDiv
