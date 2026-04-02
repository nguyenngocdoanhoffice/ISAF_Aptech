import TodoItem from './TodoItem.jsx'

function TodoList({ list, handleEdit, handleDelete }) {
  return (
    <ul className="list">
      {list.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList