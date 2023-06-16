import { useContext, useState } from "react";
import { UseOpiniones } from "../Hooks/UseOpiniones";
import { AuthContext } from "../Context/AuthContext";
import { borrarOpiniones } from "../Peticiones/Peticiones";

export const Inicio = () => {
  const { opiniones, setOpiniones, cargando, error } = UseOpiniones();
  const { token, id } = useContext(AuthContext);

  if (cargando) return <p>Cargando opiniones...</p>;
  if (error) return <p>{error}</p>;
  console.log(token);

  const borrarOpinion = async (e) => {
    const eventoId = +e.target.id;
    console.log(eventoId);

    const confirmarEliminidao = confirm(`¿Estas seguro de borrar la opinion?`);

    if (confirmarEliminidao) {
      const nuevasOpiniones = opiniones.filter((opinion) => {
        return opinion.id !== eventoId;
      });

      setOpiniones(nuevasOpiniones);

      await borrarOpiniones(token, eventoId);
    }
  };

  return (
    <>
      <h1>Ultimas opiniones</h1>
      {opiniones.map((opinion) => (
        <article key={opinion.id}>
          <h1>{opinion.titulo}</h1>
          <p>{opinion.text}</p>
          <p>{opinion.created_at}</p>
          <p>{opinion.user_name}</p>
          <p>{opinion.user_id}</p>
          <p>{opinion.id}</p>
          {id === opinion.user_id ? (
            <button id={opinion.id} onClick={(e) => borrarOpinion(e)}>
              Eliminar
            </button>
          ) : null}
        </article>
      ))}
    </>
  );
};
