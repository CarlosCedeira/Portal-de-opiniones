import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegistroUsuario } from "../Peticiones/Peticiones";

export const Registro = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");
    console.log("informacion para la request");
    console.log(username, password, email);

    if (password !== password2)
      setError("Las contraseñas introducidas no coiciden");

    try {
      await RegistroUsuario({ username, email, password });
      navigate("/login");
    } catch (error) {
      console.log("error");
      setError(error.message);
    } finally {
      console.log("registro usuario");
      console.log(RegistroUsuario({ email, usuario, password }));
    }
  };

  return (
    <>
      <h1>Registro</h1>
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="usuario">Nombre de usuario:</label>
          <input
            type="text"
            name="usuario"
            id="usuario"
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="passsword1">Contraseña:</label>
          <input
            type="password"
            name="passsword1"
            id="passsword1"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="passsword1">Repite contraseña</label>
          <input
            type="password"
            name="passsword2"
            id="passsword2"
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </fieldset>
        <button>Registro</button>
        {error ? <p>{error}</p> : null}
      </form>
    </>
  );
};
