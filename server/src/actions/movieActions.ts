import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entity/Movie";


export async function getAllMovies(req: Request, res: Response) {
  res.json(await AppDataSource.getRepository(Movie).find({
    relations: {
      genre: true
    }
  }))
}