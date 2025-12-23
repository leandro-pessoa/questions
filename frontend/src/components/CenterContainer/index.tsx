import styled from 'styled-components'
import { flex } from '@/utils/flex'
import { vars } from '@/styles/vars'

interface CenterContainerProps {
    readonly $height?: 'header' | 'auto' | 'center-fixed'
}

// componente para centralizar uma box na tela
// props: height
export const CenterContainer = styled.div<CenterContainerProps>`
    ${flex('column', 'center', 'center')}

    // props
    // muda a altura de acordo com a prop selecionada
    height: ${(props) => {
        switch(props.$height) {
            // adequa a altura ao centro verticalmente caso haja o header
            case 'header':
                return `calc(100vh - ${vars.sizes.headerHeight})`
            // preenche toda a tela
            case 'center-fixed':
                return '100vh'
            // comportamento padrão da altura do componente
            default:
                return 'auto'
        }
    }};

    flex-grow: 1;

    @media screen and (min-width: ${vars.breakpoints.tablet}){
        margin: 0;
    }
`
