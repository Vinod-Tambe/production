const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Body parser
app.use(express.json());

// ✅ Proper CORS setup
app.use(cors({
  origin:  ['http://localhost:3000', 'https://khataboss.com'], // or add other allowed domains here
  credentials: true,
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve homepage
const htmlPath = path.join(__dirname, './views/index.html');
app.get("/", (req, res) => {
  return res.sendFile(htmlPath);
});

// ✅ Route registration
const ownerRouters = require("./routes/owner.route.js");
app.use("/owner", ownerRouters);

const adminRouters = require("./routes/admin.route.js");
app.use("/admin", adminRouters);

const authRouters = require("./routes/auth.route.js");
app.use("/auth", authRouters);

const firmRouters = require("./routes/firm.route.js");
app.use("/firm", firmRouters);

const userRouters = require("./routes/user.route.js");
app.use("/user", userRouters);

const accountRouters = require("./routes/account.route.js");
app.use("/account", accountRouters);

// ✅ Export only once at the end
module.exports = app;
