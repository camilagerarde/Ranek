<template>
  <section>
    <h1>Compre ou Venda</h1>
    <Busca />
    <ProdutosLista />
  </section>
</template>

<script>
import Busca from "@/components/Busca.vue";
import ProdutosLista from "@/components/ProdutosLista.vue";

export default {
  name: "Home",
  components: {
    ProdutosLista,
    Busca
  },
  created() {
    document.title = "Ranek";
  }
};
</script>

<style scoped>
h1 {
  color: #87f;
  font-size: 2rem;
  margin-top: 40px;
  text-align: center;
}
</style>
