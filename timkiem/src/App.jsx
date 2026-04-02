import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import SearchBar from './components/SearchBar'
import ProductForm from './components/ProductForm'
import ProductTable from './components/ProductTable'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
})

function App() {
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [editId, setEditId] = useState(null)

  const getData = async (text = '') => {
    try {
      setLoading(true)
      console.log('search:', text)

      const url = text.trim()
        ? `/products/search?q=${encodeURIComponent(text.trim())}`
        : '/products?limit=100'

      const res = await api.get(url)
      setData(res.data.products || [])
    } catch (error) {
      console.log(error)
      alert('Lỗi khi lấy dữ liệu')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getData(search)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    getData()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()

    const body = {
      title: name,
      price: Number(price),
      description: desc,
      category: category,
    }

    try {
      if (editId) {
        await api.put(`/products/${editId}`, body)
        alert('Sửa sản phẩm thành công')
      } else {
        await api.post('/products/add', body)
        alert('Thêm sản phẩm thành công')
      }

      setName('')
      setPrice('')
      setDesc('')
      setCategory('')
      setEditId(null)
      getData(search)
    } catch (error) {
      console.log(error)
      alert('Có lỗi khi lưu sản phẩm')
    }
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setName(item.title || '')
    setPrice(item.price || '')
    setDesc(item.description || '')
    setCategory(item.category || '')
  }

  const handleDelete = async (id) => {
    const ok = window.confirm('Bạn có muốn xóa sản phẩm này không?')
    if (!ok) return

    try {
      await api.delete(`/products/${id}`)
      alert('Xóa sản phẩm thành công')
      getData(search)
    } catch (error) {
      console.log(error)
      alert('Có lỗi khi xóa sản phẩm')
    }
  }

  const clearForm = () => {
    setName('')
    setPrice('')
    setDesc('')
    setCategory('')
    setEditId(null)
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Quản lý sản phẩm</h1>
        <p className="sub">CRUD đơn giản bằng React + axios</p>

        <div className="card">
          <SearchBar value={search} setValue={setSearch} />
        </div>

        <div className="card">
          <ProductForm
            editId={editId}
            name={name}
            setName={setName}
            price={price}
            setPrice={setPrice}
            desc={desc}
            setDesc={setDesc}
            category={category}
            setCategory={setCategory}
            handleAdd={handleAdd}
            clearForm={clearForm}
          />
        </div>

        <div className="card">
          <ProductTable
            data={data}
            loading={loading}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  )
}

export default App
