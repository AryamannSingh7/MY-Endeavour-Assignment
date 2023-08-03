import React from 'react'
import { useState,useEffect } from 'react'
const API_BASE="https://mcs-task-manager-vscj.onrender.com"

const MainSection = () => {
  const [tasks,setTasks]=useState([]);
  const [popupActive,setPopupActive]= useState(false);
  const [newTitle,setNewTitle]= useState("");
  const [newDescription,setNewDescription]= useState("");

  useEffect(()=>{
    GetTasks();
    console.log(tasks);
  },[]);

 const GetTasks=()=>{
  fetch(API_BASE + "/tasks")
  .then(res=>res.json())
  .then(data=>setTasks(data))
  .catch(err=>console.error(err))
 }

 const completeTask=async id=>{
    const data=await fetch(API_BASE + '/task/completed/' + id)
    .then(res=>res.json())

    setTasks(tasks=>tasks.map(task=>{
      if(task._id===data._id){
        task.status=data.status;
      }

      return task
    }));
 }

 const deleteTask=async id=>{
  const data=await fetch(API_BASE + '/task/delete/' + id,{method: "DELETE"})
    .then(res=>res.json())

    setTasks(tasks=>tasks.filter(task=>task._id!==data._id));
 }

 const addTask=async ()=>{
  const data= await fetch(API_BASE + "/task/create",{
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTitle,
      description: newDescription
    })
  }).then(res=>res.json())
  setTasks([...tasks,data]);
  setPopupActive(false);
  setNewTitle("");
  setNewDescription("");
 }
 
  return (
    <div className='main-body'>
      <div className='main-section'>
         
            {tasks.map(task=>(
               <div className={'task-container' + (task.status? ' is-complete' : '')} key={task._id} onClick={()=>completeTask(task._id)}>
                <button className='edit-button'>{task.status? 'Completed': 'Pending'}</button>
                  <div className='task-details'>
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                    </div>
                  <button className='delete-button' onClick={()=>deleteTask(task._id)}>Delete</button>
                </div>
            ))}
        <div className='add-popup' onClick={()=>setPopupActive(true)}>---Add New Tasks---</div>
        {popupActive ? (
          <div className='popup'>
            <div className='close-popup' onClick={()=>setPopupActive(false)}>x</div>
            <div className='popup-container'>
              <h1>Add Task</h1>
              <div className='add-content'>
                <label htmlFor="title">TITLE: </label>
                <input type="text" className="input-field" onChange={e=>setNewTitle(e.target.value)} value= {newTitle}/>
                <label htmlFor="desc">Description: </label>
                <textarea type="text" rows={5} className="input-field" onChange={e=>setNewDescription(e.target.value)} value= {newDescription}/>
                <button onClick={addTask} className='create-button'>Create Task</button>
              </div>
            </div>
          </div>
        ) : ''}
        
        <div className='Info'>
          <div className='success-info'>
            Completed<button className='btn-success'></button>
          </div>
          <div className='pending-info'>
            Pending<button className='btn-pending'></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainSection
