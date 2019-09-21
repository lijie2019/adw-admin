import {
  getToken,
  setToken,
  getUser,
  setUser,
  removeToken
} from "@/utils/auth";

import { login, getUserInfo, logout } from "@/api/login";
const user = {
  state: {
    token: getToken(), //作为token的初始值
    user: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      setToken(token);
    },
    SET_USER(state, user) {
      state.user = user;
      setUser(user)
    }
  },
  actions: {
    async Login({ commit }, form) {
      const res = await login(form.username.trim(), form.password);
      await commit("SET_TOKEN", res.data.data.token);
      return res.data;
    },
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then(response => {
            console.log("response", response.data.data);
            // const respUser = response.data;
            commit("SET_USER", response.data.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 推出系统
    Logout({commit,state}){
      return new Promise((resolve,reject)=>{
        logout().then(res=>{
          const resp=res.data
          commit('SET_TOKEN','')
          commit('SET_USER',null)
          removeToken()
          resolve(resp)
        }).catch(eror=>{
          reject(error)
        })
      })
    }
  },
  getters: {}
};
export default user;
