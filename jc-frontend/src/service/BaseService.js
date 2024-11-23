import http from "../utils/http-common";

class BaseService {
  constructor(resource) {
    this.resource = resource;
  }

  async findAll(params = {}) {
    const response = await http.get(`/${this.resource}`, { params });
    return response.data;
  }

  async findById(id) {
    const respose = await http.get(`/${this.resource}/${id}`);
    return respose.data;
  }

  async create(data) {
    const response = await http.post(`/${this.resource}`, data);
    return response.data;
  }

  async update(id, data) {
    const response = await http.put(`/${this.resource}/${id}`, data);
    return response.data;
  }

  async delete(id) {
    const response = await http.delete(`/${this.resource}/${id}`);
    return response.data;
  }
}

export default BaseService;