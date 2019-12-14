import Axios from "axios";

export const AxiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return Axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(token)
    }
  });
};
