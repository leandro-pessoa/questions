import { vars } from '@/styles/vars'
import styled from 'styled-components'

interface ISmallProps {
    readonly $error?: boolean
}

// componente geral de small
// props: error
export const Small = styled.small<ISmallProps>`
    // props
    // caso seja true, ficará vermelho
    color: ${
		({ $error = false, ...props }) => $error ? vars.colors.red : props.theme.colors.primaryFontColor };
    font-size: .9rem;
    display: block;
    max-width: 400px;

    @media screen and (min-width: ${vars.breakpoints.smartphone}) {
        font-size: 1rem;
    }
`
