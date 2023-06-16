import { useState, useContext } from "react";
import { NuevaOpinion } from "../Peticiones/Peticiones";
import { AuthContext } from "../Context/AuthContext";

export const FormularioNuevaOpinion = () => {
  const [titulo, setTitulo] = useState("Titulo para la opinion");
  const [texto, setTexto] = useState("Texto para la opinion");
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const data = await NuevaOpinion({ token, titulo, texto });
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <article>
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="tituloOpinion">Titulo Opinion</label>
          <input
            type="text"
            name="tituloOpinion"
            id="tituloOpinion"
            required
            placeholder={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <label htmlFor="textoOpinion">Texto de la Opinion</label>
          <input
            type="text"
            name="textoOpinion"
            id="textoOpinion"
            required
            placeholder={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </fieldset>
        <button>Enviar opinion</button>
        {error ? <p>{error.message}</p> : null}
      </form>
    </article>
  );
};
