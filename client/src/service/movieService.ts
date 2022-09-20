import axios from "axios";
import { Movie, MovieDTO } from "../model";
import { SERVER } from "../util";
axios.defaults.withCredentials = true;

export async function deleteMovieService(id: number) {
    await axios.delete(SERVER + '/movie/' + id);
}

export async function updateMovieService(data: MovieDTO, id: number) {
    const res = await axios.patch(SERVER + '/movie/' + id, data);
    return res.data as Movie;

}
export async function createMovieService(data: FormData) {
    const res = await axios.post(SERVER + '/movie', data, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res.data as Movie;
}