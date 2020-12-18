<template>
  <div id="app">
    <MainHeader />
    <main id="main">
      <transition mode="out-in">
        <router-view />
      </transition>
    </main>
    <MainFooter />
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";

export default {
  name: "App",
  components: {
    MainHeader,
    MainFooter
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  list-style: none;
  margin: 0;
  padding: 0;
}

body {
  background: url("./assets/pattern.svg") repeat top;
  color: #345;
  font-family: Arial, Helvetica, sans-serif;
}

a {
  color: #345;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
}

input,
textarea {
  border: 1px solid #fff;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  margin-bottom: 15px;
  padding: 15px;
  transition: all 0.3s;
  width: 100%;
}

input:hover,
input:focus,
text-area:hover,
text-area:focus {
  border-color: #87f;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  outline: none;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

.btn {
  background: #87f;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  color: #fff;
  cursor: pointer;
  display: block;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  padding: 10px 30px;
  text-align: center;
  transition: all 0.3s;
}

.btn:hover {
  background: #65d;
  transform: scale(1.1);
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#main {
  flex: 1;
}
</style>
