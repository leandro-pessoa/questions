import { flex } from '@/utils/flex'
import { vars } from '@/styles/vars'
import styled from 'styled-components'
import { useAppSelector } from "@/app/hooks"
import { selectIsLoading } from '@/app/reducers/loading'

interface ILoadingProps {
    readonly $overlay?: boolean
	readonly $size?: string
	readonly $borderSize?: string
}

// componente geral de loading
// props: overlay
export const Loading = styled.div<ILoadingProps>`
    ${flex('row', 'center', 'center')}

    // props
    // caso seja overlay (true), irá ocupar toda a tela, ficando na frente de outros componentes
    // caso não seja, ficará em um local específico onde estará localizado
    ${(props) =>
        props.$overlay &&
        `position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0; `}
    z-index: 14;
    backdrop-filter: blur(4px);

    div {
        border: ${
			(props) =>
				props.$borderSize || '4px'} solid ${(props) => props.theme.colors.secondaryBackgroundColor};
        border-radius: 50%;
        border-top: ${(props) => props.$borderSize || '4px'} solid ${vars.colors.blue};
        width: ${(props) => props.$size || '40px'};
        height: ${(props) => props.$size || '40px'};
        animation: spinner 1s linear infinite;
    }

    @keyframes spinner {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @media screen and (min-width: ${vars.breakpoints.notebook}) {
        div {
            width: ${(props) => props.$size || '60px'};
            height: ${(props) => props.$size || '60px'};
            border-width: ${(props) => props.$borderSize || '8px'};
        }
    }
`

// componente geral de loading
// ocupa toda a tela enquanto é exibido
const GlobalLoading = () => {
    // dependerá do state global isLoading para ser exibido
    const isLoading = useAppSelector(selectIsLoading)

    return (
        isLoading &&
        <Loading $overlay={true}><div></div></Loading>
    )
}

export default GlobalLoading
