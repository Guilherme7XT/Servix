import React, { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUsuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !senha) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      setUsuario(userCredential.user);
      navigate('/dashboard');
    } catch (err) {
      setError('Erro ao fazer login: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <div style={styles.logo}>
          <h1 style={styles.logoText}>🚀 Servix</h1>
          <p style={styles.subtitle}>Sistema de Agendamento de Serviços</p>
        </div>
        
        <h2 style={styles.title}>Login Prestador</h2>
        
        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input 
            style={styles.input}
            type="email"
            placeholder="seu@email.com" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Senha</label>
          <input 
            style={styles.input}
            type="password" 
            placeholder="Sua senha" 
            value={senha} 
            onChange={e => setSenha(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <button 
          style={styles.button}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Não tem conta? <a href="#" style={styles.link}>Cadastre-se aqui</a>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
  },
  logo: {
    marginBottom: '30px'
  },
  logoText: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 8px 0'
  },
  subtitle: {
    color: '#666',
    fontSize: '14px',
    margin: '0'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    margin: '0 0 30px 0'
  },
  errorMessage: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px'
  },
  formGroup: {
    marginBottom: '20px',
    textAlign: 'left'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e1e5e9',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#007AFF',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '20px'
  },
  footer: {
    borderTop: '1px solid #e1e5e9',
    paddingTop: '20px'
  },
  footerText: {
    color: '#666',
    fontSize: '14px',
    margin: '0'
  },
  link: {
    color: '#007AFF',
    textDecoration: 'none',
    fontWeight: '500'
  }
};
