import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';

//Representa os dados do formulario
type FormData = {
  cep: string;
};

type Address = {
  logradouro: string;
  localidade: string;
};

const CepSearch = () => {
  const [address, setaddress] = useState<Address>();

  const [formData, setFormData] = useState<FormData>({
    cep: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name; //permite a mudança
    const value = event.target.value;
    setFormData({ ...formData, [name]: value }); //atualiza a mudança
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //evita que o formulario seja enviado da forma padrão

    //chama o axios
    axios
      .get(`https://viacep.com.br/ws/${formData.cep}/json`)
      .then((response) => {
        setaddress(response.data); //acessa os dados
        console.log(response.data);
      })
      .catch((error) => {
        setaddress(undefined); //Não mostra o card dos valores do cep
        console.log(error);
      });
  };

  return (
    <div className="cep-search-container">
      <h1 className="text-primary">Busca CEP</h1>
      <div className="container search-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="cep"
              value={formData.cep}
              className="search-input"
              placeholder="CEP (somente números)"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Buscar
            </button>
          </div>
        </form>
        {address && ( //somente mostra o card caso o Address não esteja undefined
          <>
            <ResultCard title="Logradouro" description={address.logradouro} />
            <ResultCard title="Localidade" description={address.localidade} />
          </>
        )}
      </div>
    </div>
  );
};

export default CepSearch;
