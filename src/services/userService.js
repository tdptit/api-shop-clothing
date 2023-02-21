import User from '../models/users'

class userService {
    async userRegisterService(userData) {
        try {
            let result = await User.create(userData)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async findUser(email) {
        try {
            let result = await User.findOne({ email: email })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async getUser(queryString) {
        const { page, limit } = queryString
        let offset = (page - 1) * limit
        let result = await User.find({ userType: "user" }).skip(offset).limit(limit)
        return result
    }
    async updateInforService(data) {
        try {
            let result = await User.findById(data.userId)
            result.address = data.address
            result.phone = data.phone
            await result.save()
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = new userService()