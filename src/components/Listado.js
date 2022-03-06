import {useNavigate, Link, Navigate} from 'react-router-dom'; //Lo vamos a usar para redireccionar por sino tiene el token
import {useEffect, useState} from 'react'; // Para poder consumir una API
import axios from "axios"; // Para poder utilizar las promesas y llamados de las APIs
import swAlert from '@sweetalert/with-react';

function Listado(props){   //Para pasar una propiedad que definimos en el padre, ponemos props 
                           //y lo pasamos como evento en el onClick
   
    const navigate = useNavigate();
    const [movieList, setMoviesList] = useState([]); //Hacemos un useState, te retorna dos resultados, el primero es
                                                     //el valor del estado y el segundo sera una funcion que te permite modifcar o actualizar el estado, el valor inicial es un array vacio
        
    let token = sessionStorage.getItem('token'); //Para verificar lo guardado en localStorage


    useEffect (() =>{
        const endPoint='https://api.themoviedb.org/3/discover/movie?api_key=d343e073e5b2f3e666912551f33e6c2c&language=es-ES&page=1';
        axios.get(endPoint)                     //Hacecemos referencia al paquete que traemos Axios, 
                                                //el metodo y el End Point que queremos   consumir
        .then(response => {
            const apiData = response.data       //Primero hacemos un .log para ver donde esta la info, 
                                                //luego la guardamos en una variable y se lo pasamos a un estado useState
            setMoviesList(apiData.results);     // Guardamos en setMoviesList (en un estado) la info de la API
        })
        .catch(err=>{
            swAlert({
            title: "Hubo errores, intenta más tarde",
            icon: "warning"
            });
        })
    }, [setMoviesList]);



    return (
        <>
        { !token && <Navigate to='/' />}
            <div className="row">

                {/* Estructura basica */}
                {/* Metodo de iteración MAP para iterar un array de información. En vez de crear un nuevo array va iterar un array de información, con lo cual va a generar todas las card que necesitemos*/}

                {
                    movieList.map((oneMovie, index) =>{            //El map toma un callback, toma dos parametros, 
                                                                    //el primero es el elemento, cada elemento del array (oneMovie es un objeto) y el otro es el indice y luego hacemos que retorne el card boostrap, con esto haremos que se hagan todas las card necesarias, gracias al MAP. En oneMovie tengo el objeto que representa la pelicula y el index es el indice que le damos a la key para que represente una card inequivoca
                        return (<div className="col-3" key={index}>
                        <div className="card my-4">
                            <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="Movie Poster"></img>
                            <button 
                                className="favourite-btn" 
                                onClick={props.addOrRemoveFromFavs}
                                data-movie-id = {oneMovie.id}
                                > 
                            {/*Con onClick voy a lanzar la propiedad que traje del padre y con data-movie-id le asigno el movieID de la pelicula para que sea mas sencillo obtenerlo ya que lo capturo con el map de arriba */}
                                🖤</button>
                            <div className="card-body">
                                <h5 className="card-title">{oneMovie.title.substring(0, 30)}...</h5>
                                <p className="card-text">{oneMovie.overview.substring(0, 75)}...</p>
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

export default Listado