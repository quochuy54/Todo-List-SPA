const Task = require('../Model/task');
// const {Task1: a} = require('../Model/task');
// console.log(a)
// console.log(require('../Model/task'))

class TaskController {
    // get all 
    async getAll(req, res, next) {
        try{
            let param = [];
            let sort = {};
            let objWhere = {};
    
            param.keyword = req.query.keyword;
            param.sortField = req.query.orderField;
            param.sortType = req.query.orderType;
    
            if(param.sortField) sort[param.sortField] = param.sortType;
            if(param.keyword && param.keyword !== '') objWhere.name = new RegExp(param.keyword, 'i'); //Ignore UpperCase
            const taskList = await Task.find(objWhere).sort(sort);
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(200).json(taskList);
        }catch(err){
            res.status(500).json(err);
        }
    }

    // get an task
    async getById(req, res, next){
        try{
            const task = await Task.findOne({'_id': req.params.id});
            if(task){
                res.status(200).json(task);
            }
            else{
                res.status(404).json('Not found task');    
            }
        }catch(err){
            res.status(500).json(err);
        }
    }

    // add task
    async addTask(req,res,next){
        try{
            const taskAdd = new Task({
                'name': req.body.name,
                'status': req.body.status
            });
        
            const task = await taskAdd.save();
            res.status(200).json(task);
        }catch(err){
            res.status(500).json(err);
        }
    
    }

    //update task
    async updateTask(req, res, next) {
        try{
            const taskUpdate = await Task.findByIdAndUpdate({'_id': req.params.id}, {$set: req.body}, {new: true});
            res.status(200).json(taskUpdate);
        }catch(err){
            res.status(500).json(err);
        }
    }

    // delete task
    async deleteTask(req, res, next) {
        try{
            const taskDelete = await Task.deleteOne({'_id': req.params.id});
            res.status(200).json(" 1 task Deleted");
        }catch(err){
            res.status(500).json(err);
        }
    }
}

module.exports = new TaskController();
