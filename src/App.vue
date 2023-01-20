<template>
  <div id="app">
    
    
    <div v-show="!windowData">

    <UForm />
    </div>
    <div v-show="windowData">
      <div class="row d-flex justify-content-center">
      
      <!-- <div class="col-md-3 "> <button class="btn btn-dark w-100" type="button" style="width: auto; margin: 0.5rem;" @click="submitFunction()">Check other placess </button></div>   -->
      </div>
      <LeMap /> 
    
    </div>
    <!-- <footer> {{this.$store.state.version}} </footer> -->
  </div>
</template>

<script>
import LeMap from './components/LeMap.vue'
import UForm from './components/UForm.vue'
import { mapGetters } from 'vuex'


export default {
  name: 'App',
  components: {
    LeMap,
    UForm,
    // HelloH
  }, 
  computed: mapGetters([
      'evenOrOdd','lati','long','windowData'
    ]),
    watch: {
      lati : {handler : function()  {
        this.$forceUpdate()
        
		}}},
    methods:{

      submitFunction(){
      
      this.$store.state.activeMap.isActive= false
      // console.log(this.$store.state.count)
      this.$store.state.Lat = 0
      this.$store.state.Lon = 0
      this.$store.state.locN = ''
      this.$store.state.des = ''
      },

      },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
footer{
height: 50px;
width: 100%;
position: relative;
}
</style>
