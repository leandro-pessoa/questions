import { useEffect, useRef, useState } from 'react'
import {
	clearModal,
	selectModalType,
} from '@/app/reducers/modal'
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
	closeElement?: ReactChildren
	execButton?: ReactChildren
}

const Modal = ({ title, children, closeElement, execButton }: ModalProps) => {
	const dispatch = useAppDispatch()

	const modalType = useAppSelector(selectModalType)
	const [modalOverflow, setModalOverflow] = useState<boolean>(false)

	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// fecha o modal ao clicar fora do container central
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement
			if (ref.current && !ref.current.contains(target)) {
				dispatch(clearModal())
			}
		}
		document.addEventListener('click', handleClickOutside, true)

		// move a scrollbar para o início
		ref.current?.scrollIntoView({ behavior: 'smooth' })

		// ativa o overflow de acordo com a altura do container centralizado e da altura da tela
		const activeModalOverflow = () => {
			// altura da tela
			const screenHeight = window.innerHeight

			// caso a altura do container seja maior do que a da tela, ativa o overflow
			if (Number(ref.current?.clientHeight) > screenHeight) {
				setModalOverflow(true)
				return
			}

			// caso não, desativa
			setModalOverflow(false)
		}

		// executa a função ao mudar o tamanho da tela e ao abrir o modal
		window.addEventListener('resize', () => activeModalOverflow(), true)
		activeModalOverflow()
	}, [dispatch, modalType])

	return (
		<StyledDiv>
			<CenterContainer
				// permitem que o modal ultrapasse o limite da tela, permitindo o scroll
				$height={modalOverflow ? 'auto' : 'center-fixed'}
				style={{ margin: modalOverflow ? '16px 0' : '0' }}
			>
				<Container
					$backgroundColor='colorful'
					$relativeWidth='50%'
					style={{ gap: '8px' }}
					ref={ref}
					$shadow
				>
					<Title>{title}</Title>
					<Hr />
					{children}
					{
						(execButton || closeElement) &&
							<div className='buttons_wrapper'>
								{execButton}
								{closeElement && (
									<Button
										onClick={() => dispatch(clearModal())}
									>
										{closeElement}
									</Button>
								)}
							</div>
					}
				</Container>
			</CenterContainer>
		</StyledDiv>
	)
}

export default Modal
