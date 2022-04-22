import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Button } from "react-bootstrap";
import styles from './stylesPatient.module.scss';
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import classNames from "classnames";

interface Status {
    status: string;
}

interface Patient {
    _id: string;
    cns: string;
    name: string;
    cpf: string;
    age: number;
}

export default function patientPage(props): JSX.Element {
    const isRetirado = "RETIRADO";
    const propsRequest = props.patient;
    function mostrar(){
        console.log("ok")
    }
    const requestList = propsRequest.map((prop) =>
    
        <tr className={styles.tr}>
            <td className={styles.td}>{prop.cns}</td>
            <td className={styles.td}>{prop.cpf}</td>
            <td className={styles.td}>{prop.nameMedicine}</td>
            <td className={styles.td}>{format(new Date(prop.dateRequest), 'dd.MM.yyyy')}</td>
            {prop.dateWithdrawal != null && <td className={styles.td}>{format(new Date(prop.dateWithdrawal), 'dd.MM.yyyy')}</td>}   
            {prop.dateWithdrawal == null && <td className={styles.td}></td>}
            <button onClick={mostrar} className={prop.status==isRetirado ? styles.buttonretirado : styles.buttonretirar}>{prop.status}</button>
        </tr>
    );
    return (
        <div className={styles.divCentral}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.td}>CNS</th>
                        <th className={styles.td}>CPF</th>
                        <th className={styles.td}>REMÉDIO</th>
                        <th className={styles.td}>DATA DO PEDIDO</th>
                        <th className={styles.td}>DATA DE RETIRADA</th>
                        <th className={styles.td}>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {requestList}
                </tbody>
            </table>
            <a href="/writeOffPatient">
                <Button className={styles.inputSubmitComeback}>Voltar</Button>
            </a>
        </div>)
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const cns = context.query.cns as string;

    const response = await axios.get(`http://localhost:3000/api/request/${cns}`);
    const patient = response.data;
    // console.log(patient[0].cns)
    return {
        props: { patient },
    };
};