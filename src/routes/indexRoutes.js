import userRoutes from './userRoutes'
import adminRoutes from "./adminRoutes"

const route = (app) => {
    app.use('/api/user', userRoutes)
    app.use('/api/admin', adminRoutes)
}

module.exports = route