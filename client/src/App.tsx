import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import './App.css';
import Navbar from './components/Navbar';
import useFetch from './hooks/useFetch';
import { Genre, Movie, MovieDTO, OrderItem, User } from './model';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import MovieShowPage from './pages/MovieShowPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import MoviesPage from './pages/MoviesPage';
import RegisterPage from './pages/RegisterPage';
import { createMovieService, deleteMovieService, updateMovieService } from './service/movieService';
import { createOrderService } from './service/orderService';
import { checkUser, loginUser, logoutUser, registerUser } from './service/userService';
import axios from 'axios';

const token = localStorage.getItem('token');
if (token) {

  axios.defaults.headers.common.authorization = 'Bearer ' + token;
}

function App() {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [movies, setMovies] = useFetch<Movie>('/movie')
  const [genres] = useFetch<Genre>('/genre')
  const [items, setItems] = useState<OrderItem[]>([])


  const login = (username: string, password: string) => {
    loginUser(username, password).then(() => {
      window.location.reload();
    })
  }
  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    await registerUser(firstName, lastName, email, password);
    window.location.reload();
  }
  const logout = async () => {
    await logoutUser();
    return setUser(undefined);
  }
  const removeItem = (id: number) => {
    setItems(prev => {
      return prev.filter(e => e.movie.id !== id)
    })
  }
  const addToOrder = (id: number, amount = 1) => {

    const movie = movies.find(e => e.id === id);

    if (!movie) {
      return;
    }

    setItems(prev => {
      if (prev.find(e => e.movie.id === id)) {
        return prev.map(element => {
          if (element.movie.id === id) {
            return {
              ...element, amount: element.amount + amount
            }
          }
          return element;
        })
      }
      return [...prev, {
        movie: movie!,
        amount,
        price: movie.price
      }]

    })
  }
  const changeItem = (item: OrderItem, amount: number) => {

    setItems(prev => {
      return prev.map(element => {
        if (element === item) {
          return { ...element, amount }
        }
        return element;
      })
    })
  }
  const orderUp = async (phone: string, address: string) => {
    if (!user) {
      return;
    }
    return createOrderService({
      address,
      phone,
      items,
      sent: false,
      user
    }).then(() => {
      setItems([]);
    })
  }


  const deleteMovie = async (id: number) => {
    if (id === 0) {
      return;
    }
    await deleteMovieService(id);
    setMovies(prev => {
      return prev.filter(e => e.id !== id);
    })
  }
  const updateMovie = async (data: MovieDTO, id: number) => {
    const movie = await updateMovieService(data, id);
    setMovies(prev => {
      return prev.map(element => {
        if (element.id === id) {
          return movie;
        }
        return element;

      })
    })
  }
  const createMovie = async (data: FormData) => {
    const movie = await createMovieService(data);
    setMovies(prev => {
      return [...prev, movie];
    })
  }
  useEffect(() => {
    checkUser().then(setUser).catch(() => {

    });
  }, [])

  return (
    <BrowserRouter>
      <Navbar user={user} logout={logout} />

      {
        user ? (

          <Switch>
            <Route path='/movie/:id'>
              <MovieShowPage addToOrder={addToOrder} getMovie={id => {
                return movies.find(elem => elem.id === id)
              }} />
            </Route>
            <Route path='/movie'>
              <MoviesPage genres={genres} movies={movies} />
            </Route>
            {
              user.admin && (
                <Route path='/dashboard'>
                  <Dashboard create={createMovie} update={updateMovie} delete={deleteMovie} genres={genres} movies={movies} />
                </Route>
              )
            }
            <Route path='/cart'>
              <CartPage orderUp={orderUp} changeItem={changeItem} removeItem={removeItem} items={items} />
            </Route>
            <Route path='/'>
              <HomePage movies={movies.slice(0, 3)} />
            </Route>
          </Switch>

        ) : (
          <Grid columns='16'>
            <Grid.Row centered className='loginRed'>
              <Grid.Column className='loginSlika' width='9'>

              </Grid.Column>
              <Grid.Column width='6'>
                <Switch>
                  <Route path='/register'>
                    <RegisterPage onSubmit={register} />
                  </Route>
                  <Route path='/'>
                    <LoginPage onSubmit={login} />
                  </Route>
                </Switch>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
      }
    </BrowserRouter>
  );
}

export default App;
