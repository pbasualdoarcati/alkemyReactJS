import {useNavigate, Navigate} from 'react-router-dom'; //Lo vamos a usar para redireccionar por sino tiene el token
import {useEffect, useState} from 'react'; // Para poder consumir una API
import axios from "axios"; // Para poder utilizar las promesas y llamados de las APIs
import swAlert from '@sweetalert/with-react';


function Detalle(){

    const navigate = useNavigate()

    let token = sessionStorage.getItem('token');

    let query = new URLSearchParams(window.location.search); //Con esto voy a identificar el movieID de la dirección 
                                                            //URL que es traido con el search (traido todo lo que viene luego del signo de pregunta) por el query string, luego voy a utilizar query.get('movieID') en otra variable para que solo me devuelva el numero de ID de la pelicula, así puedo traer el detalle.
    
    let movieID = query.get('movieID'); //En esta variable guardo dinamicamente el ID de las peliculas que viajan en el
                                        // query string
    
    const [movie, setMovie] = useState(null); //Hacemos un useState, te retorna dos resultados, el primero es
                                                    //el valor del estado y el segundo sera una funcion que te permite modifcar o actualizar el estado, el valor inicial es un array vacio

    useEffect(() =>{
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=d343e073e5b2f3e666912551f33e6c2c&language=es-ES`;
        axios.get(endPoint)           //Hacecemos referencia al paquete que traemos Axios, 
                                      //el metodo y el End Point que queremos   consumir
        .then(response=>{
            const movieData = response.data    //Primero hacemos un .log para ver donde esta la info, 
                                               //luego la guardamos en una variable y se lo pasamos a un estado useState
            setMovie(movieData)                //Guardamos en setMoviesList (en un estado) la info de la API
        })
        .catch(err =>{
        swAlert({
                title: "Pelicula no encontrada",
                icon: "warning"
        })
        })
    }, [setMovie]);






    return (
        <>
        { !token && <Navigate to='/' />}
        { !movie && <p>Cargando...</p> }

        { movie &&                         //Realizamos este control de seguridad, sino tengo el resultado en movie, 
                                           //que no renderise lo que sigue
        <>
        <h1>{movie.title}</h1>


            <div className="row">
                <div className="col-4">
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt="Movie Poster"></img>
                </div>
                <div className="col-8">
                    <h5>Fecha de estreno: {movie.release_date}</h5>
                    <h5>Reseña:</h5>
                    <p>{movie.overview}.</p>
                    <h5>Rating: {movie.vote_average}</h5>
                    <h5>Géneros:</h5>
                    <ul>
                        {movie.genres.map(oneGenre => <li key={oneGenre.id}> {oneGenre.name} </li>)}

                    </ul>
                </div>
            </div>
        </>
        }
        </>
    )
}


export default Detalle