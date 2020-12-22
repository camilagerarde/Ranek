<template>
  <section>
    <div v-if="compras">
      <h2>Compras</h2>
      <div class="produtos" v-for="(compra, index) in compras" :key="index">
        <ProdutoItem v-if="compra.produto" :produto="compra.produto">
          <p class="vendedor">
            <span>Vendedor:</span> {{ compra.vendedor_id }}
          </p>
        </ProdutoItem>
      </div>
    </div>
    <PaginaCarregando v-else />
  </section>
</template>

<script>
import ProdutoItem from "@/components/ProdutoItem.vue";
import { api } from "@/services/getData.js";
import { mapState } from "vuex";

export default {
  name: "UsuarioCompras",
  data() {
    return {
      compras: null
    };
  },
  components: { ProdutoItem },
  computed: {
    ...mapState(["usuario", "logado"])
  },
  methods: {
    obterCompras() {
      api.get(`/transacao?comprador_id=${this.usuario.id}`).then(resp => {
        this.compras = resp.data;
      });
    }
  },
  watch: {
    logado() {
      this.obterCompras();
    }
  },
  created() {
    if (this.logado) {
      this.obterCompras();
    }
    document.title = "Usuário | Compras";
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.produto {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80;
}
</style>
