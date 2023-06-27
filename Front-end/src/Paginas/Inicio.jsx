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
      await likeOpiniones({ token, eventoId, id });
      const opinionesLogin = await cargarOpinionesConLike(token);
      setOpiniones(opinionesLogin);
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
      <h2>Playas de Galicia</h2>
      <p className="text">
        En nuestro sitio, encontrarás un espacio dedicado a explorar y compartir
        experiencias sobre diferentes playas de Galicia. Creemos en la
        importancia de la comunidad y en el poder de las opiniones personales,
        por lo que nuestro objetivo es brindarte un lugar donde puedas descubrir
        y compartir tus impresiones sobre playas de todo tipo.
      </p>
      <h2>Ultimas Opiniones</h2>
      {opiniones.map((opinion) => (
        <article className="noticia" key={opinion.id}>
          <h3>{opinion.titulo}</h3>
          <p>{opinion.text}</p>

          <p>user dio like: {opinion.id_usuario_like}</p>
          <p>Likes: {opinion.cantidad_likes}</p>
          <p>Fecha: {opinion.created_at}</p>
          <p>Opinión creada por: {opinion.user_name}</p>

          {token &&
            (!opinion.id_usuario_like ? (
              <p id={opinion.id} onClick={(e) => darLike(e)}>
                🤍
              </p>
            ) : (
              <p>❤️</p>
            ))}
          {id === opinion.user_id ? (
            <p
              className="boton-borrado"
              id={opinion.id}
              onClick={(e) => borrarOpinion(e)}
            >
              ❌
            </p>
          ) : null}
        </article>
      ))}
    </>
  );
};
