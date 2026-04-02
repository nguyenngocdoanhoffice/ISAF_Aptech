function ProductForm({
  editId,
  name,
  setName,
  price,
  setPrice,
  desc,
  setDesc,
  category,
  setCategory,
  handleAdd,
  clearForm,
}) {
  return (
    <>
      <h2>{editId ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h2>

      <form onSubmit={handleAdd} className="form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên sản phẩm"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Giá"
          type="number"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Danh mục"
        />
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Mô tả"
          rows="3"
        />

        <div className="group-btn">
          <button type="submit">{editId ? 'Cập nhật' : 'Thêm mới'}</button>
          <button type="button" className="light" onClick={clearForm}>
            Xóa form
          </button>
        </div>
      </form>
    </>
  )
}

export default ProductForm
