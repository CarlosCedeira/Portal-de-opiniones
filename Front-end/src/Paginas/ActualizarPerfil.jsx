import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ActualizarPerfilPeticion } from "../Peticiones/Peticiones";

export const ActualizarPerfil = () => {
  const { id, token, setUsuario, setGuardarEmail, fecha } =
    useContext(AuthContext);
  const [error, setError] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState("Nuevo usuario");
  const [nuevoCorreo, setNuevoCorreo] = useState("Nuevo correo");
  const [nuevaContraseña, setNuevaContraseña] = useState("Nueva contraseña");

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const data = await ActualizarPerfilPeticion({
        token,
        id,
        nuevoUsuario,
        nuevoCorreo,
        nuevaContraseña,
      });
      setUsuario(data.user_name);
      setNuevoCorreo(data.email);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form onSubmit={handleForm}>
      <fieldset>
        <label htmlFor="nuevo-usuario">Nuevo usuario:</label>
        <input
          type="text"
          name="nuevo-usuario"
          id="nuevo-usuario"
          placeholder={nuevoUsuario}
          required
          onChange={(e) => setNuevoUsuario(e.target.value)}
        />

        <label htmlFor="nuevo-correo">Nuevo correo:</label>
        <input
          type="email"
          name="nuevo-correo"
          id="nuevo-correo"
          placeholder={nuevoCorreo}
          required
          onChange={(e) => setNuevoCorreo(e.target.value)}
        />

        <label htmlFor="nueva-contraseña">Nueva contraseña:</label>
        <input
          type="password"
          name="nuevo-contraseña"
          id="nuevo-contraseña"
          placeholder={nuevaContraseña}
          required
          onChange={(e) => setNuevaContraseña(e.target.value)}
        />

        <button>Actualizar perfil</button>
        <p>{error ? error : null}</p>
      </fieldset>
    </form>
  );
};
