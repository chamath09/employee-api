import express from "express";
import {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployees,
  fetchEmployeesByDepId
  
  
} from "../controllers/employeeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware,upload.single('image'), addEmployee);
router.get("/", authMiddleware, getEmployees);
router.get("/:id", authMiddleware, getEmployee);
router.put("/:id", authMiddleware, updateEmployees);
router.get("/department/:id", authMiddleware, fetchEmployeesByDepId);

export default router;
