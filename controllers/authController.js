import authService from "../services/authService.js";
import { validationResult } from 'express-validator';

class AuthController {
    async registration(req, res) {
        console.log('lkjljlljlkjsdfjsedfkjsdlkjsdfkj')
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            
            const user = await authService.createUser(req.body);

            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (e) {
            console.log(e, 'TTTTT')
            console.log(e)
            res.status(400).json({message: "Ошибка регистрации"})
        }
    }
    
    async login(req, res) {
        try {
            const result = await authService.login(req.body);
            return res.json(result);
        } catch (e) {
            console.error(e);
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

export default new AuthController();
