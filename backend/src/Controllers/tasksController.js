import Task from "../models/tasksModel.js"

export const getAllTasks = async (req, res) => {
    try {
        const result = await Task.aggregate([
            {
                $facet: {
                    tasks: [{ $sort: { createdAt: -1 } }],
                    activeCount: [{ $match: { status: 'active' } }, { $count: 'count' }],
                    completeCount: [{ $match: { status: 'complete' } }, { $count: 'count' }]
                }
            }
        ]);
        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completeCount = result[0].completeCount[0]?.count || 0;

        res.status(200).json({ tasks, activeCount, completeCount });
    } catch (error) {
        console.log("error when get all task: ", error)
        res.status(500).json({ message: "system error !!!" })
    }
};

export const createTasks = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title });
        if (!task) {
            console.log("missing title or description !!!");
            res.status(401).json({ message: "Title are required !!!" })
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
        const { title, status, completeAt } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                status,
                completeAt
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
        if (!deleteTask) {
            return res.status(404).json({ message: "Not Exit" });
        }
        res.status(201).json(deleteTask);
    } catch (error) {
        console.error("error when using delete task: ", error);
        res.status(500).json({ message: "system error !!!" });
    }
};