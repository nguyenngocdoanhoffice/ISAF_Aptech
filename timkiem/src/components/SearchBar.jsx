function SearchBar({ value, setValue }) {
  return (
    <input
      className="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Tìm kiếm theo tên sản phẩm..."
    />
  )
}

export default SearchBar
