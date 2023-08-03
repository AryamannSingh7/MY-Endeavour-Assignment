const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv/config')
const app=express();
app.use(express.json());
app.use(cors());

const dbOptions={
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose.connect(process.env.DB_URI,dbOptions)
.then(()=>console.log('Database Connection established'))
.catch(console.error)

const Task=require('./models/Task');

app.get('/tasks', async (req,res)=>{
    const tasks= await Task.find();
    res.json(tasks);
})

app.post("/task/create", async (req, res)=>{
    const task=new Task({
        title: req.body.title,
        description: req.body.description,
    })

    task.save();
    res.json(task);
})

app.delete('/task/delete/:id',async (req,res)=>{
    const result = await Task.findByIdAndDelete(req.params.id);
    res.json(result);
})

app.get('/task/completed/:id',async (req,res)=>{
    const task=await Task.findById(req.params.id);
    task.status=!task.status;
    task.save();
    res.json(task);
})

app.listen(process.env.PORT,()=>{
    console.log('Connected to port: '+process.env.PORT)
})