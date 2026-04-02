function TodoForm({ input, setInput, handleSubmit, editId, handleCancel, loading }) {
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nhập công việc..."
      />

      <div className="group-btn">
        <button type="submit" disabled={loading}>
          {editId ? 'Lưu sửa' : 'Thêm'}
        </button>

        {editId && (
          <button type="button" onClick={handleCancel} disabled={loading}>
            Hủy
          </button>
        )}
      </div>
    </form>
  )
}

export default TodoForm