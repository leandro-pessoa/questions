import mongoose, { type AnyObject, type UpdateQuery } from "mongoose"

export default class CRUDServices<T> {
	constructor(public model: mongoose.Model<T>) {}

	async getAll() {
		return this.model.find({})
	}

	async getById(id: string) {
		return this.model.findById(id)
	}

	async addOne<U>(value: U) {
		return this.model.create(value)
	}

	async updateOne(id: string, newValue: UpdateQuery<AnyObject>) {
		return this.model.findByIdAndUpdate(id, newValue)
	}

	async deleteOne(id: string) {
		return this.model.findByIdAndDelete(id)
	}
}
