import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { AddTasks } from '../AddTasks/AddTasks'
import { Task } from './Task/Task'
import editSvg from '../../assets/img/icons/edit.svg'

import './Tasks.scss'

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  withoutEmpty,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt('Введіть нову назву списку!', list.name)
    if (newTitle) {
      onEditTitle(list.id, newTitle)
      axios
        .patch('http://localhost:3005/lists/' + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert('Не вдалося змінити назву списку!')
        })
    }
  }

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 className="tasks__title" style={{ color: list.color.hex }}>
          {list.name}
          <img onClick={() => editTitle()} src={editSvg} alt="Edit Icon" />
        </h2>
      </Link>

      <div className="tasks__items items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задачі відсутні в даному списку!</h2>
        )}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              key={task.id}
              list={list}
              onEdit={onEditTask}
              onRemove={onRemoveTask}
              onComplete={onCompleteTask}
              {...task}
            />
          ))}
      </div>

      <AddTasks key={list.id} list={list} onAddTask={onAddTask} />
    </div>
  )
}

export default Tasks
