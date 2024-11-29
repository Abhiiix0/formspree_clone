const baseUrl = "http://localhost:8080/api";

export const getUserData = () => {
  return fetch(baseUrl + "/getuserdetails", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const UpdateUserDetails = (payload) => {
  return fetch(baseUrl + "/update-userdetails", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });
};
export const DeleteAccount = (payload) => {
  return fetch(baseUrl + "/delete-account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });
};

export const getAllForm = () => {
  return fetch(baseUrl + "/forms", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const getSingleForm = (payload) => {
  return fetch(baseUrl + "/get-single-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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
export const updateForm = (payload) => {
  return fetch(baseUrl + "/updateform", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });
};

export const getFormSUbmissions = (payload) => {
  return fetch(baseUrl + "/formdata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });
};
