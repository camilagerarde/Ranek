<template>
  <section>
    <div v-if="vendas">
      <h2>Vendas</h2>
      <div class="produtos" v-for="(venda, index) in vendas" :key="index">
        <ProdutoItem v-if="venda.produto" :produto="venda.produto">
          <p class="vendedor">
            <span>Comprador:</span> {{ venda.comprador_id }}
          </p>
        </ProdutoItem>
        <div class="entrega">
          <h3>Entrega:</h3>
          <ul v-if="venda.endereco">
            <li v-for="(value, key) in venda.endereco" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <PaginaCarregando v-else />
  </section>
</template>

<script>
import ProdutoItem from "@/components/ProdutoItem.vue";
import { api } from "@/services/getData.js";
import { mapState } from "vuex";

export default {
  name: "UsuarioVendas",
  data() {
    return {
      vendas: null
    };
  },
  components: { ProdutoItem },
  computed: {
    ...mapState(["usuario", "logado"])
  },
  methods: {
    obtervendas() {
      api.get(`/transacao?vendedor_id=${this.usuario.id}`).then(resp => {
        this.vendas = resp.data;
      });
    }
  },
  watch: {
    logado() {
      this.obtervendas();
    }
  },
  created() {
    if (this.logado) {
      this.obtervendas();
    }
    document.title = "Usuário | Vendas";
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

h3 {
  justify-self: end;
  margin: 0;
}

.produto {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80;
}

.entrega {
  display: grid;
  gap: 20px;
  grid-template-columns: minmax(100px, 200px) 1fr;
  margin-bottom: 60px;
}

.entrega ul {
  text-transform: capitalize;
}

@media screen and (max-width: 500px) {
  h3 {
    justify-self: start;
  }
  .entrega {
    gap: 10px;
    grid-template-columns: 1fr;
  }
}
</style>
