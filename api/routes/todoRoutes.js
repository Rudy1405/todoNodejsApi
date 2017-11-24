module.exports = (app) => {

    let todoList = require ('../controllers/todoController'); // la var necesitara su controlador 
    console.log("En routes")
    ///Routes
    app.route('/tasks') /// definimos la ruta de tareas 
        .get (todoList.getTasks)  /// el get para buscar y obtener las task (tareas)
        .post(todoList.createTask); // el post para crear la tarea y ponerla pues.

    app.route('/task/:taskId') // definimos la ruta para manipular una tarea dependiendo del ID
        .get(todoList.readTask) // obtenemos y leemos la tarea 
        .put(todoList.updateTask) // obtenemos que tarea es  y la actualizamos
        .delete(todoList.deleteTask) // borramos la tarea seleccionada    

}// end module.exports