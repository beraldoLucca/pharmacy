import styles from './styles.module.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useForm} from 'react-hook-form';
import Home from './home';
import Router from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react"
import { NextPage } from 'next';
import useSWR from 'swr';
import api from '../../utils/api';
import  ReactDOM  from 'react-dom';
import { getSession } from 'next-auth/react';

export default function Component() {  

  // const {data, error} = useSWR(`/api/admin/${session}`, api);

  // if(error){
  //   console.log(error)
  // }

  // if(data){
  //   console.log(data)
  // }
  // const { data: session } = useSession();
  // const {data, error} = useSWR(`/api/admin/${session?.user.email}`, api);
  
      
          return (
              <Home/>
          )
        
};

