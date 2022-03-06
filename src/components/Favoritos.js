import {useNavigate, Link, Navigate} from 'react-router-dom'; //Lo vamos a usar para redireccionar por sino tiene el token

function Favoritos(props){
    let token = sessionStorage.getItem('token'); //Para verificar lo guardado en localStorage
    const navigate = useNavigate();
    return (
        <>
        { !token && <Navigate to='/' />}
            <h2>Sección de Favoritos</h2>
            <div className="row">
            { !props.favorites.length && <div className='col-12 text-danger'>No tenes nada en favoritos</div>}
                {/* Estructura basica */}
                {/* Metodo de iteración MAP para iterar un array de información. En vez de crear un nuevo array va iterar un array de información, con lo cual va a generar todas las card que necesitemos*/}

                {
                    props.favorites.map((oneMovie, index) =>{             //El map toma un callback, toma dos parametros, 
                                                                    //el primero es el elemento, cada elemento del array (oneMovie es un objeto) y el otro es el indice y luego hacemos que retorne el card boostrap, con esto haremos que se hagan todas las card necesarias, gracias al MAP. En oneMovie tengo el objeto que representa la pelicula y el index es el indice que le damos a la key para que represente una card inequivoca
                        return (<div className="col-3" key={index}>
                        <div className="card my-4">
                            <img src={oneMovie.imgUrl} className="card-img-top" alt="Movie Poster"></img>
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

export default Favoritos;