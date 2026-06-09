import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h2>GeoWorld</h2>
      <nav>
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/registration">Painel de Cadastro</NavLink>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        Sair
      </button>
    </aside>
  );
};

export default Sidebar;
