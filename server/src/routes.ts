import { Request, Response } from "express";
import * as multer from "multer";
import path = require("path");
import deleteEntity from "./actions/deleteEntity";
import { getAllGenres } from "./actions/genreActions";
import { isAdmin } from "./actions/isAdmin";
import { createMovie, getAllMovies, updateMovie } from "./actions/movieActions";
import { createOrder, getAllOrders, sendOrder } from "./actions/orderActions";
import { renameFile } from "./actions/renameFile";
import { Movie } from "./entity/Movie";

export interface Route {
    method: 'get' | 'post' | 'patch' | 'delete',
    route: string,
    actions: ((req: Request, res: Response, next?: any) => void | Promise<void>)[]
}


const upload = multer({
    dest: path.resolve('uploads/'), fileFilter: function (req, file, cb) {
        if (!file) {
            cb(null, false)
        } else {
            cb(null, true);
        }
    }
}).fields([
    {
        name: 'image',
        maxCount: 1
    },

    {
        name: 'file',
        maxCount: 1
    }
])
export const Routes: Route[] = [{
    method: 'get',
    route: '/movie',
    actions: [getAllMovies]
},
{
    method: 'delete',
    route: '/movie/:id',
    actions: [isAdmin, deleteEntity(Movie)]
},
{
    method: 'get',
    route: '/genre',
    actions: [getAllGenres]
},
{
    method: 'post',
    route: '/order',
    actions: [createOrder]
},
{
    method: 'get',
    route: '/order',
    actions: [isAdmin, getAllOrders]
},
{
    method: 'patch',
    route: '/order/:id',
    actions: [isAdmin, sendOrder]
},
{
    method: 'patch',
    route: '/movie/:id',
    actions: [isAdmin, updateMovie]
},
{
    method: 'post',
    route: '/movie',
    actions: [isAdmin, upload, renameFile('image'), renameFile('file'), createMovie]
}]