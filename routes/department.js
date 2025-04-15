import express from 'express';
import {
  addDepartment,
  getDepartments,
  updateDepartments,
  getDepartment,
  deleteDepartment
} from "../controllers/departmentController.js";
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/add", authMiddleware, addDepartment);
router.get("/", authMiddleware, getDepartments);
router.get("/:id", authMiddleware, getDepartment);
router.put("/:id", authMiddleware, updateDepartments);
router.delete("/:id", authMiddleware, deleteDepartment);


export default router;