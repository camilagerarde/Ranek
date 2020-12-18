<template>
  <section class="login">
    <div>
      <h1>Login</h1>
      <form>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="login.email" />
        <label for="senha">Senha</label>
        <input type="password" name="senha" id="senha" v-model="login.senha" />
        <button class="btn" @click.prevent="verificarSenha">Logar</button>
      </form>
      <p class="esqueceu">
        Esqueceu a senha?
        <a @click="mostrarErro('Em construção :(')">Clique aqui.</a>
      </p>
      <p class="erro">{{ mensagemErro }}</p>
    </div>
    <CriarConta />
  </section>
</template>

<script>
import CriarConta from "@/components/CriarConta.vue";
import { api } from "@/services/getData.js";

export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        senha: ""
      },
      mensagemErro: null
    };
  },
  components: {
    CriarConta
  },
  methods: {
    verificarSenha() {
      api
        .get(`/usuario/${this.login.email}`)
        .then(resp => {
          if (resp.data.senha === this.login.senha) {
            this.logar();
          } else {
            this.mostrarErro("Senha não cadastrada");
          }
        })
        .catch(() => {
          this.mostrarErro("Usuário não cadastrado");
        });
    },
    logar() {
      this.$store.dispatch("logarUsuario", this.login.email);
      this.$router.push({ name: "usuario" });
    },
    mostrarErro(mensagem) {
      this.mensagemErro = mensagem;
    }
  }
};
</script>

<style scoped>
form {
  display: grid;
}

h1 {
  color: #87f;
  font-size: 2rem;
  margin-top: 40px;
  text-align: center;
}

.login {
  display: grid;
  gap: 50px;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
  max-width: 80%;
  padding: 0 20px;
}

.btn {
  margin: 0 auto;
  max-width: 300px;
  width: 100%;
}

.esqueceu {
  margin: 20px auto 0;
  text-align: center;
}

.esqueceu a {
  font-weight: bold;
}

.esqueceu a:hover {
  color: #87f;
  text-decoration: underline;
}

.erro {
  color: #e80;
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 15px;
  text-align: center;
}

@media screen and (max-width: 500px) {
  .login {
    gap: 10px;
    grid-template-columns: 1fr;
  }
}
</style>
