import Product from '../models/products'

class productService {
    async createAProduct(data) {
        try {
            let result = await Product.create(data)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async getAProductService(id) {
        try {
            let result = await Product.findOne({ _id: id })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async getAllProductService(queryString) {
        try {
            const { page, limit } = queryString
            let offset = (page - 1) * limit
            let result = await Product.find().skip(offset).limit(limit)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async updateAProductService(id, data) {
        try {
            let result = await Product.updateOne({ _id: id }, data)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async deleteAProductService(id) {
        try {
            let result = await Product.delete({ _id: id })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = new productService()