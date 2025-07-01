<template>
    <div class="login-container">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" v-model="password" required>
        </div>
        <button type="submit">Ingresar</button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from '../api';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async handleLogin() {
        this.error = null;
        try {
          // FastAPI espera los datos del login como 'form-data', no como JSON.
          const params = new URLSearchParams();
          params.append('username', this.email);
          params.append('password', this.password);
  
          const response = await apiClient.post('/token', params, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
  
          // Guardamos el token en localStorage
          localStorage.setItem('accessToken', response.data.access_token);
  
          // Redirigimos al usuario a la lista de libros
          this.$router.push('/');
  
        } catch (err) {
          this.error = 'Email o contraseña incorrectos.';
          console.error(err);
        }
      },
    },
  };
  </script>
  
  <style scoped>
    .login-container { max-width: 400px; margin: 50px auto; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    .form-group { margin-bottom: 20px; text-align: left; }
    label { display: block; margin-bottom: 5px; }
    input { width: 100%; padding: 8px; box-sizing: border-box; }
    button { width: 100%; padding: 10px; background-color: #42b983; color: white; border: none; cursor: pointer; }
    .error-message { color: red; }
  </style>