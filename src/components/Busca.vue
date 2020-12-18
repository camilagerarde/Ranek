<template>
  <form>
    <input
      type="text"
      name="busca"
      id="busca"
      v-model="busca"
      placeholder="Buscar"
    />
    <input
      type="submit"
      id="lupa"
      value="Buscar"
      @click.prevent="buscarProduto"
    />
  </form>
</template>

<script>
export default {
  name: "Pesquisa",
  data() {
    return {
      busca: ""
    };
  },
  methods: {
    buscarProduto() {
      this.$router.push({ query: { q: this.busca } });
    }
  }
};
</script>

<style scoped>
form {
  margin: 30px auto 60px auto;
  max-width: 600px;
  padding: 0 10px;
  position: relative;
}

#busca {
  border: none;
  padding: 20px;
  width: 100%;
}

#busca:focus,
#busca:hover {
  transform: scale(1.1);
}

#lupa {
  background: url(../assets/busca.svg) no-repeat center center;
  border: none;
  box-shadow: none;
  cursor: pointer;
  height: 62px;
  position: absolute;
  right: 0px;
  text-indent: -150px;
  top: 0px;
  width: 62px;
}
</style>
