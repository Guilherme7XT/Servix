import React, { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { setUsuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      setUsuario(userCredential.user);
      navigate('/dashboard');
    } catch (err) {
      alert('Erro ao logar: ' + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login Prestador</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
      <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} /><br />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
