import { useContext, useState } from "react";
import { UseOpiniones } from "../Hooks/UseOpiniones";
import { AuthContext } from "../Context/AuthContext";
import {
  borrarOpiniones,
  cargarOpinionesConLike,
  likeOpiniones,
} from "../Peticiones/Peticiones";

export const Inicio = () => {
  const { opiniones, setOpiniones, cargando, error } = UseOpiniones();
  const { token, id } = useContext(AuthContext);

  if (cargando) return <p>Cargando opiniones...</p>;
  if (error) return <p>{error}</p>;

  const darLike = async (e) => {
    e.preventDefault();
    const eventoId = +e.target.id;
    console.log("id del target", eventoId);

    try {
      const opinionesConLike = await likeOpiniones({ token, eventoId, id });
      const opinionesLogin = await cargarOpinionesConLike(token);
      setOpiniones(opinionesLogin);
      console.log("token", token);
      console.log(opiniones);
    } catch (error) {
      console.log(error);
      //setError(error);
    }
  };

  const borrarOpinion = async (e) => {
    const eventoId = +e.target.id;

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
      <h2>Ultimas opiniones</h2>
      {opiniones.map((opinion) => (
        <article className="noticia" key={opinion.id}>
          <h3>{opinion.titulo}</h3>
          <p>{opinion.text}</p>
          <p>Id del usuario que creo la opinion: {opinion.user_id}</p>
          <p>user dio like: {opinion.id_usuario_like}</p>
          <p>Cantidad de likes: {opinion.cantidad_likes}</p>
          <p>Fecha de la opinion: {opinion.created_at}</p>
          <p>Usuario que relaizo la opinion: {opinion.user_name}</p>
          <p>id del usuario: {opinion.user_id}</p>
          <p> id de la opinion: {opinion.opinion_id}</p>
          <p>id guardado {id}</p>

          {token && opinion.user_id !== id ? (
            <button id={opinion.id} onClick={(e) => darLike(e)}>
              🤍
            </button>
          ) : null}
          {id === opinion.user_id ? (
            <button id={opinion.id} onClick={(e) => borrarOpinion(e)}>
              ❌
            </button>
          ) : null}
        </article>
      ))}
    </>
  );
};
