<!-- <template>
  <div class="hello">
    
  </div>
</template>

<script>
export default {
  name: 'LMap',
  props: {
    
  }
}
</script>

<style scoped>

</style> -->


<template>
    <div class="hello">
      <div class="container mt-5">
        <div class="row d-flex justify-content-center">
          <div class="col-md-7">
            <div class="card px-5 py-4" id="form1">
                <div class="form-data" >
                  <div class="text-center mb-4">
                        <h4>Fill in the form Now</h4>
                  </div>
                  <!-- <p>Location Name : </p> -->
                  <div class="forms-inputs mb-4"> <span>Location Name :</span><input v-model="locName" placeholder="Location" v-bind:class="{'form-control':true}"/>
                  </div>
                  <div class="forms-inputs mb-4"><span>Description : </span>
                    <textarea v-model="description" v-bind:class="{'form-control':true}" placeholder="Description"></textarea>
                  </div>
                  <div class="forms-inputs mb-4"><span>Latitude : </span>
                  <!-- <input v-model="Latitude" placeholder="Latitude" /> -->
                  <input class="form-control" type="number" v-model.number="LatitudeValue" placeholder="Latitude"/>
                </div>
                  
                  <div class="forms-inputs mb-4"><span>Longitude : </span>
                  <!-- <input v-model="Longitude" placeholder="Longitude" /> -->
                  <input class="form-control" type="number" v-model.number="LongitudeValue" placeholder="Longitude"/>
                </div>
                  <div class="mb-3"> <button class="btn btn-dark w-100" type="button" style="width: auto; margin: 0.5rem;" @click="submitFunction()">Submit </button></div>
                </div>
              </div>
            </div>
          </div>


        </div>
    </div>


  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'LeafletMap',
    props: {
      Lat: String,
      Lon: String
    },
    computed:{

     ...mapGetters([
      'evenOrOdd',
    ]),
    LongitudeValue: {
      get: function () {
        return this.Longitude.toFixed(2);
      },
      set: function (newValue) {
        this.Longitude = newValue;
      },
    },
    LatitudeValue: {
      get: function () {
        return this.Latitude.toFixed(2);
      },
      set: function (newValue) {
        this.Latitude = newValue;
      },
    },
    
    },
    methods:{

      submitFunction(){
      console.log('yaaa')
      this.$store.state.Lat = this.Latitude
      this.$store.state.Lon = this.Longitude
      this.$store.state.locN = this.locName
      this.$store.state.des = this.description
      this.$store.state.activeMap.isActive= true


    },
    
    },
    data() {
      return {
        msg:'s',
        Longitude:0,
        Latitude:0,
        locName:'',
        description:'',
        

      };
    },
    watch: {
    // `visible(value) => this.isVisible = value` could work too
    Lat() {
      this.Latitude = this.$props.Lat
    },
    Lon() {
      this.Longitude = this.$props.Longitude
    },
  }
  }
  </script>
  
  <style scoped>
  h1 {
    margin: 40px 0 0;
  }
  
  .card{border: none;height: 100%}
  .forms-inputs{position: relative}
  .forms-inputs span{position: absolute;top:-18px;left: 10px;background-color: #fff;padding: 5px 10px;font-size: 14px}
  .forms-inputs input{height: 50px;}
  .forms-inputs input:focus{box-shadow: none;outline: none;border: 2px solid #000}
  .btn{height: 50px}
  .success-data{display: flex;flex-direction: column}
  .bxs-badge-check{font-size: 90px}
  
  </style>
  