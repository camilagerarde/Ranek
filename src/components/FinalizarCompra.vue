<template>
  <section>
    <h2>Endereço de envio</h2>
    <UsuarioForm>
      <button class="btn" @click.prevent="finalizarCompra">
        Finalizar Compra
      </button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "./UsuarioForm.vue";
import { api } from "@/services/getData.js";
import { mapState } from "vuex";

export default {
  name: "FinalizarCompra",
  props: ["produto"],
  components: { UsuarioForm },
  methods: {
    criarTransacao() {
      return api.post("/transacao", this.compra).then(() => {
        this.$router.push({ name: "compras" });
      });
    },
    async criarUsuario() {
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch(
          "logarUsuario",
          this.$store.state.usuario.email
        );
        await this.criarTransacao();
      } catch (error) {
        console.log(error.response);
      }
    },
    finalizarCompra() {
      if (this.$store.state.logado) {
        this.criarTransacao();
      } else {
        this.criarUsuario();
      }
    }
  },
  computed: {
    ...mapState(["usuario"]),
    compra() {
      return {
        comprador_id: this.usuario.email,
        vendedor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: {
          cep: this.usuario.cep,
          rua: this.usuario.rua,
          numero: this.usuario.numero,
          bairro: this.usuario.bairro,
          cidade: this.usuario.cidade,
          estado: this.usuario.estado
        }
      };
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
  margin-top: 40px;
}

.btn {
  background: #e80;
}
</style>
