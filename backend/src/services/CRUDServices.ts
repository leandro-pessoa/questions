export default class CRUDServices {
	constructor(public model: unknown) {}

	async getAll<T>(): Promise<T[]> {
		return this.model.find({})
	}

	async getById<T>(id: string): Promise<T[]> {
		return this.model.findById(id)
	}

	async addOne<T>(value: T): Promise<T[]> {
		return this.model.create(value)
	}

	async updateOne<T>(id: string, newValue: T): Promise<T[]> {
		return this.model.findByIdAndUpdate(id, newValue)
	}

	async deleteOne<T>(id: string): Promise<T[]> {
		return this.model.findByIdAndDelete(id)
	}
}
