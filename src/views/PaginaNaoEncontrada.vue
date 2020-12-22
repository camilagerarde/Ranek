<template>
  <section>
    <h1>Ops!</h1>
    <h2>Parece que essa página não existe.</h2>
    <router-link class="link" to="/">Volte para a página inicial</router-link>
  </section>
</template>

<script>
export default {
  name: "PaginaNaoEncontrada"
};
</script>

<style scoped>
section {
  color: #e80;
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin: 60px auto 0;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}

.link {
  font-size: 1.2rem;
  margin-top: 20px;
}
</style>
