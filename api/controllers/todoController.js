const mongoose = require('mongoose');
const Task = mongoose.model("Tasks"); // en el schema lo exportamos el objeto como Tasks y aqui lo guardamos en la const TASK para usarla aqui

/// Controlador

/// async version

async function getTasks (req,res, next){ /// aync function relacionada a /tasks
    try {
        let taskslist = await Task.find({}) // el query de mongo se guarda en un obj dentro de tasklist
      
        res.json(taskslist)  /// se manda sea algo o sea null
       
    } catch (error) {
        console.log("Error getting tasks::::::::::::::::::::::::::",error)  
        return next(error)    // para continuear con todo y error  
    }
}

async function createTask (req,res, next){ /// .post del TASKS
    try {
        let newTaskStuff = new Task (req.body); // lo del body lo pasamos a un schema llamado newaTashStuff
        let createdTask  = await newTaskStuff.save(); // guardamos ese schema en la bd y en createdTask queda el obj del schema para enviar
        if (createdTask)
            res.json(createdTask) //lo envia    
    } catch (error) {
        console.log("Error creating the task:::::", error)
        next(error)
    }
}


async function readTask (req,res,next) { /// .get del task/taskid para obtener uno
    try {
        let singleTask = await Task.findById(req.params.taskId) /// query guardado en sigletask
        if(singleTask)
            res.json(singleTask) // Envia lo que saco de la bd
    } catch (error) {
        console.log("Error getting the task:::::", error)
        next(error) 
    }
}


async function updateTask (req,res,next){ /// .put  del task/taskid error because circular reference and JSON dont support that
    try {
        const taskReqId = req.params.taskId
        let updatedTask = Task.findByIdAndUpdate(taskReqId, req.body )
        if (updatedTask)
            res.json(updatedTask)
    } catch (error) {
        console.log("Error puting the task:::::", error)
        next(error)    
    }
}


async function deleteTask (req,res,next){ ///  .delete del task/taskid  
    try {
        const taskReqId = req.params.taskId  /// get the ID

        let deletedTask = await Task.findByIdAndRemove(taskReqId) // delete query

        if(deletedTask)
            res.json({message: "Tarea Eliminada!!"})
        
    } catch (error) {
        console.log("Error deleting the task:::::", error)
        next(error)   
    }
}



module.exports = {
    getTasks,
    createTask,
    readTask,
    updateTask,
    deleteTask
}




/* normal sin el async
/// metodo de obtener todas las tareas (relacionadas a /TASKS in routes)

exports.getTasks = (req, res) => { // metodo getTasks como en la ruta
    console.log("en get tasks")
    Task.find({}, (err,task)=>{  /// uso del schema Task con find y {} sin parametros para que regrese todas
        if(err)
            res.send(err);
        res.json(task)    
    }); /// end Task.find
};// fin getTasks 

// crea una  tarea (relacionada a /tasks)
exports.createTask = (req, res) =>  {
    console.log("en create tasks")
    let newTask = new Task(req.body); // se crea el obj newtask que obtiene la info del body
    newTask.save( (err, task) => { /// sere solo se crea con .save para guardar en la bd
        if (err)
            res.send(err);
        
        res.json(task); /// se envia lo que se creo
    });
};



/// metodo de crear una tarea (relacionalda a taskid)

exports.readTask = (req, res) => {
    Task.findById(req.params.taskId, (err, task)=> { /// findbyid para buscar por id y este lo obtenemos del req en el parametro id
        if (err)
            res.send(err)
        res.json(task) //envio json  de lo que encontre  
    }); // fin findbyid
};// fin readtask

/// actualizar una sola tara (relacion a taskid)

exports.updateTask = (req, res) => {
    Task.findByIdAndUpdate(req.params.taskId, req.body, {new: true}, (err, task) =>{
        if (err)
            res.send(err)
        res.json(task)     
    }); // fin findByIdAndUpdate
}; // fin updatetask

exports.deleteTask = (req,res) => {
    Task.remove({ _id: req.params.taskId }, (err,task) => { // se busca el que se va a eliminar que estara en la etiqueta _id y el id del fron lo sacamos con el req
        if(err)
            res.send(err);
        res.json({message:'Tarea eliminada!'}) /// solo mandamos msj porque no hay mas que enviar   
    }); //fin remove
}; // fin deletetask
*/