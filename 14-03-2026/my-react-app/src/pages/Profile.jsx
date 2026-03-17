import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);

  const getProfile = async () => {
    try {
      const res = await api.get("/profile");
      setUser(res.data);
    } catch (err) {
      alert("Token lỗi hoặc chưa login");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>

      {user ? (
        <div>
          <p>ID: {user.id}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}