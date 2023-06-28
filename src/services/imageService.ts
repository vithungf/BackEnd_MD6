import {Image} from "../entity/image";
import {AppDataSource} from "../dataSource";

class ImageService {
    private imageRepository
    constructor() {
        this.imageRepository = AppDataSource.getRepository(Image)
    }

    getAllImage = async () => {
        let images = await this.imageRepository.find();
        return images

    }

    findImageByIdHome = async (idHome) => {
        let sql = `select * from image where idHome = ${idHome}`;
        return await this.imageRepository.query(sql);
    }
}
export default new ImageService();
