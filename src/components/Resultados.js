import {useEffect, useState} from 'react'; // Para poder consumir una API
import { Link } from 'react-router-dom'; //Componente para Links
import axios from "axios"; // Para poder utilizar las promesas y llamados de las APIs
import swAlert from '@sweetalert/with-react';


function Resultados(props){

    const [movieResults, setMovieResults] = useState([]);

    useEffect(()=>{
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=d343e073e5b2f3e666912551f33e6c2c&language=es-ES&page=1&include_adult=false&query=${keyword}`;

        axios.get(endPoint)
        .then (response =>{
            const movieArray = response.data.results
            if (movieArray.length ===0) {
                swAlert({
                    title: "Tu busqueda no arrojó resultado",
                    icon: "warning"
            })
            }
            setMovieResults(movieArray)
        })
        .catch(err =>{
            swAlert({
                title: "Pelicula no encontrada",
                icon: "warning"
        })
        })

    }, [setMovieResults])

    let query = new URLSearchParams(window.location.search); //Con esto voy a identificar el keyword de la dirección 
                                                             //URL que es traido con el search (traido todo lo que viene luego del signo de pregunta) por el query string, luego voy a utilizar query.get('keyword') en otra variable para que solo me devuelva el numero de ID de la pelicula, así puedo traer el detalle.

    let keyword = query.get('keyword');                     //En esta variable guardo dinamicamente el 
                                                            //ID de las peliculas que viajan en el query string


    //



    return (
        <>
        <h2>Buscaste: {keyword}</h2>
        {movieResults.length ===0 && <h3>No hay resultados.</h3>}
        <div className="row">
            {/* Metodo de iteración MAP para iterar un array de información. En vez de crear un nuevo array va iterar un array de información, con lo cual va a generar todas las card que necesitemos*/}

            {
                movieResults.map((oneMovie, index) =>{            //El map toma un callback, toma dos parametros, 
                                                                    //el primero es el elemento, cada elemento del array (oneMovie es un objeto) y el otro es el indice y luego hacemos que retorne el card boostrap, con esto haremos que se hagan todas las card necesarias, gracias al MAP. En oneMovie tengo el objeto que representa la pelicula y el index es el indice que le damos a la key para que represente una card inequivoca
                    return (
                        <div className="col-4" key={index}>
                        <div className="card my-4">
                            <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="Movie Poster"></img>
                            <div className="card-body">
                                <h5 className="card-title">{oneMovie.title.substring(0, 40)}...</h5>
                                <Link to={`/detalle?movieID=${oneMovie.id}`} className='btn btn-primary'>View details</Link>
                            </div>
                        </div>
                    </div>)
                    })
                }  
            </div>
        </>
    )
}

export default Resultados