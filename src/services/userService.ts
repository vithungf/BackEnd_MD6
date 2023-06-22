import {User} from "../entity/user";
import {AppDataSource} from "../dataSource";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {SECRET} from "../middleware/auth";

class userService {
    private userRepository

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    checkUser = async (user) => {
        let userCheck = await this.userRepository.findOneBy({username: user.username})
        if (!userCheck) {
            return "user not found";
        } else {
            let passwordCompare = await bcrypt.compare(user.password, userCheck.password)
            if (!passwordCompare) {
                return "wrong password"
            } else {
                let payload = {
                    idUser: userCheck.idUser,
                    username: userCheck.username,
                    fullName: userCheck.fullName,
                    phoneNumber: userCheck.phoneNumber,
                    role: userCheck.role,
                    avatar: userCheck.avatar
                }
                const token = jwt.sign(payload, SECRET, {
                    expiresIn: 3600000
                })
                let userRes = {
                    idUser: userCheck.idUser,
                    username: userCheck.username,
                    role: userCheck.role,
                    fullName: userCheck.fullName,
                    phoneNumber: userCheck.phoneNumber,
                    token: token
                }
                return userRes
            }
        }
    }

    register = async (user)=>{
        await this.userRepository.save(user)
    }

    findOne = async (userName) => {
        let userFind = await this.userRepository.findOne({
            where: {
                username: userName,
            }
        });
        return userFind;
    }

    changePassword = async (userId: number, currentPassword: string, newPassword: string) => {
        const user = await this.userRepository.findOne({ where:
                { idUser: userId}
        });
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Incorrect current password");
        }
        if (currentPassword === newPassword) {
            throw new Error("New password must be different from the current password");
        }
        // Add additional password validation logic if necessary
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await this.userRepository.save(user);
    };

    checkAcc= async (user) => {
        try {
            let payload = {
                idUser: user.idUser,
                username: user.username,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                role: user.role,
                avatar: user.avatar
            }
            const token = jwt.sign(payload, SECRET, {
                expiresIn: 3600000
            })
            let userRes: { token: string } = {
                token: token
            }
            return userRes
        }catch (err) {
            console.log(err.message);
        }
    }

    loginWithGoogle = async (user) => {
        let isExist = await this.userRepository.findOne({where: {
                username: user.username,
            }})
        if (isExist) {
            return await this.checkAcc(user)
        } else {
            await this.register(user)
            return await this.checkAcc(user)
        }
    }

    getMyProfile = async (idUser)=>{
        const test = await this.userRepository.findOneBy({idUser: idUser});
        console.log(test)
        return test
    }
    update = async (idUser, User) => {
        await this.userRepository.update(
            {idUser}, {
                username: User.username,
                password: User.password,
                avatar: User.avatar,
                role: User.role,
                fullName: User.fullName,
                phoneNumber: User.phoneNumber
            });
    }
}

export default new userService()