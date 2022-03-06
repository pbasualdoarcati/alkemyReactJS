//Librerias
import { Routes, Route } from 'react-router-dom'; //Swtich: depdendiendo la ruta que exista en la barra de direcciones, se cargara un componente u otro, Route: me permite definir que componente quiero cargar
import {useEffect, useState} from 'react'; // Para trabajar con estados.



//Componentes
import Header from "./components/Header";
import Login from "./components/Login";
import Listado from './components/Listado';
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";
import Resultados from './components/Resultados';
import Favoritos from './components/Favoritos';


//Estilos 
import './css/bootstrap.min.css';
import './css/app.css'

function App() {

  const [favorites, setFavorites] = useState([]);

    useEffect(()=>{
        const favInLocal = localStorage.getItem('favs');
                                                    //Voy a hacer un condicional, si favInLocal es distinto a nulo 
                                                    //es decir que tengo algo guardado en favoritos, y lo convierto en un objeto literal JSON.parse

        if (favInLocal !=null){
            const favsArray = JSON.parse(favInLocal)
            setFavorites(favsArray);
        }
    }, [])

  const addOrRemoveFromFavs = e =>{                 //Aca vamos a hacer una funcion para pasarla como propiedad 
                                                    //abajo en los routes que simplente ponemos el nombre de la funcion = y entre llaves el nombre de la funcion.
  const btn = e.currentTarget;                    //Voy a recibir el evento (e) y con esto vamos a capturar 
                                                    //el elemento que disparo ese evento onClick.
  const parent = btn.parentElement               //Para capturar el elemento que tiene el boton, 
                                                   //js da una funcion llamada parentElement, asi podemos capturar el padre que contiene al elemento que fue clicleado.
  const imgUrl = parent.querySelector('img').getAttribute('src')  //Una vez realizado esto, 
                                                                    //vamos a capturar los elementos que necesito, imgUrl y de ese el atributo src con get.Attribute. Lo mismo para el title y los elementos que necesito.

  const title = parent.querySelector('h5').innerText; //No utilizamos getAttribute sino innerText que es la propiedad
  const overview = parent.querySelector('p').innerText;

  const favMovies = localStorage.getItem('favs')    //Para levantar la información de mis favoritos
                                                    //Cuando se levante la aplicación, me interesa saber si tengo o no favoritos, si es null entonces quiero generar un array donde guardar mi objeto creado con movieData para eso creo una variable y luego el if:
  let tempMoviesInFavs;

  if (favMovies===null) {
    tempMoviesInFavs = []
  }else{                                            //Sino es null, quiero levantarla y convertirlo en un JSON.parse
    tempMoviesInFavs= JSON.parse(favMovies);
  }



    // Con esta información voy a armar un objeto literal con estas propiedades:

  const movieData = {
      imgUrl, title, overview,
      id: btn.dataset['movieId']         //dataset me da todos los atributos data
  }

  let movieIsInArray = tempMoviesInFavs.find(oneMovie =>{      //Esto me va a devolver las peliculas que tengan 
                                                               //el mismo ID que quiero guardar así no voy a duplicar el favorito. Si me devuelve UNDEFIND es porque no esta la pelicula, con esto puedo armar un if entonces que pregunte si es undefind agregar la pelicula
    return oneMovie.id === movieData.id
  });

  if (!movieIsInArray) {                                        //Si la pelicula no esta, la agrego al localStorage
  tempMoviesInFavs.push(movieData)                              //Cuando doy click, agrego el objeto al array de arriba 
                                                                //y lo guardo en el localStorage sin repetirlo
    
    localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs))
    setFavorites(tempMoviesInFavs)
    console.log('Se agrego la pelicula');
  }else{
    let moviesLeft = tempMoviesInFavs.filter(oneMovie =>{       //Si ya tengo la pelicula: Toma una pelicula y 
                                                                //retorname aquella pelicula cuyo ID sea distinto a movieData.ID, asi lo filtramos!!!
      return oneMovie.id !== movieData.id
    }); 
    localStorage.setItem('favs', JSON.stringify(moviesLeft))   //Asi agrego las peliculas que quedaron
    setFavorites(moviesLeft)
    console.log('Se elimino la pelicula');
  }

  }





  return (
    <div className="container mt-3">

      <Header favorites= {favorites}/>

      <Routes>
        <Route path="/" element= {<Login />} />
        <Route path="/listado" element= {<Listado addOrRemoveFromFavs = {addOrRemoveFromFavs} />} />
        <Route path="/detalle" element= {<Detalle />} />
        <Route path="/resultados" element= {<Resultados addOrRemoveFromFavs = {addOrRemoveFromFavs}/>} />
        <Route path="/favoritos" element= {<Favoritos favorites= {favorites} addOrRemoveFromFavs = {addOrRemoveFromFavs}/>} />
      </Routes>

      <Footer />
    </div>
  );
}

// Routes voy a traer todas las cosas que quiero renderizar, dentro voy a agregar el Route que consta de dos propiedades el PATH donde vamos a escribir cuando es que se va a cargar el componente que va en ELEMENT 
export default App;
