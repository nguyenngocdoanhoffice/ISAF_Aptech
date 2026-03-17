const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = "mysecret";


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== "admin@gmail.com" || password !== "123456") {
    return res.status(401).json({
      message: "Email hoặc password không đúng"
    });
  }

  const token = jwt.sign(
    {
      userId: 1,
      email
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({
    accessToken: token
  });
});


function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ"
    });
  }
}


app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    id: req.user.userId,
    email: req.user.email
  });
});


app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});