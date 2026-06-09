import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/auth";
import Notification from "../components/Notification";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error">("success");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showMessage = (msg: string, typeValue: "success" | "error") => {
    setMessage(msg);
    setType(typeValue);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        await register(nome, email, senha);
        showMessage("Cadastro realizado com sucesso! Faça login.", "success");
        setIsRegister(false);
      } else {
        const data = await login(email, senha);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      }
    } catch (error) {
      showMessage(
        (error as Error).message || "Erro ao enviar o formulário.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h1>{isRegister ? "Cadastrar" : "Entrar"}</h1>
        {message && <Notification message={message} type={type} />}
        {isRegister && (
          <label>
            Nome
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </label>
        )}
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Senha
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading} className="primary-button">
          {loading ? "Aguarde..." : isRegister ? "Cadastrar" : "Login"}
        </button>
        <p className="auth-switch">
          {isRegister ? "Já possui conta?" : "Não tem conta?"}
          <button type="button" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Ir para login" : "Cadastrar"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
