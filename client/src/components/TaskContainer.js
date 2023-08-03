import React from 'react'

const TaskContainer = (props) => {
  return (
    <div className='task-container is-complete'>
        <button className='edit-button'>Edit</button>
        <div className='task-details'>
            <h1>Title</h1>
            <p>Order pizza from pizza hut</p>
        </div>
        <button className='delete-button'>Delete</button>
    </div>
  )
}

export default TaskContainer
