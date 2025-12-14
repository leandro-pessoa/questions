// url permitida para fazer requisições à API
const whiteList = ['http://localhost:5173']

// tipagens para o atributo origin
type StaticOrigin = boolean | string | RegExp | Array<boolean | string | RegExp>;
type CustomOrigin = (
    requestOrigin: string | undefined,
    callback: (err: Error | null, origin?: StaticOrigin) => void,
) => void;

// verificação se a url é permitida
export const corsOptions: { origin: CustomOrigin } = {
	origin: (origin, callback) => {
		if (whiteList.indexOf(origin as string) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
}
