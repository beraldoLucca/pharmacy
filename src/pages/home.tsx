import Link from "next/link"
import Router from "next/router";
import { Button } from "react-bootstrap";
import styles from './styles.module.scss';

function CadastrarRemedios(){
    Router.push('/medicineFile')
}

export default function Home(){
    return(
        <div>
            <Button className={styles.button} onClick={() => CadastrarRemedios()}>Cadastrar remédios</Button><br></br>
            <Button className={styles.button}>Visualizar histórico de pacientes</Button><br></br>
            <Button className={styles.button}>Dar baixa em um paciente</Button>
        </div>
    )
}