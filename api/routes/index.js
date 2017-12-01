module.exports = (app) => { // declaracion para exportar el modulo
    const express = require('express') /// se necesita express
    const passport = require('passport')
    require('../config/passport')
    const todoList_controller = require ('../controllers/todoController'); // la var necesitara su controlador 
    const authentication_controller = require ('../controllers/authentication');


    // Middleware to require login/authentication
    const require_authentication = passport.authenticate('jwt', {
        session: false
    })
  
    const require_login = passport.authenticate('local', {
        session: false
    })

    const api_routes = express.Router() // se crea el modelo router que contiene a todos
    const todoList_routes = express.Router() // se crea el modelo router para las rutas de todoList tasks y task/ID
    const auth_routes = express.Router()
    ///Routes
    api_routes.use('/tasks', todoList_routes) /// se crea la ruta api/tasks padre
    todoList_routes.get('/',require_authentication,todoList_controller.getTasks) // tasks
    todoList_routes.post('/',require_authentication,todoList_controller.createTask) // x2
    todoList_routes.get('/:taskId',require_authentication,todoList_controller.readTask) /// tasks/tasId
    todoList_routes.put('/:taskId',require_authentication,todoList_controller.updateTask) // X2
    todoList_routes.delete('/:taskId',require_authentication,todoList_controller.deleteTask) ///X3

    api_routes.use('/auth', auth_routes)
    auth_routes.post('/register', authentication_controller.register)
    auth_routes.post('/login', require_login ,authentication_controller.login)

    app.use ('/api', api_routes)    // Cuando se llega aqui se usa la ruta /API y la funcion apiroutes que es esta
}// end module.exports

