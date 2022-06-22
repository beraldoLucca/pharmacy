import { useState, useCallback } from 'react';
import useSWR from 'swr';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../newRequest/stylesRequest.module.scss';
import api from '../../../utils/api';
import axios from 'axios';
import Router from "next/router";

interface Medicine {
  name: string;
  quantity: number;
}

const NewMedicinePage: NextPage = () => {
  const [textInput, setTextInput] = useState('');

  const [dados, setDados] = useState<Medicine[]>([]);

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleRegister =
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();


      const data = {
        name,
        quantity,
      };

      try {
        await axios.post("/api/medicines", data);
        alert("Medicamento cadastrado com sucesso!");
        Router.replace('/gatherMedicineAndSid');
      } catch (err) {
        alert(err.response.data.error);
      }
    };


  return (
    <div>
      <div>
        <form onSubmit={handleRegister}>
          <input className={styles.inputText}
            type="name"
            placeholder="Digite o nome do medicamento..."
            value={name}
            onChange={(e) => setName(e.target.value)} />
          <br></br>
          <input className={styles.inputText}
            type="number"
            step="1"
            placeholder="Quantidade disponível em estoque..."
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)} />
          <br></br>
          <input className={styles.inputSubmit} type="submit" value="Cadastrar" />
          <br></br>
          <Link href={"/home"}>
            <input className={styles.inputSubmit} type="submit" value="Voltar" />
          </Link>
        </form>
      </div>
    </div>
  );
};

export default NewMedicinePage;
