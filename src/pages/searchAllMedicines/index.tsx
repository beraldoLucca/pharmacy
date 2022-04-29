import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Button } from "react-bootstrap";
import styles from '../searchAllPatients/stylesListPatients.module.scss';
import { Link } from "react-router-dom";
import Router from 'next/router';
import { format } from 'date-fns';
import classNames from "classnames";

interface Status {
    status: string;
}

interface Medicine {
    _id: string;
    name: string;
    quantity: number;
}

export default function medicinesPage(props): JSX.Element {
    function clicar(name: string){
        const data = {name};
        try {
            axios.post("/api/medicines", data);
            alert("Medicamento atualizado com sucesso!");
            Router.push('/searchAllMedicines');
        } catch (error) {
            alert("Não foi possível atualizar o medicamento");
        }
    }

    const propsMedicines = props.medicinesList;

    const medicinesList = propsMedicines.map((prop) =>
        <tr className={styles.tr}>
            <td className={styles.td}>{prop.name}</td>
            <td className={styles.td}>{prop.quantity}</td>
            {/*<button className={styles.buttonretirado} onClick={() => clicar(prop.name)}>Atualizar</button>*/}
        </tr>
    );

    return (
        <div className={styles.divCentral}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.td}>NOME</th>
                        <th className={styles.td}>QUANTIDADE</th>
                    </tr>
                </thead>
                <tbody>
                    {medicinesList}
                </tbody>
            </table>
            <a href="/home">
                <Button className={styles.inputSubmitComeback}>Voltar</Button>
            </a>
        </div>)
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const response = await axios.get("http://localhost:3000/api/medicinesList");
    const medicinesList = response.data;
    return {
        props: { medicinesList },
    };
};
