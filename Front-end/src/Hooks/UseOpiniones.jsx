import { useEffect, useState } from "react";
import { CargarOpiniones } from "../Peticiones/Peticiones";

export const UseOpiniones = () => {
  const [opiniones, setOpiniones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarOpiniones = async () => {
      try {
        setCargando(true);

        const data = await CargarOpiniones();

        setOpiniones(data);
      } catch (error) {
        setError(error.menssage);
      } finally {
        setCargando(false);
      }
    };

    cargarOpiniones();
  }, []);

  return { opiniones, setOpiniones, cargando, error };
};
