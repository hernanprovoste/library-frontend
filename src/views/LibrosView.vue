<template>
    <div class="libros-vista">
      <h1>Gestor de Biblioteca <button @click="abrirFormulario()">+ Agregar Libro</button></h1>
  
      <p v-if="cargando">Cargando...</p>
      <p v-if="error" class="error">{{ error }}</p>
  
      <table v-if="libros.length">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="libro in libros" :key="libro.id">
            <td>{{ libro.title }}</td>
            <td>{{ libro.author.name }}</td>
            <td>
              <button class="edit" @click="abrirFormulario(libro)">Editar</button>
              <button class="delete" @click="eliminarLibro(libro.id)">Borrar</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <FormularioLibro 
        v-if="mostrandoFormulario" 
        :libro="libroSeleccionado"
        @cerrar="cerrarFormulario"
        @guardado="handleGuardado"
      />
    </div>
  </template>
  
  <script>
  import apiClient from '../api';
  import FormularioLibro from '../components/FormularioLibro.vue';
  
  export default {
    components: { FormularioLibro },
    data() {
      return {
        libros: [],
        cargando: true,
        error: null,
        mostrandoFormulario: false,
        libroSeleccionado: null,
      };
    },
    mounted() {
      this.obtenerLibros();
    },
    methods: {
      async obtenerLibros() {
        this.cargando = true;
        this.error = null;
        try {
          const response = await apiClient.get('/books/');
          this.libros = response.data;
        } catch (err) {
          this.error = "Error al cargar los libros.";
          console.error(err);
        } finally {
          this.cargando = false;
        }
      },
      async eliminarLibro(id) {
        if (confirm('¿Estás seguro de que quieres borrar este libro?')) {
          try {
            await apiClient.delete(`/books/${id}`);
            this.libros = this.libros.filter(l => l.id !== id); // Actualiza la UI al instante
          } catch (error) {
            console.error("Error al eliminar el libro:", error);
            alert("Necesitas iniciar sesión para borrar libros.");
          }
        }
      },
      abrirFormulario(libro = null) {
        this.libroSeleccionado = libro;
        this.mostrandoFormulario = true;
      },
      cerrarFormulario() {
        this.mostrandoFormulario = false;
        this.libroSeleccionado = null;
      },
      handleGuardado() {
        this.cerrarFormulario();
        this.obtenerLibros(); // Recarga la lista de libros
      }
    }
  };
  </script>
  <style scoped>
    h1 button { font-size: 1rem; margin-left: 20px; cursor: pointer; }
    table { width: 80%; margin: 20px auto; border-collapse: collapse; }
    th, td { border: 1px solid #ddd; padding: 8px; }
    th { background-color: #f2f2f2; }
    .edit { background-color: #ffc107; }
    .delete { background-color: #dc3545; color: white; }
  </style>