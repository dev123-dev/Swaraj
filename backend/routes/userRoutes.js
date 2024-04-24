const express = require("express");

const userControllers = require("../controllers/userControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");
// const uploadMiddlewares = require("../middlewares/uploadMiddlewares");
const refreshAccessToken = require("../controllers/refreshTokenController");

const router = express.Router();

// router.post("/login", userControllers.login);
router.get("/refresh", refreshAccessToken);
// router.patch("/logout", userControllers.logout);

router.use(authMiddlewares.protect); //* Protect *//

// router.route("/me").get(userControllers.getUserId, userControllers.getUserById);

// router.get("/", userControllers.getAllUsers);

//* Routes only for Admin ******************************************
router.use(authMiddlewares.restrictTo("Super Admin", "Admin")); //* Restrict *//

// router
//   .route("/")
//   .post(
//     uploadMiddlewares.uploadUserPhoto,
//     userControllers.addPhotoToBody,
//     userControllers.createUser
//   );

// router
//   .route("/:id")
//   .patch(
//     uploadMiddlewares.uploadUserPhoto,
//     userControllers.addPhotoToBody,
//     userControllers.errorPasswordUpdate,
//     userControllers.updateUserById
//   );

// router.patch("/:id/update-password", userControllers.updatePassword);

module.exports = router;
