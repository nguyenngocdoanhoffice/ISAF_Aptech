function ProductTable({ data, loading, handleEdit, handleDelete }) {
  return (
    <>
      <h2>Danh sách sản phẩm</h2>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Danh mục</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>
                      <button onClick={() => handleEdit(item)}>Sửa</button>
                      <button
                        className="danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Không có sản phẩm nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default ProductTable
