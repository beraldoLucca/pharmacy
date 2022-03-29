import Link from "next/link"
import { Button } from "react-bootstrap";
import styles from './styles.module.scss';

function CadastrarRemedios(props){
    console.log()
}

export default function Home(){
    return(
        <div>
            <Button className={styles.button} onClick={(props) => CadastrarRemedios(props)}>Cadastrar remédios</Button><br></br>
            <Button className={styles.button}>Visualizar histórico de pacientes</Button><br></br>
            <Button className={styles.button}>Dar baixa em um paciente</Button>
        </div>
    )
}