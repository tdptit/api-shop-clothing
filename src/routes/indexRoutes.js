import user from './userRoutes'



const route = (app) => {
    app.use('/api/user', user)
}

module.exports = route