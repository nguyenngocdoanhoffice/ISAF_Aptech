function TodoItem({ item, handleEdit, handleDelete }) {
  return (
    <li className="item">
      <span>
        {item.title} {item.completed ? '(xong)' : ''}
      </span>

      <div className="group-btn">
        <button type="button" onClick={() => handleEdit(item)}>
          Sửa
        </button>
        <button type="button" onClick={() => handleDelete(item.id)}>
          Xóa
        </button>
      </div>
    </li>
  )
}

export default TodoItem