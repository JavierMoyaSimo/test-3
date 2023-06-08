import axios from "axios";

//BaseUrl to Ricky Morty api
const dataBase = "https://rickandmortyapi.com/api/character";

export const getUsers = async () => {
  let res = await axios.get(dataBase);
  
  return res.data.results;
  
};