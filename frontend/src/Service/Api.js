const baseUrl = "http://localhost:8080/api";

export const getAllForm = () => {
  return fetch(baseUrl + "/forms", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const CreateForm = (payload) => {
  return fetch(baseUrl + "/create-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });
};

export const DeleteForm = (payload) => {
  return fetch(baseUrl + "/deleteform", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });
};
