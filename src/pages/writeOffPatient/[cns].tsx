import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Button } from "react-bootstrap";
import styles from './stylesPatient.module.scss';
import { Link } from "react-router-dom";

interface Status{
    status: string;
}

interface Patient {
    _id: string;
    cns: string;
    name: string;
    cpf: string;
    age: number;
}

export default function patientPage({ name, cpf, cns, age }: Patient): JSX.Element {
    return (
        <div className={styles.divCentral}>
            <table className={styles.table}>
                <tr className={styles.tr}>
                    <th className={styles.td}>Nome</th>
                    <th className={styles.td}>CPF</th>
                    <th className={styles.td}>CNS</th>
                    <th className={styles.td}>Idade</th>
                </tr>
                <tr className={styles.tr}>
                    <td className={styles.td}>{name}</td>
                    <td className={styles.td}>{cpf}</td>
                    <td className={styles.td}>{cns}</td>
                    <td className={styles.td}>{age}</td>
                </tr>
                
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

    const response = await axios.get<Patient>(`http://localhost:3000/api/client/${cns}`);

    const patient = response.data;

    return {
        props: patient,
    };
};