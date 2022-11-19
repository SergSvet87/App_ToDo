import React from 'react'
import classNames from 'classnames'
import axios from 'axios'

import Badge from '../Badge/Badge'
import removeSvg from '../../assets/img/icons/remove.svg'

import './List.scss'

const List = ({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem,
}) => {
  const removeList = (item) => {
    if (window.confirm('Ви дійсно бажаєте видалити цей список?')) {
      axios.delete(`http://localhost:3005/lists/${item.id}`).then(() => {
        onRemove(item.id)
      })
    }
  }

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          className={classNames(item.className, item.classNameBold, {
            active:  activeItem && activeItem.id === item.id
          })}
          key={index}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>
            {item.name}
            {item.tasks && item.tasks.length > 0 && ` (${item.tasks.length})`}
          </span>
          {isRemovable && (
            <img
              className="list__remove-btn"
              src={removeSvg}
              alt="Remove Icon"
              onClick={() => removeList(item.id)}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default List
