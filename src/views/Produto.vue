<template>
  <section>
    <div class="produto" v-if="produto">
      <ul class="fotos" v-if="produto.fotos">
        <li>
          <img :src="produto.fotos" :alt="produto.nome" />
        </li>
      </ul>
      <div class="info">
        <h1>{{ produto.nome }}</h1>
        <p class="preco">{{ produto.preco | formataPreco }}</p>
        <p class="descricao">{{ produto.descricao }}</p>
        <transition mode="out-in" v-if="produto.vendido === 'false'">
          <button class="btn" v-if="!finalizar" @click="finalizar = true">
            Comprar
          </button>
          <FinalizarCompra v-else :produto="produto" />
        </transition>
        <button class="btn" v-else disabled>Produto indisponível</button>
      </div>
    </div>
    <PaginaCarregando v-else />
  </section>
</template>

<script>
import { api } from "@/services/getData.js";
import FinalizarCompra from "@/components/FinalizarCompra.vue";

export default {
  name: "Produto",
  data() {
    return {
      produto: null,
      finalizar: false
    };
  },
  components: { FinalizarCompra },
  props: ["id"],
  methods: {
    obterProduto() {
      api.get(`/produtos/${this.id}`).then(resp => {
        this.produto = resp.data;
      });
    }
  },
  created() {
    this.obterProduto();
  }
};
</script>

<style scoped>
.produto {
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
  max-width: 80%;
  padding: 60px 20px;
}

.preco {
  color: #e80;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 40px;
}

.descricao {
  font-size: 1.2rem;
}

.btn {
  margin-top: 60px;
  width: 200px;
}

.fotos {
  max-width: 70%;
}

@media screen and (max-width: 500px) {
  .produtos {
    gap: 10px;
    grid-template-columns: 1fr;
  }
  .fotos {
    grid-row: 2;
  }
}
</style>
