const mongoose = require('mongoose');
const Task = mongoose.model("Tasks"); // en el schema lo exportamos el objeto como Tasks y aqui lo guardamos en la const TASK para usarla aqui

/// Controlador

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
    Task.findById(req.params.id, (err, task)=> { /// findbyid para buscar por id y este lo obtenemos del req en el parametro id
        if (err)
            res.send(err)
        res.json(task) //envio json  de lo que encontre  
    }); // fin findbyid
};// fin readtask

/// actualizar una sola tara (relacion a taskid)

exports.updateTask = (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, task) =>{
        if (err)
            res.send(err)
        res.json(task)     
    }); // fin findByIdAndUpdate
}; // fin updatetask

exports.deleteTask = (req,res) => {
    Task.remove({ _id: req.params.id }, (err,task) => { // se busca el que se va a eliminar que estara en la etiqueta _id y el id del fron lo sacamos con el req
        if(err)
            res.send(err);
        res.json({message:'Tarea eliminada!'}) /// solo mandamos msj porque no hay mas que enviar   
    }); //fin remove
}; // fin deletetask
