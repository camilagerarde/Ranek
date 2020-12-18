<template>
  <header>
    <nav>
      <router-link class="logo" to="/">
        <figure>
          <img src="@/assets/ranek.svg" alt="logo ranek" />
        </figure>
      </router-link>
      <router-link class="btn" v-if="$store.state.logado" to="/usuario">
        Olá, {{ nomeUsuario }}
      </router-link>
      <router-link class="btn" v-else to="/login"> Login </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "MainHeader",
  computed: {
    nomeUsuario() {
      return this.$store.state.usuario.nome.replace(/ .*/, "");
    }
  }
};
</script>

<style scoped>
nav {
  align-items: center;
  background: #fff;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
}

.logo {
  padding: 10px 0;
}

.logo figure img {
  width: 90px;
}
</style>
