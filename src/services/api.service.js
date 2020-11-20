import axios from 'axios';

import { requestInterceptor, errorInterceptor } from './interceptors/api.interceptors';

class ApiServices {
  constructor() {
    this.api = axios.create({});

    // Permite configurar o request ANTES dele ser feito
    this.api.interceptors.request.use(requestInterceptor);

    // Permite acessar e tratar o response ou o error (se ocorrer) antes de ocorrerem
    this.api.interceptors.response.use(
      response => response,
      errorInterceptor,
    );
  }

  getAllProjects = async () => {
    const { data } = await this.api.get(`${process.env.REACT_APP_API_BASE_URL}/projects/private/list`);

    return data;
  }

  getOneProjectById = async id => {
    const { data } = await this.api.get(`${process.env.REACT_APP_API_BASE_URL}/projects/private/list/${id}`);

    return data;
  }

  deleteProjectById = async id => {
    await this.api.delete(`${process.env.REACT_APP_API_BASE_URL}/projects/private/delete/${id}`);
  }

  createProject = async data => {
    await this.api.post(`${process.env.REACT_APP_API_BASE_URL}/projects/private/create`, data);
  }

  editProjectById = async (id, data) => {
    await this.api.put(`${process.env.REACT_APP_API_BASE_URL}/projects/private/update/${id}`, data);
  }

  getOneTaskById = async (id) => {
    const { data } = await this.api.get(`${process.env.REACT_APP_API_BASE_URL}/tasks/private/list/${id}`);

    return data;
  }

  createTask = async data => {
    await this.api.post(`${process.env.REACT_APP_API_BASE_URL}/tasks/private/create`, data);
  }
}

export default new ApiServices();
