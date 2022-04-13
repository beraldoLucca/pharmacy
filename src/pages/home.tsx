import { signOut, useSession } from "next-auth/react";
import Link from "next/link"
import Router from "next/router";
import { Button } from "react-bootstrap";
import Email from "./api/admin/[email]";
import styles from './styles.module.scss';
import Component from ".";

export default function Home(){

    // const { data: session } = useSession();
    
    // if(session){
        return (
        // <div>
          <div>
          <Link href="/medicineFile">
          <Button className={styles.button}>Cadastrar remédios</Button>
          </Link>
          <br></br>
          <Link href="/searchPatientRequests">
          <Button className={styles.button}>Visualizar histórico de pacientes</Button>
          </Link>
          <br></br>
          <Link href="/writeOffPatient">
          <Button className={styles.button}>Dar baixa em um paciente</Button>
          </Link>
          <br></br>
          <Link href="/">
          <Button className={styles.button} onClick={() => signOut()}>Sair</Button>
          </Link>
      </div>
    //   )}
    // //   </div>);
    //   }
    // return(
    //     <Component/>
    // )
        );
};