import React from 'react'
import axios from 'axios'

import editSvg from '../../assets/img/icons/edit.svg'
import addSvg from '../../assets/img/icons/add.svg'

import './Tasks.scss'

const Tasks = ({ list, onEditTitle }) => {
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
    <div className="todo__tasks tasks">
      <h2 className="tasks__title">
        {list.name}
        <img onClick={() => editTitle()} src={editSvg} alt="Edit Icon" />
      </h2>

      <div className="tasks__items items">
        {!list.tasks.length && <h2>Задачі відсутні в даному списку!</h2>}
        {list.tasks &&
          list.tasks.map((task) => (
            <div className="items__task task" key={task.id}>
              <div className="task__checkbox">
                <input id={`task-${task.id}`} type="checkbox" />
                <label htmlFor={`task-${task.id}`}>
                  <svg
                    width="11"
                    height="8"
                    viewBox="0 0 11 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                      stroke="#b4b4b4"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </label>
              </div>
              <input type="text" value={task.text} />
            </div>
          ))}
      </div>

      <div className="tasks__form form">
        <div className="form__new-task">
          <img src={addSvg} alt="Add Icon" />
        </div>
      </div>
    </div>
  )
}

export default Tasks
