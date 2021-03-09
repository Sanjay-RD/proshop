import express from "express";
const route = express.Router();

import { authUser } from "../controllers/userController.js";
import router from "./productRoutes.js";

router.route("/login").post(authUser);

export default router;
