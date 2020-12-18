<template>
  <section class="usuario">
    <nav class="sidenav">
      <ul>
        <li>
          <router-link :to="{ name: 'usuario' }">Produtos</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'compras' }">Compras</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'vendas' }">Vendas</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'usuario-editar' }">
            Editar usuário
          </router-link>
        </li>
        <li>
          <button @click="deslogar">Logout</button>
        </li>
      </ul>
    </nav>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: "Usuario",
  methods: {
    deslogar() {
      this.$store.dispatch("deslogarUsuario");
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style scoped>
.usuario {
  display: grid;
  gap: 30px;
  grid-template-columns: minmax(140px, 200px) 1fr;
  margin: 40px auto;
  max-width: 80%;
  padding: 20px;
}

.sidenav a,
.sidenav button {
  background: #f4f7fc;
  border-radius: 4px;
  display: block;
  margin-bottom: 10px;
  padding: 10px;
}

.sidenav button {
  border: none;
  cursor: pointer;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1rem;
  text-align: left;
  width: 100%;
}

.sidenav a.router-link-exact-active,
.sidenav a:hover,
.sidenav button:hover {
  background: #87f;
  color: #fff;
}

@media screen and (max-width: 500px) {
  .usuario {
    grid-template-columns: 1fr;
    margin: 0px auto;
  }
}
</style>
