import axios from 'axios'

export const http = axios.create({
	// url da api
	baseURL: 'http://localhost:3000'
})
