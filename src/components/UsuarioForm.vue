<template>
  <form>
    <div class="dadosCadastro" v-if="mostrarDados">
      <label for="nome">nome</label>
      <input type="text" id="nome" name="nome" v-model="nome" />
      <label for="email">email</label>
      <input type="email" id="email" name="email" v-model="email" />
      <label for="senha">senha</label>
      <input type="password" id="senha" name="senha" v-model="senha" />
    </div>
    <label for="cep">cep</label>
    <input
      type="text"
      id="cep"
      name="cep"
      v-model="cep"
      @keyup="preencherRua"
    />
    <label for="rua">rua</label>
    <input type="text" id="rua" name="rua" v-model="rua" />
    <label for="numero">numero</label>
    <input type="text" id="numero" name="numero" v-model="numero" />
    <label for="bairro">bairro</label>
    <input type="text" id="bairro" name="bairro" v-model="bairro" />
    <label for="cidade">cidade</label>
    <input type="text" id="cidade" name="cidade" v-model="cidade" />
    <label for="estado">estado</label>
    <input type="text" id="estado" name="estado" v-model="estado" />
    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
import { mapFields } from "@/helpers/index.js";
import { obterCep } from "@/services/getData.js";

export default {
  name: "UsuarioForm",
  computed: {
    ...mapFields({
      fields: [
        "nome",
        "email",
        "senha",
        "cep",
        "rua",
        "numero",
        "bairro",
        "cidade",
        "estado"
      ],
      base: "usuario",
      mutation: "UPDATE_USUARIO"
    }),
    mostrarDados() {
      return !this.$store.state.logado || this.$route.name === "usuario-editar";
    }
  },
  methods: {
    preencherRua() {
      const cep = this.cep.replace(/\D/g, "");
      if (cep.length === 8) {
        obterCep(cep).then(resp => {
          console.log(resp);
          this.rua = resp.data.logradouro;
          this.bairro = resp.data.bairro;
          this.cidade = resp.data.localidade;
          this.estado = resp.data.uf;
        });
      }
    }
  }
};
</script>

<style scoped>
form,
.dadosCadastro {
  align-items: center;
  display: grid;
  grid-template-columns: 80px 1fr;
}

.dadosCadastro {
  grid-column: 1/3;
}

label {
  text-transform: capitalize;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>
