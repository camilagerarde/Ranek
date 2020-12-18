<template>
  <ul id="paginar" v-if="totalPaginas > 1">
    <router-link :to="{ query: query(1) }">
      Início
    </router-link>
    <li v-for="(pagina, index) in paginas" :key="index">
      <router-link :to="{ query: query(pagina) }">
        {{ pagina }}
      </router-link>
    </li>
    <router-link :to="{ query: query(totalPaginas) }">
      Última
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "PaginacaoProdutos",
  props: {
    produtosTotal: {
      type: Number,
      default: 1
    },
    produtosPorPagina: {
      type: Number,
      default: 1
    }
  },
  methods: {
    query(pagina) {
      return {
        ...this.$route.query,
        _page: pagina
      };
    }
  },
  computed: {
    paginas() {
      const paginaAtual = Number(this.$route.query._page);
      const paginasVisualizar = 5;
      const paginasIntervalo = Math.ceil(paginasVisualizar / 2);
      const total = this.totalPaginas;
      const paginasArray = [];

      for (let i = 1; i <= total; i++) {
        paginasArray.push(i);
      }
      paginasArray.splice(0, paginaAtual - paginasIntervalo);
      paginasArray.splice(paginasVisualizar, total);

      return paginasArray;
    },
    totalPaginas() {
      const total = this.produtosTotal / this.produtosPorPagina;
      return total !== Infinity ? Math.ceil(total) : 0;
    }
  }
};
</script>

<style scoped>
#paginar,
a {
  display: flex;
  justify-content: center;
}

#paginar li a,
a {
  border-radius: 2px;
  padding: 2px 8px;
}

#paginar li a.router-link-exact-active,
#paginar li a:hover,
a:hover {
  background: #87f;
  color: #fff;
}
</style>
