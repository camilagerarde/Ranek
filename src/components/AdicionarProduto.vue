<template>
  <form class="adicionar">
    <label for="nome">nome</label>
    <input type="text" name="nome" id="nome" v-model="produto.nome" />
    <label for="preco">preço (R$)</label>
    <input type="number" name="preco" id="preco" v-model="produto.preco" />
    <label for="fotos">fotos</label>
    <input disabled type="file" name="fotos" id="fotos" ref="fotos" />
    <label for="descricao">descrição</label>
    <textarea name="descricao" id="descricao" v-model="produto.descricao" />
    <input
      class="btn"
      type="button"
      value="Adicionar Produto"
      @click.prevent="adicionarProduto"
    />
  </form>
</template>

<script>
import { api } from "@/services/getData.js";

export default {
  name: "AdicionarProduto",
  data() {
    return {
      produto: {
        nome: "",
        preco: "",
        descricao: "",
        fotos: null,
        vendido: "false"
      }
    };
  },
  methods: {
    formatarProduto() {
      this.produto.usuario_id = this.$store.state.usuario.id;
    },
    async adicionarProduto(event) {
      this.formatarProduto();
      const button = event.currentTarget;
      button.value = "Adicionando...";
      button.setAttribute("disabled", "");
      await api.post("/produtos", this.produto);
      await this.$store.dispatch("obterProdutosUsuario");
      button.removeAttribute("disabled");
      button.value = "Adicionar Produto";
    }
  }
};
</script>

<style scoped>
.adicionar {
  align-items: center;
  display: grid;
  grid-template-columns: 100px 1fr;
  margin-bottom: 60px;
  text-transform: capitalize;
}

.btn {
  grid-column: 2;
}
</style>
