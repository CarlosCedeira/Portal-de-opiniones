import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import {
  CargarOpiniones,
  cargarOpinionesConLike,
} from "../Peticiones/Peticiones";

export const UseOpiniones = () => {
  const { token } = useContext(AuthContext);
  const [opiniones, setOpiniones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarOpiniones = async () => {
      try {
        setCargando(true);
        if (token) {
          const data = await cargarOpinionesConLike(token);
          setOpiniones(data);
          console.log("useestatedata true", data);
        } else {
          const data = await CargarOpiniones();
          setOpiniones(data);
          console.log("useestatedata false", data);
        }
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
