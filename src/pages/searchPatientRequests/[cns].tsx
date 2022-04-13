import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Button } from "react-bootstrap";
import styles from './stylesPatient.module.scss';
import { Link } from "react-router-dom";

interface Patient{
    _id: string;
    cns: string;
    name: string;
}

export default function patientPage({name}: Patient): JSX.Element{
    return (
        <div>
            <h1>Página do paciente {name}</h1>
          <a href="/searchPatientRequests">
          <Button className={styles.inputSubmitComeback}>Voltar</Button>
          </a>
        </div>)
}

export const getServerSideProps: GetServerSideProps = async(
    context: GetServerSidePropsContext
) => {
    const cns = context.query.cns as string;

    const response = await axios.get<Patient>(`http://localhost:3000/api/client/${cns}`);

    const patient = response.data;

    return{
        props: patient,
    };
};