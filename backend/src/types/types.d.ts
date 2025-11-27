import type { Model } from "mongoose"
import type { IQuestion } from "./IQuestion"
import type { IUser } from "./IUser"

declare global {
	namespace Express {
		export interface Request {
			_id: string
			role: 'default' | 'admin'
			completeName: string
			email: string
			result: Model<IUser | IQuestion>
		}

		export interface Response {
			_id: string
			role: 'default' | 'admin'
			completeName: string
			email: string
			result: Model<IUser | IQuestion>
		}
	}
}
