import * as cors from 'cors';
import * as express from "express";
import * as fs from 'fs';
import * as https from 'https';
import "reflect-metadata";
import { AppDataSource } from './data-source';
import { User } from "./entity/User";
import { Routes } from "./routes";
import * as jwt from 'jsonwebtoken'

interface UserBody {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}


AppDataSource.initialize().then(() => {
    // create express app
    const app = express();
    app.use(cors({
        credentials: true,//protiv xss napada

        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        origin: 'http://localhost:3000'

    }));
    app.use(express.json({
        limit: '5mb'
    }));
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const user = await AppDataSource.getRepository(User).findOne({
            where: {
                email: email,
                password: password
            }
        });
        if (!user) {
            res.status(400).json({ error: 'Bad credentials' });
            return;
        }
        const token = jwt.sign({ id: user.id }, 'jwttoken1252t', { expiresIn: '2h' });
        res.json({
            user,
            token
        })

    })
    app.post('/register', async (req, res) => {
        const data = req.body as UserBody;
        const user = await AppDataSource.getRepository(User).findOne({
            where: {
                email: data.email,
            }
        });
        if (user) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }
        const createdUser = await AppDataSource.getRepository(User).save({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            admin: false
        })
        const token = jwt.sign({ id: createdUser.id }, 'jwttoken1252t', { expiresIn: '2h' });
        res.json({
            user: createdUser,
            token
        })
    })
    app.use('/uploads', express.static('uploads'))

    app.use(async (req, res, next) => {
        const authorization = req.headers.authorization;
        if (!authorization) {
            res.status(401).json({ error: 'unauthorized' })
            return;
        }
        const splited = authorization.split(' ');
        if (splited.length !== 2 || splited[0] !== 'Bearer') {
            res.status(401).json({ error: 'unauthorized' })
            return;
        }
        const token = splited[1];
        try {
            const userId = jwt.verify(token, 'jwttoken1252t') as { id: number };
            const user = await AppDataSource.getRepository(User).findOne({
                where: { id: userId.id }
            });
            if (!user) {
                res.status(401).json({ error: 'unauthorized' })
                return;
            }
            (req as any).user = user;
            next();
        } catch (error) {
            res.status(401).json({ error: 'unauthorized' })
        }
    })

    app.get('/check', async (req, res) => {
        const user = (req as any).user;
        res.json(user);
    })

    Routes.forEach(route => {
        app[route.method](route.route, ...route.actions);
    });

    // setup express app here
    // ...

    // start express server

    app.listen(4000, () => console.log('app is listening'))

}).catch(error => console.log(error));
