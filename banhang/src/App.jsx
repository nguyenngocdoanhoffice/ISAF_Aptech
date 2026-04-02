import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, clearFavorites, removeFavorite } from './store.js'
import './App.css'

const api = 'https://jsonplaceholder.typicode.com/users'

function App() {
  const list = useSelector((state) => state.favorites.list)

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <p className="small-title">Users Management</p>
          <h1>ReactJS Users App</h1>
        </div>

        <nav className="menu">
          <Link to="/users">Users</Link>
          <Link to="/favorites">Favorites ({list.length})</Link>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </div>
  )
}

function UsersPage() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [text, setText] = useState('')
  const [company, setCompany] = useState('all')

  const dispatch = useDispatch()
  const favoriteList = useSelector((state) => state.favorites.list)

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const time = setTimeout(() => {
      setText(search)
    }, 500)

    return () => clearTimeout(time)
  }, [search])

  async function getData() {
    try {
      setLoading(true)
      setError('')
      const res = await axios.get(api)
      setList(res.data)
    } catch (err) {
      console.log(err)
      setError('Load users failed')
      alert('Load users failed')
    } finally {
      setLoading(false)
    }
  }

  const companyList = [...new Set(list.map((item) => item.company.name))]

  const showList = list.filter((item) => {
    const matchName = item.name.toLowerCase().includes(text.toLowerCase())
    const matchCompany = company === 'all' || item.company.name === company
    return matchName && matchCompany
  })

  function handleFavorite(item) {
    const found = favoriteList.find((data) => data.id === item.id)
    if (found) {
      dispatch(removeFavorite(item.id))
    } else {
      dispatch(addFavorite(item))
    }
  }

  if (loading) {
    return <p className="message">Loading...</p>
  }

  if (error) {
    return <p className="message error">{error}</p>
  }

  return (
    <section>
      <div className="toolbar">
        <div className="field">
          <label>Search Users</label>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Filter by Company</label>
          <select value={company} onChange={(e) => setCompany(e.target.value)}>
            <option value="all">All Companies</option>
            {companyList.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid">
        {showList.map((item) => {
          const isFavorite = favoriteList.some((data) => data.id === item.id)

          return (
            <article className={`card ${isFavorite ? 'card-favorite' : ''}`} key={item.id}>
              <div className="avatar">{item.name.slice(0, 2).toUpperCase()}</div>
              <h3>{item.name}</h3>
              <p className="username">@{item.username}</p>
              <p className="company">{item.company.name}</p>
              <p className="info">Email: {item.email}</p>
              <p className="info">Phone: {item.phone}</p>

              <div className="actions">
                <Link className="btn btn-light" to={`/users/${item.id}`}>
                  View Details
                </Link>
                <button className="btn btn-gold" onClick={() => handleFavorite(item)}>
                  {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function UserDetailPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const favoriteList = useSelector((state) => state.favorites.list)

  useEffect(() => {
    getData()
  }, [id])

  async function getData() {
    try {
      setLoading(true)
      setError('')
      const res = await axios.get(`${api}/${id}`)
      setData(res.data)
    } catch (err) {
      console.log(err)
      setError('Load detail failed')
      alert('Load detail failed')
    } finally {
      setLoading(false)
    }
  }

  function handleFavorite() {
    const found = favoriteList.find((item) => item.id === data.id)
    if (found) {
      dispatch(removeFavorite(data.id))
    } else {
      dispatch(addFavorite(data))
    }
  }

  if (loading) {
    return <p className="message">Loading...</p>
  }

  if (error) {
    return <p className="message error">{error}</p>
  }

  if (!data) {
    return null
  }

  const isFavorite = favoriteList.some((item) => item.id === data.id)

  return (
    <section className="detail">
      <button className="back-btn" onClick={() => navigate('/users')}>
        ← Back to Users
      </button>

      <div className="detail-box">
        <div className="detail-left">
          <div className="avatar big">{data.name.slice(0, 2).toUpperCase()}</div>
          <h2>{data.name}</h2>
          <p className="username">@{data.username}</p>
          <p className="company tag">{data.company.name}</p>
        </div>

        <div className="detail-right">
          <div className="info-box">
            <h3>Contact Information</h3>
            <p><b>Email:</b> {data.email}</p>
            <p><b>Phone:</b> {data.phone}</p>
            <p><b>Website:</b> {data.website}</p>
          </div>

          <div className="info-box">
            <h3>Address</h3>
            <p><b>Street:</b> {data.address.street}</p>
            <p><b>City:</b> {data.address.city}</p>
          </div>

          <div className="info-box">
            <h3>Company</h3>
            <p><b>Company Name:</b> {data.company.name}</p>
          </div>

          <div className="actions">
            <button className="btn btn-gold" onClick={handleFavorite}>
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <button className="btn btn-light" onClick={() => navigate('/users')}>
              Back to Users
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function FavoritesPage() {
  const list = useSelector((state) => state.favorites.list)
  const dispatch = useDispatch()

  function handleRemove(id) {
    dispatch(removeFavorite(id))
  }

  function handleClear() {
    dispatch(clearFavorites())
  }

  return (
    <section>
      <div className="favorites-head">
        <h2>Favorites</h2>
        <button className="btn btn-clear" onClick={handleClear}>
          Clear Favorites
        </button>
      </div>

      {list.length === 0 ? (
        <p className="message">No favorites yet.</p>
      ) : (
        <div className="favorite-list">
          {list.map((item) => (
            <div className="favorite-item" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>@{item.username}</p>
                <p>{item.company.name}</p>
              </div>
              <button className="icon-btn" onClick={() => handleRemove(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default App
