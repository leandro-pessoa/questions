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
	margin-bottom: ${({ $error = false }) => $error ? '6px' : '0'};
    font-size: .8rem;
    display: block;
    max-width: 400px;

    @media screen and (min-width: ${vars.breakpoints.smartphone}) {
        font-size: .9rem;
    }
`
