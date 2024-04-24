const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const compression = require("compression");
const path = require("path");

const AppError = require("./utils/appError");
// const sanitizeHtml = require("./middlewares/sanitizeHtml");
const errorHandler = require("./middlewares/errorMiddleware");
const userRoutes = require("./routes/userRoutes");

// const categoryRoutes = require("./routes/categoryRoutes");
// const assetRoutes = require("./routes/assetRoutes");
// const reservationRoutes = require("./routes/reservationRoutes");
// const bookingRoutes = require("./routes/bookingRoutes");
// const rateRoutes = require("./routes/rateRoutes");
// const guestRoutes = require("./routes/guestRoutes");
// const policyRoutes = require("./routes/policyRoutes");
// const institutionRoutes = require("./routes/institutionRoutes");
// const invoiceRoutes = require("./routes/invoiceRoutes");
// const templateRoutes = require("./routes/templateRoutes");
// const genericRoutes = require("./routes/genericRoutes");
// const colorRoutes = require("./routes/colorRoutes");
// const channelPartnerRoutes = require("./routes/channelPartnerRoutes");
// const inventoryRoutes = require("./routes/inventoryRoutes");
// const otaRoutes = require("./routes/otaRoutes");
// const grcRoutes = require("./routes/grcRoutes");
// const receiptRoutes = require("./routes/receiptRoutes");
// const settingRoutes = require("./routes/settingRoutes");

//* Start express app **********************************************

const app = express();

//* Middlewares ****************************************************

// Implement cors
app.use(
  cors({
    // origin: "*",
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
);
app.options("*", cors());

// set security HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Logger for dev
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests
const limiter = rateLimit({
  //TODO change max to 100
  max: 2000,
  windowMs: 15 * 60 * 1000,
  message: new AppError(
    "Too many requests from this IP, please try again in 15 min",
    429
  ),
});
app.use("/api", limiter);

// Body parser
app.use(express.json({ limit: "20kb" }));

// Cookie parser
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
// app.use(sanitizeHtml());

// Prevent paramater pollution
app.use(hpp());

// compression
app.use(compression());

//* Routes *********************************************************

app.get("/", (req, res) => res.send("Server working!"));

app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/category", categoryRoutes);
// app.use("/api/v1/asset", assetRoutes);
// app.use("/api/v1/reservation", reservationRoutes);
// app.use("/api/v1/booking", bookingRoutes);
// app.use("/api/v1/rate", rateRoutes);
// app.use("/api/v1/guest", guestRoutes);
// app.use("/api/v1/policy", policyRoutes);
// app.use("/api/v1/institution", institutionRoutes);
// app.use("/api/v1/invoice", invoiceRoutes);
// app.use("/api/v1/template", templateRoutes);
// app.use("/api/v1/generic", genericRoutes);
// app.use("/api/v1/color", colorRoutes);
// app.use("/api/v1/channel", channelPartnerRoutes);
// app.use("/api/v1/inventory", inventoryRoutes);
// app.use("/api/v1/ota", otaRoutes);
// app.use("/api/v1/grc", grcRoutes);
// app.use("/api/v1/receipt", receiptRoutes);
// app.use("/api/v1/setting", settingRoutes);

// Serving static files
app.use(express.static(path.join(__dirname, "uploads")));

//* Error Middleware ***********************************************

// Route not found
app.all("*", (req, res, next) => {
  next(
    new AppError(`Can't find ${req.originalUrl} route on this server!`, 404)
  );
});

// Global error handling
app.use(errorHandler);

module.exports = app;
