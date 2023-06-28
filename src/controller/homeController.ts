import { Request, Response } from "express";
import homeService from "../services/homeService";
import imageService from "../services/imageService";
import categoryService from "../services/categoryService";

class HomeController {
    constructor() {}
    createHome = async (req: Request, res: Response) => {
        try {
            console.log(req.body,1111)
            let homes = await homeService.createHome(req.body);
            return res.status(200).json(homes);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    findCategory = async (req: Request, res: Response) => {
        try {
            let categories = await categoryService.getAllCategory();
            return res.status(200).json(categories);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };

    async getHomeByUserId(req: Request, res: Response) {
        try {
            const idUser = req.params.id;
            let homes = await homeService.getHomeByUserId(idUser);
            res.status(200).json(homes);
        } catch (err) {
            console.log(err, "at getAllHome controller");
        }
    }

    async getAllHome(req: Request, res: Response) {
        try {
            const allHome = await homeService.getAllHome();
            res.status(200).json(allHome);
        } catch (err) {
            console.log(err, "at getAllHome controller");
        }
    }

    async updateHome(req: Request, res: Response) {
        try {
            const idHome = req.params.id;
            const newHome = req.body;
            console.log(newHome, "at update");

            const home = await homeService.updateHome(idHome,newHome);
            res.status(200).json(home);
        } catch (err) {
            console.log(err, "at updateHome controller");
        }
    }
    getImages = async (req: Request, res: Response) => {
        try {
            let images = await imageService.getAllImage();
            let categories = await categoryService.getAllCategory();

            if (req["decoded"]) {
                // let orders = await orderService.getMyOrder(req["decoded"].idUser);
                // return res.status(200).json({images, categories, orders});
            }

            return res.status(200).json({images, categories});
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    getImagesByIdHome = async (req: Request, res: Response) => {
        try {
            let images = await imageService.findImageByIdHome(req.params.idHome);
            let categories = await categoryService.getAllCategory();

            if (req["decoded"]) {
                // let orders = await orderService.getMyOrder(req["decoded"].idUser);
                // return res.status(200).json({images, categories, orders});
            }

            return res.status(200).json({images, categories});
        } catch (e) {
            res.status(500).json(e.message);
        }
    };


}

export default new HomeController();