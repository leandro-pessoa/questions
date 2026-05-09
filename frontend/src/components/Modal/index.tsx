import { useEffect, useRef } from 'react'
import { selectModalDisplay, setModalDisplay } from '@/app/reducers/modal'
import { useAppDispatch, useAppSelector } from '@/app/hooks'

import { CenterContainer } from '../CenterContainer'
import { Container } from '../Container'
import { Hr } from '../Hr'
import { Title } from '../Title'
import { StyledDiv } from './styles'
import Button from '../Button'

import type { ReactChildren } from '@/types/ReactChildren'

interface ModalProps {
	title: string
	children: ReactChildren
	closeElement: ReactChildren
	execButton: ReactChildren
}

const Modal = ({ title, children, closeElement, execButton }: ModalProps) => {
	const dispatch = useAppDispatch()

	const modalDisplay = useAppSelector(selectModalDisplay)

	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// fecha o modal ao clicar fora do container central
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement
			if (ref.current && !ref.current.contains(target)) {
				dispatch(setModalDisplay(false))
			}
		}
		document.addEventListener('click', handleClickOutside, true)
	}, [dispatch])

	const activeDisplay = modalDisplay ? 'block' : 'none'

	return (
		<StyledDiv style={{ display: activeDisplay }}>
			<CenterContainer $height='center-fixed'>
				<Container
					$backgroundColor='colorful'
					$relativeWidth='50%'
					style={{ gap: '8px', display: activeDisplay }}
					ref={ref}
				>
					<Title>{title}</Title>
					<Hr />
					{children}
					<div className='buttons_wrapper'>
						{execButton}
						{closeElement && (
							<Button
								onClick={() => dispatch(setModalDisplay(false))}
							>
								{closeElement}
							</Button>
						)}
					</div>
				</Container>
			</CenterContainer>
		</StyledDiv>
	)
}

export default Modal
