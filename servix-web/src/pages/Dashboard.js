import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

export default function Dashboard() {
  const { usuario } = useContext(AuthContext);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const carregarServicos = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/servicos');
      const meusServicos = res.data.filter(s => s.prestadorId === usuario?.uid);
      setServicos(meusServicos);
    } catch (err) {
      setError('Erro ao carregar serviços: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCadastrar = async () => {
    if (!titulo.trim() || !descricao.trim() || !preco.trim()) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    if (isNaN(parseFloat(preco)) || parseFloat(preco) <= 0) {
      setError('Preço deve ser um valor válido maior que zero');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await api.post('/servicos', {
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        preco: parseFloat(preco),
        prestadorId: usuario?.uid || 1
      });
      setTitulo('');
      setDescricao('');
      setPreco('');
      await carregarServicos();
    } catch (err) {
      setError('Erro ao cadastrar serviço: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (usuario) carregarServicos();
  }, [usuario]);

  if (!usuario) {
    return <div style={{ padding: 20 }}>Carregando...</div>;
  }

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
      <h2>Bem-vindo, {usuario.email}</h2>

      {error && (
        <div style={{ 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          padding: 10, 
          borderRadius: 4, 
          marginBottom: 20 
        }}>
          {error}
        </div>
      )}

      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: 20, 
        borderRadius: 8, 
        marginBottom: 30 
      }}>
        <h3>Cadastrar novo serviço</h3>
        <input 
          placeholder="Título" 
          value={titulo} 
          onChange={e => setTitulo(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 10, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <textarea 
          placeholder="Descrição" 
          value={descricao} 
          onChange={e => setDescricao(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 10, borderRadius: 4, border: '1px solid #ccc', minHeight: 80 }}
        />
        <input 
          placeholder="Preço" 
          type="number" 
          step="0.01"
          value={preco} 
          onChange={e => setPreco(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 10, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <button 
          onClick={handleCadastrar}
          disabled={loading}
          style={{ 
            backgroundColor: loading ? '#ccc' : '#007AFF', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: 4, 
            cursor: loading ? 'not-allowed' : 'pointer' 
          }}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </div>

      <h3>Meus Serviços</h3>
      {loading && servicos.length === 0 ? (
        <p>Carregando serviços...</p>
      ) : servicos.length === 0 ? (
        <p>Nenhum serviço cadastrado ainda.</p>
      ) : (
        <div style={{ display: 'grid', gap: 15 }}>
          {servicos.map(serv => (
            <div key={serv.id} style={{ 
              backgroundColor: '#fff', 
              padding: 15, 
              borderRadius: 8, 
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>{serv.titulo}</h4>
              <p style={{ margin: '0 0 10px 0', color: '#666' }}>{serv.descricao}</p>
              <p style={{ margin: 0, fontWeight: 'bold', color: '#2e8b57' }}>
                R$ {parseFloat(serv.preco).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
