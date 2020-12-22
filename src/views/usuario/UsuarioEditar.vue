<template>
  <section>
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">
        Salvar alterações
      </button>
    </UsuarioForm>
    <VisualizacaoErro :erro="mensagemErro" />
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { api } from "@/services/getData.js";

export default {
  name: "UsuarioEditar",
  data() {
    return {
      mensagemErro: null
    };
  },
  components: { UsuarioForm },
  methods: {
    atualizarUsuario() {
      api
        .put(
          `/usuario/${this.$store.state.usuario.id}`,
          this.$store.state.usuario
        )
        .then(() => {
          this.$store.dispatch("logarUsuario");
        })
        .catch(() => {
          this.mensagemErro = "Ocorreu um erro na edição do usuário";
        });
    }
  },
  created() {
    document.title = "Usuário | Editar";
  }
};
</script>

<style scoped></style>
