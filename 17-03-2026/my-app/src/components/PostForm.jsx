import { Modal, Form, Input } from "antd";
import { useEffect } from "react";

export default function PostForm({ open, onCancel, onSubmit, initialData }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialData || { title: "", body: "" });
  }, [initialData]);

  return (
    <Modal
      title={initialData ? "Edit Post" : "Add Post"}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={onSubmit}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="body" label="Body" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}