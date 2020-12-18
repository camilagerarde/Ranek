import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/services/getData.js";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    logado: false,
    usuario: {
      id: "",
      email: "",
      nome: "",
      senha: "",
      rua: "",
      cep: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: ""
    },
    produtos_usuario: null
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.logado = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload);
    },
    UPDATE_PRODUTOS_USUARIO(state, payload) {
      state.produtos_usuario = payload;
    },
    ADICIONAR_PRODUTOS_USUARIO(state, payload) {
      state.produtos_usuario.unshift(payload);
    }
  },
  actions: {
    logarUsuario(context, payload) {
      return api.get(`/usuario/${payload}`).then(resp => {
        context.commit("UPDATE_USUARIO", resp.data);
        context.commit("UPDATE_LOGIN", true);
      });
    },
    criarUsuario(context, payload) {
      context.commit("UPDATE_USUARIO", { id: payload.email });
      return api.post("/usuario", payload);
    },
    deslogarUsuario(context) {
      context.commit("UPDATE_USUARIO", {
        id: "",
        email: "",
        nome: "",
        senha: "",
        rua: "",
        cep: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: ""
      });
      context.commit("UPDATE_LOGIN", false);
    },
    obterProdutosUsuario(context) {
      api.get(`/produtos?usuario_id=${context.state.usuario.id}`).then(resp => {
        context.commit("UPDATE_PRODUTOS_USUARIO", resp.data);
      });
    }
  },
  modules: {}
});
