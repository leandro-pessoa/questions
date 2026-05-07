import { useAppSelector } from '@/app/hooks'

import Modal from '../index'
import {
	selectModalChildren,
	selectModalCloseElement,
	selectModalExecButton,
	selectModalTitle,
} from '@/app/reducers/modal'

const GlobalModal = () => {
	const modalChildren = useAppSelector(selectModalChildren)
	const modalCloseElement = useAppSelector(selectModalCloseElement)
	const modalExecButton = useAppSelector(selectModalExecButton)
	const modalTitle = useAppSelector(selectModalTitle)

	return (
		<Modal
			closeElement={modalCloseElement}
			execButton={modalExecButton}
			title={modalTitle}
		>
			{modalChildren}
		</Modal>
	)
}

export default GlobalModal
