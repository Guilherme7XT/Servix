import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

export default function Dashboard() {
  const { usuario } = useContext(AuthContext);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [servicos, setServicos] = useState([]);

  const carregarServicos = async () => {
    const res = await api.get('/servicos');
    const meusServicos = res.data.filter(s => s.prestadorId === usuario.uid);
    setServicos(meusServicos);
  };

  const handleCadastrar = async () => {
    await api.post('/servicos', {
      titulo,
      descricao,
      preco: parseFloat(preco),
      prestadorId: usuario.uid
    });
    setTitulo('');
    setDescricao('');
    setPreco('');
    carregarServicos();
  };

  useEffect(() => {
    if (usuario) carregarServicos();
  }, [usuario]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Bem-vindo, {usuario.email}</h2>

      <h3>Cadastrar novo serviço</h3>
      <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} /><br />
      <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} /><br />
      <input placeholder="Preço" type="number" value={preco} onChange={e => setPreco(e.target.value)} /><br />
      <button onClick={handleCadastrar}>Cadastrar</button>

      <h3>Meus Serviços</h3>
      <ul>
        {servicos.map(serv => (
          <li key={serv.id}>
            {serv.titulo} - R$ {serv.preco.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
