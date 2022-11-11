<template>
    <div class="container">
      <div class="row text-center">
        
        <button @click="runf()">yes </button>
        <p>Message is: {{ message }}</p>
        <input v-model="message" placeholder="edit me" />
        
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'helloH',
    data(){
        return {
            
            message: '',
            
        }
    },
    computed: mapGetters([
      'evenOrOdd',
    ]),
    methods:{

        runf(){
         console.log('yaaa')
          this.$store.state.count = this.message
        }
    }
   
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  