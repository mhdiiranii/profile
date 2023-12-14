import axios from "axios";

const ApiCaller = () => {

    const AxiosRequest = axios.create({
        baseURL: "http://localhost:3004/",
      });

      const newUser = (data)=>{return AxiosRequest.post("users",data)}
      const getUser = ()=>{return AxiosRequest.get("users")}
      const edditUser = (id,data)=>{return AxiosRequest.put(`users/${id}`,data)}

    return {
        newUser,
        getUser,
        edditUser
    };
}
 
export default ApiCaller;