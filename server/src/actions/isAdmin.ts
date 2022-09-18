import { Request, Response } from "express";
import { User } from "../entity/User";

export async function isAdmin(req: Request, res: Response, next: () => void) {
    const user = (req as any).user as User;
    if (!user.admin) {
        res.sendStatus(403);
    } else {
        next();
    }

}