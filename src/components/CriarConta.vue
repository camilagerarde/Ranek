<template>
  <section>
    <h3>Crie sua conta</h3>
    <transition mode="out-in">
      <div class="novaConta" v-if="!criarConta">
        <button class="btn" @click="criarConta = true">Criar conta</button>
      </div>
      <UsuarioForm v-else>
        <button class="btn btn-form" @click.prevent="criarUsuario">
          Criar conta
        </button>
      </UsuarioForm>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";

export default {
  name: "CriarConta",
  data() {
    return {
      criarConta: false
    };
  },
  components: {
    UsuarioForm
  },
  methods: {
    async criarUsuario() {
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch(
          "logarUsuario",
          this.$store.state.usuario.email
        );
        this.$router.push({ name: "usuario" });
      } catch (error) {
        console.log(error.response);
      }
    }
  }
};
</script>

<style scoped>
.novaConta {
  margin: 0 auto;
  width: 100%;
}

h3 {
  color: #87f;
  font-size: 2rem;
  margin: 40px 0 10px;
  text-align: center;
}

.btn {
  margin: 0 auto;
  max-width: 300px;
  width: 100%;
}

.btn-form {
  max-width: 100%;
}
</style>
