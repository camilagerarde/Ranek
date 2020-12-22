<template>
  <section>
    <h2>Adicionar produtos</h2>
    <AdicionarProduto />
    <h2>Seus produtos</h2>
    <transition-group v-if="produtos_usuario" name="list" tag="ul">
      <li v-for="produto in produtos_usuario" :key="produto.id">
        <ProdutoItem :produto="produto">
          <p>{{ produto.descricao }}</p>
          <button class="remover" @click="removerProduto(produto.id)">
            Remover Produto
          </button>
        </ProdutoItem>
      </li>
    </transition-group>
    <VisualizacaoErro :erro="mensagemErro" />
  </section>
</template>

<script>
import AdicionarProduto from "@/components/AdicionarProduto.vue";
import ProdutoItem from "@/components/ProdutoItem.vue";
import { api } from "@/services/getData.js";
import { mapState, mapActions } from "vuex";

export default {
  name: "UsuarioProdutos",
  data() {
    return {
      mensagemErro: null
    };
  },
  components: {
    AdicionarProduto,
    ProdutoItem
  },
  computed: {
    ...mapState(["logado", "usuario", "produtos_usuario"])
  },
  methods: {
    ...mapActions(["obterProdutosUsuario"]),
    removerProduto(id) {
      const confirmar = window.confirm("Deseja remover este produto?");
      if (confirmar) {
        api
          .delete(`/produtos/${id}`)
          .then(() => {
            this.obterProdutosUsuario();
          })
          .catch(() => {
            this.mensagemErro = "Ocorreu um erro no cadastro do produto";
          });
      }
    }
  },
  watch: {
    logado() {
      this.obterProdutosUsuario();
    }
  },
  created() {
    if (this.logado) {
      this.obterProdutosUsuario();
    }
    document.title = "Usuário";
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.remover {
  background: url("../../assets/remover.svg") no-repeat center center;
  border: none;
  cursor: pointer;
  height: 24px;
  overflow: hidden;
  position: absolute;
  right: 0;
  text-indent: -140px;
  top: 0;
  width: 24px;
}
</style>
