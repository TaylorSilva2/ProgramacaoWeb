import RegistrationPanel from "./RegistrationPanel";
import Dashboard from "./Dashboard";

const Home = () => {
  return (
    <div>
      <header className="home-header">
        <h1>Mundo CRUD</h1>
        <p className="home-sub">
          Controle geográfico — continentes, países e cidades
        </p>
      </header>

      <div className="home-grid">
        <div className="home-left">
          <RegistrationPanel />
        </div>
        <div className="home-right">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Home;
