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
