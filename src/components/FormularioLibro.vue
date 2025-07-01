<template>
    <div class="form-overlay">
      <form @submit.prevent="guardarLibro" class="libro-form">
        <h3>{{ libro?.id ? 'Editar' : 'Agregar' }} Libro</h3>
        <input v-model="formData.title" placeholder="Título del libro" required>
        <input type="number" v-model.number="formData.author_id" placeholder="ID del Autor" required>
        <div class="form-actions">
          <button type="submit">Guardar</button>
          <button type="button" @click="$emit('cerrar')">Cancelar</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from '../api';
  
  export default {
    props: {
      libro: {
        type: Object,
        default: () => ({ id: null, title: '', author_id: '' })
      }
    },
    data() {
      return {
        formData: {
          title: this.libro?.title || '',
          author_id: this.libro?.author_id || '',
        }
      }
    },
    methods: {
      async guardarLibro() {
        try {
          if (this.libro?.id) {
            // Modo Edición
            await apiClient.put(`/books/${this.libro.id}`, this.formData);
          } else {
            // Modo Creación
            await apiClient.post('/books/', this.formData);
          }
          this.$emit('guardado'); // Emitimos evento para que el padre refresque la lista
        } catch (error) {
          console.error("Error al guardar el libro:", error);
          alert("Necesitas iniciar sesión para realizar esta acción.");
        }
      }
    }
  }
  </script>
  
  <style scoped>
    .form-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; }
    .libro-form { background: white; padding: 20px; border-radius: 8px; width: 400px; }
    input { display: block; width: 95%; padding: 8px; margin-bottom: 10px; }
    .form-actions { display: flex; justify-content: flex-end; gap: 10px; }
  </style>