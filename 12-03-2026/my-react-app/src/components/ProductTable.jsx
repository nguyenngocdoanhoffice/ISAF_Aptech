import { useEffect, useState } from "react";
import { Table, Image } from "antd";
import { getProducts } from "../services/productService";

function ProductTable() {
  const [products, setProducts] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img) => <Image src={img} width={50} />
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category"
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={products}
      rowKey="id"
      pagination={{
        pageSize: 10
      }}
    />
  );
}

export default ProductTable;