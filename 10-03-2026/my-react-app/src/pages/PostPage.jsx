import { Table, Button } from "antd"
import { usePosts } from "../hooks/usePosts"

const columns = [
  {
    title: "ID",
    dataIndex: "id"
  },
  {
    title: "Title",
    dataIndex: "title"
  },
  {
    title: "Body",
    dataIndex: "body"
  }
]

const PostPage = () => {
  const { data, isLoading, isError, error, refetch } = usePosts()

  if (isError) {
    return <p>{error.message}</p>
  }

  return (
    <div style={{ padding: 40 }}>
      
      <Button
        type="primary"
        onClick={refetch}
        style={{ marginBottom: 20 }}
      >
        Reload
      </Button>

      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="id"
      />
    </div>
  )
}

export default PostPage