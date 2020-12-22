<template>
  <section>
    <p class="erro">{{ erro }}</p>
  </section>
</template>

<script>
export default {
  name: "VisualizacaoErro",
  props: ["erro"]
};
</script>

<style scoped>
.erro {
  color: #e80;
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 15px;
  text-align: center;
}
</style>
