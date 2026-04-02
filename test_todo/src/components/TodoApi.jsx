import { useEffect, useState } from 'react'
import axios from 'axios'
import TodoForm from './TodoForm.jsx'
import TodoList from './TodoList.jsx'

function TodoApi() {
  const [list, setList] = useState([])
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const api = 'https://jsonplaceholder.typicode.com/todos'

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setMessage('')

        const res = await axios.get(api)
        setList(res.data.slice(0, 10))
      } catch (error) {
        console.error(error)
        setMessage('Load danh sách bị lỗi')
        alert('Không gọi được API')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!input.trim()) {
      alert('Nhập tên công việc trước')
      return
    }

    try {
      setLoading(true)

      if (editId) {
        const res = await axios.put(`${api}/${editId}`, {
          title: input,
          completed: false,
        })

        const newList = list.map((item) =>
          item.id === editId ? { ...item, title: res.data.title } : item,
        )
        setList(newList)
        setEditId(null)
        alert('Sửa công việc thành công')
      } else {
        const res = await axios.post(api, {
          title: input,
          completed: false,
        })

        setList([{ ...res.data, id: Date.now() }, ...list])
        alert('Thêm công việc thành công')
      }

      setInput('')
      setMessage('')
    } catch (error) {
      console.error(error)
      setMessage('Có lỗi khi lưu dữ liệu')
      alert('Thao tác thất bại')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item) => {
    setInput(item.title)
    setEditId(item.id)
  }

  const handleDelete = async (id) => {
    const ok = window.confirm('Bạn có chắc muốn xóa không?')

    if (!ok) return

    try {
      setLoading(true)

      await axios.delete(`${api}/${id}`)
      const newList = list.filter((item) => item.id !== id)
      setList(newList)
      alert('Xóa công việc thành công')
    } catch (error) {
      console.error(error)
      setMessage('Xóa thất bại')
      alert('Không xóa được')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setInput('')
    setEditId(null)
  }

  return (
    <div className="app">
      <div className="box">
        <h1>Todo List</h1>
        <p className="note">Bài demo React + axios để thêm, sửa, xóa công việc.</p>

        <TodoForm
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          editId={editId}
          handleCancel={handleCancel}
          loading={loading}
        />

        {loading && <p className="status">Đang tải dữ liệu...</p>}
        {message && <p className="error">{message}</p>}

        <TodoList list={list} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </div>
  )
}

export default TodoApi