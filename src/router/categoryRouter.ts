import {Router} from "express";
import homeController from "../controller/homeController";

export const categoryRouter = Router()
categoryRouter.get('/',homeController.findCategory);