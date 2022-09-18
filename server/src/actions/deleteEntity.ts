import { Request, Response } from "express";
import { AppDataSource } from "../data-source";


export default function deleteEntity(ent: any) {
    return async function (req: Request, res: Response) {
        await AppDataSource.getRepository(ent).delete({
            id: Number(req.params.id)
        });
        res.sendStatus(204);
    }
}