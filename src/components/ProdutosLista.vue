<template>
  <section class="produtos-container">
    <transition mode="out-in">
      <div
        class="sem-resultado"
        v-if="produtos && produtos.length === 0"
        key="sem-resultados"
      >
        <h4>A busca não retornou resultados :(</h4>
      </div>
      <div class="produtos" v-else-if="produtos" key="produtos">
        <ul>
          <li class="produto" v-for="(produto, index) in produtos" :key="index">
            <router-link :to="{ name: 'produto', params: { id: produto.id } }">
              <figure class="foto">
                <img
                  v-if="produto.fotos"
                  :src="produto.fotos"
                  :alt="produto.nome"
                />
              </figure>
              <p class="preco">{{ produto.preco | formataPreco }}</p>
              <h2 class="nome">{{ produto.nome }}</h2>
              <p>{{ produto.descricao }}</p>
            </router-link>
          </li>
        </ul>
        <PaginacaoProdutos
          :produtosTotal="produtosTotal"
          :produtosPorPagina="produtosPorPagina"
        />
      </div>
      <PaginaCarregando v-else key="carregando" />
    </transition>
  </section>
</template>

<script>
import { api } from "@/services/getData.js";
import { serialize } from "@/helpers/index.js";
import PaginacaoProdutos from "@/components/PaginacaoProdutos.vue";
export default {
  name: "ProdutosLista",
  data() {
    return {
      produtos: null,
      produtosPorPagina: 6,
      produtosTotal: 0
    };
  },
  components: {
    PaginacaoProdutos
  },
  computed: {
    url() {
      const query = serialize(this.$route.query);
      return `/produtos?_limit=${this.produtosPorPagina}${query}`;
    }
  },
  methods: {
    obterProdutos() {
      this.produtos = null;
      api.get(this.url).then(resp => {
        this.produtosTotal = Number(resp.headers["x-total-count"]);
        this.produtos = resp.data;
      });
    }
  },
  watch: {
    url() {
      this.obterProdutos();
    }
  },
  created() {
    this.obterProdutos();
  }
};
</script>

<style scoped>
.produtos-container {
  margin: 0 auto;
  max-width: 1000px;
}

.produtos ul {
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(3, 1fr);
  margin: 30px;
}

.produto {
  background: #fff;
  border-radius: 4 px;
  box-shadow: 0 4px 3px rgba(30, 60, 90, 0.1);
  padding: 10px;
  transition: all 0.2s;
}

.produto:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  position: relative;
  transform: scale(1.1);
  z-index: 1;
}

.foto img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.nome {
  margin-bottom: 10px;
}

.preco {
  color: #e80;
  font-weight: bold;
}

.sem-resultado {
  color: #e80;
  font-size: 1.2rem;
  text-align: center;
}

@media screen and (max-width: 500px) {
  .produtos ul {
    gap: 10px;
    grid-template-columns: 1fr;
    margin: 10px;
  }
}
</style>
