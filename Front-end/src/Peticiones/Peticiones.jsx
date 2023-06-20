export const RegistroUsuario = async ({ username, email, password }) => {
  const response = await fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.message;
};

export const LoginUsuario = async ({ username, email, password }) => {
  const response = await fetch("http://localhost:3000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const json = await response.json();

  if (!response.ok) {
    console.log(json.message);
    throw new Error(json.message);
  }
  console.log("retorno de la peticion", json);
  return json.data;
};

export const ActualizarPerfilPeticion = async ({
  token,
  id,
  nuevoUsuario,
  nuevoCorreo,
  nuevaContraseña,
}) => {
  const response = await fetch("http://localhost:3000/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ nuevoUsuario, nuevoCorreo, nuevaContraseña, id }),
  });

  const json = await response.json();
  console.log("peticion", json.respuestaNuevoUsuario);

  if (!response.ok) {
    console.log(json.message);
    throw new Error(json.message);
  }
  return json.respuestaNuevoUsuario;
};

export const NuevaOpinion = async ({ token, titulo, texto }) => {
  const response = await fetch("http://localhost:3000/opinion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ titulo, texto }),
  });

  const json = await response.json();

  if (!response.ok) {
    console.log(json.message);
    throw new Error(json.message);
  }

  return json.data;
};

export const CargarOpiniones = async () => {
  const response = await fetch("http://localhost:3000/opinion");
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.mensage);
  }
  console.log(json.mensage);
  return json.message;
};

export const cargarOpinionesConLike = async (token) => {
  console.log("cargaropinionesconlike", token);
  const response = await fetch("http://localhost:3000/opinion/id", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const json = await response.json();
  console.log("respuesta", json.message);

  if (!response.ok) {
    console.log(json.message);
    throw new Error(json.message);
  }

  return json.message;
};

export const borrarOpiniones = async (token, eventoId) => {
  const response = await fetch("http://localhost:3000/opinion", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      idOpinion: eventoId,
    },
    body: JSON.stringify({ eventoId }),
  });

  const json = await response.json();

  if (!response.ok) {
    console.log(json.message);
    throw new Error(json.message);
  }
};

export const likeOpiniones = async ({ token, eventoId, id }) => {
  const response = await fetch("http://localhost:3000/opinion/like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ eventoId, id }),
  });

  const json = await response.json();

  if (!response.ok) {
    console.log(json.message);
    throw new Error(json.message);
  }

  return json.data;
};
