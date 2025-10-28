import mongoose, { type AnyObject, type UpdateQuery } from "mongoose"

export default class CRUDServices<T> {
	constructor(public model: mongoose.Model<T>) {}

	// obtém todos os valores do documento
	async getAll(): Promise<T[]> {
		return this.model.find({})
	}

	// obtém um valor do documento
	async getById(id: string): Promise<T | null> {
		return this.model.findById(id) || []
	}

	// adiciona um valor no documento
	async addOne<U>(value: U) {
		return this.model.create(value)
	}

	// atualiza um valor no documento
	async updateOne(id: string, newValue: UpdateQuery<AnyObject>) {
		return this.model.findByIdAndUpdate(id, newValue, { runValidators: true })
	}

	// remove um valor do documento
	async deleteOne(id: string) {
		return this.model.findByIdAndDelete(id)
	}
}
