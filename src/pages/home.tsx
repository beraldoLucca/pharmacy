import Link from "next/link"
import Router from "next/router";
import { Button } from "react-bootstrap";
import styles from './styles.module.scss';

export default function Home(){
    return(
        <div>
            <Link href="/medicineFile">
            <Button className={styles.button}>Cadastrar remédios</Button>
            </Link>
            <br></br>
            <Link href="/searchPatient">
            <Button className={styles.button}>Visualizar histórico de pacientes</Button>
            </Link>
            <br></br>
            <Link href="/writeOffPatient">
            <Button className={styles.button}>Dar baixa em um paciente</Button>
            </Link>
        </div>
    )
}