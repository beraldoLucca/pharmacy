import { useState, useCallback } from 'react';
import useSWR from 'swr';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../insertRequest/stylesRequest.module.scss';
import api from '../../../utils/api';
import axios from 'axios';

interface Patient {
  _id: string;
  cns: string;
  cpf: string;
  name: string;
  age: number;
}

const NewPatientPage: NextPage = () => {
    const [textInput, setTextInput] = useState('');

    const [dados, setDados] = useState<Patient[]>([]);

    const [id, setId] = useState('');
    const [cns, setCNS] = useState('');
    const [cpf, setCPF] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    // const { data, error } = useSWR(
    //     textInput !== '' ? `/writeOffPatient/${textInput}` : null,
    //     api
    // );
      const handleRegister =
        async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

        //   setCNS(document.getElementsByTagName('input')[0].value);
        //   setCPF(document.getElementsByTagName('input')[1].value);
        //   setNamePatient
      (document.getElementsByTagName('input')[2].value);

        const data = {
          cns,
          cpf,
          name,
          age,
          status: 'ATIVO',
        };
        try {
            await axios.post("/api/clients", data);
            alert("Paciente cadastrado com sucesso!");
            setName("");
            setQuantity("");
        } catch (error) {
            alert("Não foi possível cadastrar um novo paciente.");
        }
    };


    return (
        <div>
            <div>
                <form onSubmit={handleRegister}>
                    <input className={styles.inputText}
                        type="name"
                        placeholder="Digite o CNS do paciente..."
                        value={cns}
                        onChange={(e) => setCNS(e.target.value)}/>
                    <br></br>
                    <input className={styles.inputText}
                        type="name"
                        placeholder="Digite o CPF do paciente..."
                        value={cpf}
                        onChange={(e) => setCPF(e.target.value)}/>
                    <br></br>
                    <input className={styles.inputText}
                        type="name"
                        placeholder="Digite o nome do paciente..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                    <br></br>
                    <input className={styles.inputText}
                        type="number"
                        step="1"
                        placeholder="Digite a idade do paciente..."
                        value={age}
                        onChange={(e) => setAge(e.target.value)}/>
                    <br></br>
                    <input className={styles.inputSubmit} type="submit" value="Cadastrar" />
                    <br></br>
                    <Link href={"/home"}>
                    <input className={styles.inputSubmit} type="submit" value="Cancelar" />
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default NewPatientPage;
