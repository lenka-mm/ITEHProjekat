import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Genre } from "../entity/Genre";



export async function getAllGenres(req: Request, res: Response) {
  res.json(await AppDataSource.getRepository(Genre).find())
}