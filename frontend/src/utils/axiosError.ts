import axios from 'axios'
import { toast } from 'react-toastify'

// tratamento de erros que é utilizado nos catchs das operações assíncronas
export const axiosError = (err: unknown) => {
    // caso seja error do axios
    if (axios.isAxiosError(err)) {
        // erro de conexão com o server
        if (err.code === 'ERR_NETWORK') {
            toast.error('Falha de conexão')
        } else {
            // erros relacionados à validação dos models do banco de dados
            if (err.response?.data.message.lenght >= 1) {
				err.response?.data.message.forEach((msg: string) => {
					toast.error(msg)
				})
            } else { // outros erros do axios
                toast.error(err.response?.data.message)
            }
        }
    } else { // caso não seja erro do axios
        toast.error('Erro desconhecido')
    }
}
