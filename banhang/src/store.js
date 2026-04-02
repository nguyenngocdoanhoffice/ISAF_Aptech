import { configureStore, createSlice } from '@reduxjs/toolkit'

function getData() {
  const data = localStorage.getItem('favorites')
  if (!data) return []

  try {
    return JSON.parse(data)
  } catch (error) {
    console.log(error)
    return []
  }
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    list: getData(),
  },
  reducers: {
    addFavorite(state, action) {
      const found = state.list.find((item) => item.id === action.payload.id)
      if (!found) {
        state.list.push(action.payload)
      }
    },
    removeFavorite(state, action) {
      state.list = state.list.filter((item) => item.id !== action.payload)
    },
    clearFavorites(state) {
      state.list = []
    },
  },
})

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
  },
})

store.subscribe(() => {
  localStorage.setItem('favorites', JSON.stringify(store.getState().favorites.list))
})