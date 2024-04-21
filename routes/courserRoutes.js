import {Router} from "express"
import { getAllCourses } from "../controllers/courses.controller.js";

const router=Router();

router
.route('/')
.get(getAllCourses);

export default router;
