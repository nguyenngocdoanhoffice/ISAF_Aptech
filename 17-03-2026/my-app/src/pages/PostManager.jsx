import { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../api/postApi";
import PostForm from "../components/PostForm";
import axios from "axios";
import { saveAs } from "file-saver";

export default function PostManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // ================= GET =================
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await getPosts();
      setPosts(res.data.slice(0, 10)); // lấy 10 cái cho gọn
    } catch (err) {
      message.error("Lỗi khi load dữ liệu");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ================= CREATE =================
  const handleCreate = async (data) => {
    try {
      const res = await createPost(data);
      setPosts([res.data, ...posts]);
      message.success("Thêm thành công");
      setOpen(false);
    } catch {
      message.error("Thêm thất bại");
    }
  };

  // ================= UPDATE =================
  const handleUpdate = async (data) => {
    try {
      const res = await updatePost(editingPost.id, data);

      const newList = posts.map((p) =>
        p.id === editingPost.id ? res.data : p
      );

      setPosts(newList);
      message.success("Cập nhật thành công");
      setEditingPost(null);
      setOpen(false);
    } catch {
      message.error("Cập nhật thất bại");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((p) => p.id !== id));
      message.success("Xóa thành công");
    } catch {
      message.error("Xóa thất bại");
    }
  };

  // ================= DOWNLOAD =================
  const handleDownload = async () => {
    try {
      const res = await axios.get(
        "https://raw.githubusercontent.com/cs109/2014_data/master/countries.csv",
        { responseType: "blob" }
      );

      const blob = new Blob([res.data], { type: "text/csv" });
      saveAs(blob, "countries.csv");

      message.success("Download thành công");
    } catch {
      message.error("Download lỗi");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Title", dataIndex: "title" },
    { title: "Body", dataIndex: "body" },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => {
              setEditingPost(record);
              setOpen(true);
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Xóa?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Post Manager</h2>

      <Button type="primary" onClick={() => setOpen(true)}>
        Add Post
      </Button>

      <Button onClick={handleDownload} style={{ marginLeft: 10 }}>
        Download CSV
      </Button>

      <Table
        dataSource={posts}
        columns={columns}
        rowKey="id"
        loading={loading}
        style={{ marginTop: 20 }}
      />

      <PostForm
        open={open}
        onCancel={() => {
          setOpen(false);
          setEditingPost(null);
        }}
        onSubmit={editingPost ? handleUpdate : handleCreate}
        initialData={editingPost}
      />
    </div>
  );
}