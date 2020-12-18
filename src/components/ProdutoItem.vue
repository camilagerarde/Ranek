<template>
  <section class="produto" v-if="produto">
    <router-link
      class="produto-img"
      :to="{ name: 'produto', params: { id: produto.id } }"
    >
      <figure v-if="produto.fotos">
        <img :src="produto.fotos" :alt="produto.nome" />
      </figure>
      <p>Ver Produto</p>
    </router-link>
    <div class="info">
      <p class="preco">{{ produto.preco | formataPreco }}</p>
      <h3 class="titulo">{{ produto.nome }}</h3>
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProdutoItem",
  props: ["produto"]
};
</script>

<style scoped>
.produto {
  display: grid;
  gap: 20px;
  grid-template-columns: minmax(100px, 200px) 1fr;
  margin-bottom: 40px;
  position: relative;
}

.info {
  align-self: end;
}

.produto-img {
  border-radius: 4px;
  height: 100px;
  overflow: hidden;
}

@media screen and (max-width: 500px) {
  .produto {
    gap: 10px;
    grid-template-columns: 1fr;
  }
}
</style>
