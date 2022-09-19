import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Genre } from "../entity/Genre";
import { Movie } from "../entity/Movie";


export async function getAllMovies(req: Request, res: Response) {
  res.json(await AppDataSource.getRepository(Movie).find({
    relations: {
      genre: true
    }
  }))
}

export async function updateMovie(req: Request, res: Response) {
  const id = Number(req.params.id);
  const genre = await AppDataSource.getRepository(Genre).findOne({ where: { id: req.body.genreId } });

  const movie = await AppDataSource.getRepository(Movie).save({
    ...req.body,
    id,
    genre
  })
  res.json(movie);
}

export async function createMovie(req: Request, res: Response) {
  const genre = await AppDataSource.getRepository(Genre).findOne({ where: { id: req.body.genreId } });

  const movie = await AppDataSource.getRepository(Movie).save({
    ...req.body,
    genre
  })
  res.json(movie);
}