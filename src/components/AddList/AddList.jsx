import React from 'react'
import axios from 'axios'

import List from '../List/List'
import Badge from '../Badge/Badge'
import closeSvg from '../../assets/img/icons/close.svg'
import './AddList.scss'

const BTN_ADD_LIST = 'Додати до списку'

const AddList = ({ colors, onAddList }) => {
  const [visiblePopup, setVisiblePopup] = React.useState(false)
  const [selectedColor, setSelectedColor] = React.useState(3)
  const [isLoading, setIsLoading] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')

  React.useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id)
    }
  }, [colors])

  const onClose = () => {
    setVisiblePopup(false)
    setInputValue('')
    setSelectedColor(colors[0].id)
  }

  const addList = () => {
    if (!inputValue) {
      alert('Введіть назву списку!')
      return
    }

    setIsLoading(true)

    axios
      .post('http://localhost:3005/lists', {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((color) => color.id === selectedColor)[0]
        const listObj = { ...data, color, tasks: [] }

        onAddList(listObj)
        onClose()
      })
      .catch(() => alert('Помилка при додаванні нового списку!'))
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(!visiblePopup)}
        items={[
          {
            className: 'list__add-btn',
            classNameBold: 'list__bold',
            icon: (
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: BTN_ADD_LIST,
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <button className="add-list__popup-close" onClick={onClose}>
            <img src={closeSvg} alt="Close Icon" />
          </button>

          <input
            className="field"
            type="text"
            placeholder="Name List"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <div className="add-list__colors">
            {colors.map((color) => (
              <Badge
                onClick={() => setSelectedColor(color.id)}
                color={color.name}
                key={color.id}
                className={selectedColor === color.id && 'active'}
              />
            ))}
          </div>
          <button className="button" onClick={addList}>
            {isLoading ? 'Додавання....' : 'Add New List'}
          </button>
        </div>
      )}
    </div>
  )
}

export default AddList
