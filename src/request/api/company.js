import axios from "@/request/http"
import base from "@/request/base"
const manager = {
  index(params) {
    return axios.post(`${base.url}/company/pageUser`, params)
  },
  detail(id) {
    return axios.get(`${base.url}/company/getById/${id}`, {id: id})
  },
  save(params) {
    return axios.post(`${base.url}/company/save`, params)
  },
  delete(id) {
    return axios.delete(`${base.url}/company/delete/${id}`)
  }
}

const role = {
  index(params) {
    return axios.post(`${base.url}/role/pageUser`, params)
  },
  save(params) {
    return axios.post(`${base.url}/role/save`, params)
  },
  delete(id) {
    return axios.delete(`${base.url}/role/delete/${id}`)
  }
}

export default {manager, role}
