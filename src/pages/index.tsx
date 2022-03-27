import styles from './styles.module.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {api} from '../services/api'
import { useState } from 'react';
import {login, setUserRole} from '../services/auth';
import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode';
import { useForm} from 'react-hook-form';
import Router from 'next/router';

// const handleSubmit = (event) => {
//   event.preventDefault();

//   const name = event.target.email.value

//   console.log(name)

// };

export default function Login(){
  const{register, handleSubmit} = useForm();

  function handleSignIn(data){
    Router.push('/home')
    console.log(data)
  }
    
  // const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LogIn = (event:any) => {
      event.preventDefault();
      navigate('/home');
      // const data= {
      //     email : event.target.email.value,
      //     password : event.target.email.value, 
      // }
      // api.post("/user/login",data).then(response =>{
      //     if(response.data){
      //         const token = response.data
      //         const data:any = jwt(token)
      //         setUserRole(data.role)
      //         login(response.data);
              
      //     }
      // })
  }

  return (
    <div >
      <Form className={styles.pageInicial} onSubmit={handleSubmit(handleSignIn)}>
        <Form.Group className='mb-3' controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control {...register('email')} type="email" placeholder="digite seu email" name='email'/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control {...register('senha')} type="password" placeholder="digite sua senha" name='senha'/>
          <Form.Text className="text-muted">
            Nunca compartilhe sua senha com outras pessoas.
          </Form.Text>
        </Form.Group>
        <Button type="submit">
          Entrar
        </Button>
      </Form>
    </div>
  )
}
