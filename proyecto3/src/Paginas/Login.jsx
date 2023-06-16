import { useContext, useState } from "react";
import { LoginUsuario } from "../Peticiones/Peticiones";
import { AuthContext } from "../Context/AuthContext";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const { setToken, setId, setUsuario, setGuardarEmail, setFecha } =
    useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const data = await LoginUsuario({
        username,
        email,
        password,
      });
      console.log("token", data);
      setToken(data.token);
      setId(data.id);
      setUsuario(data.usuario);
      setGuardarEmail(data.email);
      setFecha(data.created_at);
      setRespuesta(data.status);
    } catch (error) {
      console.log("error", error);
      setError(error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <p>{respuesta}</p>
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="usuario">Usuario:</label>
          <input
            type="text"
            name="usuario"
            id="usuario"
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            id="contraseña"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <button>Iniciar sesion</button>
        {error ? <p>{error.message}</p> : null}
      </form>
    </>
  );
};
