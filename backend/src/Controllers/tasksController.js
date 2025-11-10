import Task from "../models/tasksModel.js"

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({createdAt : -1});
        res.status(200).json(tasks);
    } catch (error) {
        console.log("error when get all task: ", error)
        res.status(500).json({ message: "system error !!!" })
    }
};

export const createTasks = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({ title, description });
        if (!task) {
            console.log("missing title or description !!!");
            res.status(401).json({ message: "Title and Description are required !!!" })
        }
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("error when using create task: ", error)
        res.status(500).json({ message: "system error !!!" })
    }
};

export const updateTasks = async (req, res) => {
    try {
        const { title, description, status, completedAt } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                status,
                completedAt
            },
            { new: true }
        )
        if (!updatedTask) {
            return res.status(404).json({ message: "Not Exit !!!" });
        }
        res.status(200).json(updatedTask)
    } catch (error) {
        console.error("error when using update task: ", error);
        res.status(500).json({ message: "system error !!!" });
    }
};

export const deleteTasks = async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id)
        if(!deleteTask){
            return res.status(404).json({message: "Not Exit"});
        }
        res.status(201).json(deleteTask);
    } catch (error) {
        console.error("error when using delete task: ", error);
        res.status(500).json({ message: "system error !!!" });
    }
};