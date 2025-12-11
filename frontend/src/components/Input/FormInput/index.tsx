import { useFormContext } from 'react-hook-form'
import Input from '..'
import { Small } from '@/components/Small'
import type { HTMLInputTypeAttribute } from 'react'

interface InputProps {
    id: string
    name: string
    type?: HTMLInputTypeAttribute
    placeholder?: string
    value?: string | number
    required?: boolean
    maxLength?: number
    minLength?: number
    email?: boolean
    equalPasswordValidation?: boolean
    patternsOption?: boolean
    step?: number
    max?: number
    hidden?: boolean
}

// componente geral de input
// contém diversas validações de formulários
const FormInput = ({
    type = 'text',
    placeholder,
    id,
    value,
    required = false,
    name,
    minLength = 0,
    maxLength = 30,
    email = false,
    equalPasswordValidation = false,
    patternsOption = true,
    step = 0,
    max = 0,
    hidden = false,
}: InputProps) => {

    // métodos e atributos do react-hook-form
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext()

    // data mínima e máxima
    const minDate = '1900-01-01'
    const maxDate = new Date().toISOString().split('T')[0]

    // verifica padrões de regex de acordo com a prop passada
    const patterns = (email: InputProps['email']) => {
        // caso não seja necessário, a função será finalizada aqui
        if (!patternsOption) return

        // valida o e-mail
        if (email)
            return {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'E-mail inválido',
            }

        // valida a senha
        // (caracteres maiúsculos e minúsculos, números e símbolos @$!%*?&#)
        else if (type === 'password')
            return {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{1,}$/,
                message: 'Senha inválida',
            }

        // valida se há espaços vazios antes e após o valor preenchido
        else
            return {
                value: /^[^\s]+(?:$|.*[^\s]+$)/,
                message: 'Espaços vazios inválidos',
            }
    }

    // verifica se o campo possui o mesmo valor do campo password
    const validateEqualPassword = (value: string) => {
        // observa o campo password
        const password = watch('password')

        // verifica se a validação está ativa e se o valor é igual ao do passoword
        if (equalPasswordValidation && password !== value) {
            return 'As senhas precisam ser iguais'
        }
    }

    return (
        <>
            <Input
                type={type}
                placeholder={placeholder}
                id={id}
                maxLength={maxLength}
                autoComplete='on'
                $error={!(errors[id]?.message === undefined)}
                step={step}
                hidden={hidden}
                {...register(id, {
                    // validações do react-hook-form
                    required: {
                        value: required,
                        message: `O campo ${name} é obrigatório`,
                    },
                    pattern: patterns(email),

                    // verifica se o tipo do input é date
                    // caso seja, fará a validação, de acorodo com a data mínima
                    // caso não seja, não fará nada
                    min:
                        type === 'date'
                            ? {
                                  value: minDate,
                                  message: 'Essa data é anterior à mínima',
                              }
                            : undefined,

                    // verifica se o tipo do input é date ou number
                    // caso seja date, fará a validação, de acorodo com a data máxima
                    // caso seja number, irá verificar o valor máximo definido na prop
                    // caso não, não fará nada
                    max:
                        type === 'date'
                            ? {
                                  value: maxDate,
                                  message: 'Data posterior ao dia atual',
                              }
                            : type === 'number'
                            ? {
                                  value: max,
                                  message: `Valor máximo: ${max}`,
                              }
                            : undefined,

                    // verifica a quantidade mínima de caracteres
                    minLength: {
                        value: minLength,
                        message: `Mínimo de ${minLength} caracteres`,
                    },
                    validate: validateEqualPassword,
                    value,
                })}
            />
            {/* container onde as mensagens de erro serão exibidas, de acordo com a prioridade (de cima para baixo) */}
            <div>
                {errors[id] &&
                    (errors[id]?.type === 'required' ||
                        errors[id]?.type === 'min' ||
                        errors[id]?.type === 'max' ||
                        errors[id]?.type === 'minLength' ||
                        errors[id]?.type === 'maxLength' ||
                        errors[id]?.type === 'pattern' ||
                        errors['confirmPassword']) && (

                        // caso exista algum erro, a mensagem será exibida no container
                        <Small $error={true}>
                            {errors[id]?.message?.toString()}
                        </Small>
                    )}
            </div>
        </>
    )
}

export default FormInput
