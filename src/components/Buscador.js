import {useNavigate, Navigate} from 'react-router-dom'; //Lo vamos a usar para redireccionar, 
                                                        //el useHistory no sirve mas, ahora solo es navigate('componente')
import swAlert from '@sweetalert/with-react';


function Buscador (){


    const navigate = useNavigate()


    const submitHandler = e => {                               //preventDefault, previene que se refresque la pantalla
      e.preventDefault();                                   //currentTarget busca todo lo suministrado por el formulario
        const keyword = e.currentTarget.keyword.value.trim();  // pasandole el target y luego el valor de ese target y 
                                                              // el trim eliminara los espacios anteriores y posteriores


        if (keyword.length === 0) {                            // Proceso de validación
            swAlert({
                title: "Tienes que escribir una palabra clave",
                icon: "info"
            })  
        }else if (keyword.length < 4){
            swAlert({
                title: "Tienes que escribir más de 4 caracteres",
                icon: "info"
            })  
        }else{
            e.currentTarget.keyword.value = ''         //Con esto dejo el campo del buscador vacio

            navigate(`resultados?keyword=${keyword}`)  //Esto sirve para que si escribe la cantidad de letras, 
                                                       //redirecciones al componente Resultados y en la barra de direcciónes estara escrito lo que el usuario escribio para buscar
        }
    }
    return (
        <form className="d-flex aling-items-center" onSubmit={submitHandler}>
            <label className="form-label mb-0 mx-2">
                <input type="text" name="keyword" className="form-control" placeholder="Escribe una palabra clave"/>
            </label>
            <button type="syubmit" className="btn btn-success">Buscar</button>
    </form>
    )
}

export default Buscador;