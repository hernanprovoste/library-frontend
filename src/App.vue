<template>
  <div id="app">
    <nav>
      <router-link to="/">Libros</router-link> |
      <router-link to="/login">Login</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<!-- <script>
import ListaDeLibros from './views/LibrosView.vue';

export default {
  name: 'App',
  components: {
    ListaDeLibros
  }
}
</script> -->

<style>
  /* Estilos generales y para la navegación */
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
  }
  nav {
    padding: 30px;
    background-color: #f8f9fa;
  }
  nav a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    padding: 10px;
  }
  nav a.router-link-exact-active {
    color: #42b983; /* Verde Vue */
  }
</style>
