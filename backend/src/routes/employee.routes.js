import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  uploadEmployeeData,
  addEmployeeData,
  updateEmployeeData,
  getEmployeeData,
  deleteEmployeeData,
} from "../controllers/employees.controller.js";

const router = Router();

router
  .route("/uploadEmployeeData")
  .post(upload.single("file"), uploadEmployeeData);

router.route("/addEmployeeData").post(addEmployeeData);

router.route("/updateEmployeeData/:id").put(updateEmployeeData);

router.route("/getEmployeeData").get(getEmployeeData);

router.route("/deleteEmployeeData/:id").delete(deleteEmployeeData);

export default router;
