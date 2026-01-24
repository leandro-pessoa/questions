import type { Model } from "mongoose"
import Question from "@/db/models/Question"
import User from "@/db/models/User"

declare global {
	namespace Express {
		export interface Request {
			_id: string
			role: 'default' | 'admin'
			completeName: string
			email: string
			paginationModel: Model<User | Question>
		}

		export interface Response {
			_id: string
			role: 'default' | 'admin'
			completeName: string
			email: string
			paginationModel: Model<User | Question>
		}
	}
}
