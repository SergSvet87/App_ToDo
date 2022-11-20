import React from 'react'
import axios from 'axios'

import addSvg from '../../assets/img/icons/add.svg'

import './AddTasks.scss'

export const AddTasks = ({ list, onAddTask }) => {

  const [visibleForm, setVisibleForm] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState('')

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm)
    setInputValue('')
  }

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    }

    setIsLoading(true)

    axios
      .post('http://localhost:3005/tasks', obj)
      .then(({ data }) => {
        onAddTask(list.id, obj)

        toggleFormVisible()
      })
      .catch(() => alert('Помилка при додаванні задачі!'))
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="tasks__form form">
      {!visibleForm ? (
        <div className="form__new-task" onClick={toggleFormVisible}>
          <img src={addSvg} alt="Add Icon" />
          <span>Нове завдання</span>
        </div>
      ) : (
        <div className="form__btn">
          <input
            className="field"
            type="text"
            placeholder="Ім'я завдання"
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button className="button" onClick={addTask} disabled={isLoading}>
            {isLoading ? 'Додавання...' : 'Додати завдання'}
          </button>

          <button className="button button_gray" onClick={toggleFormVisible}>
            Відміна
          </button>
        </div>
      )}
    </div>
  )
}
