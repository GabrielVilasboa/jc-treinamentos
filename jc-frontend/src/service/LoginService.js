import http from "../utils/http-common";
import axios from "axios";

class LoginService {
  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL;
  }

  async login(email, password) {
    const url = `${this.apiUrl}/login`;
    const response = await axios.post(url, { email, password });
    return response.data; 
  }

  async register(email, password, name) {
    const response = await http.post("/register/", { email, password, name });
    return response.data;
  }

  async getCoach() {
    const response = await http.get("/coach/");
    return response.data;
  }
}
export default new LoginService();
