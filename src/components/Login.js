import axios from "axios";
import swAlert from '@sweetalert/with-react';

import {useNavigate, Navigate} from 'react-router-dom'; //Una vez que guardamos guardamos el token e iniciamos sesion redireccionamos, son hooks por ende hay que guardarlos en variables


function Login() {

    const navigate = useNavigate();

    const submitHandler = e =>{
        
        //Proceso de validación de formulario

        e.preventDefault(); //Evito que la pagina se me refresque


        const email = e.target.email.value; //Guardo en una variable los datos ingresados en el input email

        const password = e.target.password.value; //Guardo en una variable los datos ingresados en el input password

        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //Expresión regular de email



        if (email === '' || password ==='') {  // Primera validación: que los campos no estén vacios
            swAlert({   //Para las alertas con sweetAlert
                title: "Los campos no pueden estar vacios",
                icon: "warning"
            });
            return;
        }

        if (email !== '' && !regexEmail.test(email)) {//Segunda validación: ingreso sea de acuerdo a una expresión regular
            swAlert({   //Para las alertas con sweetAlert
                title: "Debes escribir una dirección de correo valida",
                icon: "warning"
            });
            return;
        }
        if (email !== 'challenge@alkemy.org' || password !== 'react') { //Tercera validación: comprobación de credenciales
            swAlert({   //Para las alertas con sweetAlert
                title: "Credenciales inválidas",
                icon: "error"
            });
            return
        }

        
        //Metodo que permite hacer peticiones tipo post, me solicita en el primer dato el end point de la api y en 
        //el segundo los datos que la api espera en formato de objeto
        
        axios
        .post('http://challenge-react.alkemy.org', {email, password}) 
        .then(res => { //Aqui está la respuesta del pedido asincronico de post con axios, en una arrow function
            swAlert({
                title: "Ingreso exitoso",
                icon: "success",});
            const tokenRecibido = res.data.token;        //Nos respondera el Token y lo guardamos en una variable
            sessionStorage.setItem('token', tokenRecibido);//Recibe dos argumentos, el primero nombre de la propiedad 
                                                         //bajo la cual queremos guardar la información, y el segundo la info que queremos guardar en este momento
            navigate('/listado'); //Redirecciono una vez que valido credenciales, y defini el useState arriba.
        })


    }

    let token = sessionStorage.getItem('token');

    return(
        <>
        { token && <Navigate to='/listado' />}
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <h2>Formulario de login</h2>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label className="form-label d-block mt-2">
                        <span>Correo electrónico</span><br/>
                        <input type="text" name="email" className="form-control"/>
                    </label>
                    <br/>
                    <label className="form-label d-block mt-2">
                        <span>Contraseña</span><br/>
                        <input type="password" name="password" className="form-control"/>
                    </label>
                    <br/><br/>
                    <button type="syubmit" className="btn btn-success mt-2">Ingresar</button>
                </div>
            </form>
        </div>
        </>
    )
}
export default Login;