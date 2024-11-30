import http from "../utils/httpCommon";
import axios from "axios";

class LoginService {
  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL;
  }

  async login(coach) {
    const url = `${this.apiUrl}/login`;
    const response = await axios.post(url, coach);
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
