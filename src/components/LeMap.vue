


<template>
  <div id="app">
    <div v-if="showthis" style="height: 1000px; width: 100%">
      
      <l-map
          @click="onCustomClick"
          @update:zoom="updateZoom"
          @update:center="updateCenter"
          :zoom="zoom"
          :center="center"
          style="height: 100%"
          ref="myMap" 
      >
        <l-tile-layer
            :url="url"
            :attribution="attribution"
        />
        <l-marker  :draggable="false" @update:latLng="onDrag"  @click="onLogMarker(item)" :lat-lng="getCoord(item.lat,item.long)" v-for="item in coordArray" :key="item.id">
          <l-popup>
            Location Name : {{ $store.state.locN }}
            <br>
            Latitude : {{ $store.state.Lat }}
            <br>
            Longitude : {{ $store.state.Lon }}
            <br>
            Description : {{ $store.state.des }}
            
          </l-popup>
        </l-marker>

      </l-map>
    </div>
    <div v-else>
      <div class="row d-flex justify-content-center">
        <h1 v-if="showwish">{{ wish }}</h1>
        <h1 v-if="showstatus">{{ status }}</h1>
        <h1 v-if="show2">{{ show2stats }}</h1>
      <!-- <div class="col-md-3 "> <button class="btn btn-dark w-100" type="button" style="width: auto; margin: 0.5rem;" @click="submitFunction()">Check other placess </button></div>   -->
      </div>
      <div v-if="showwish" >
        <a >Hey bossss! </a>
    <br>
    <a >You have turned 27! </a>
    <br>
    <a>En life la you are veryy important, You are such a sweet and an adodarable person anyone would ask for. such a genuine soul </a>
    
      </div>
    </div>
  </div>
</template>

<script>
import { latLng ,Icon} from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup} from "vue2-leaflet";
import { mapGetters } from 'vuex'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import $ from 'jquery'

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
export default {
  name: 'LeMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    // LIcon,
    // LCircle
  },
  computed: mapGetters([
      'evenOrOdd','lati','long','windowData'
    ]),
  methods:{
    getCoord(a,b){
        return latLng(a,b)
    },
    updateZoom(zoom){
      console.log('zoom',zoom)
    },
    updateCenter(center){
      console.log('center',center)
    },
    onDrag({lat,lng}){
      console.log(lat,lng)
    },
    onLogMarker(item){
    console.log('item',item)
    },
    onCustomClick(item){
      const {latlng}=item;
      console.log(latlng)
    },
    mainfunc(){
      if(this.$store.state.count == 0){

       this.map.addControl( GeoSearchControl({
            provider: new OpenStreetMapProvider(),
            style: 'bar',
            searchLabel: 'Enter', // optional: string      - default 'Enter address'
            autoComplete: true,
            
          }));
          $('div.geosearch.leaflet-bar.leaflet-control.leaflet-control-geosearch.leaflet-geosearch-bar').hide(true)
        }

      },
  },
  // mounted(){
  //   this.mainfunc()
  // },
    data() {
      return {
        zoom: 12,
        center: latLng(this.$store.state.Lat,this.$store.state.Lon),
        url: 'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=b90e089c365242a3a08dbb49a7084a61',
        attribution: 'Haritamız',
        coordArray:[{}],
        showthis:false,
        iconSize:[40,40],
        circle:{
          center: latLng(this.$store.state.Lat,this.$store.state.Lon),
          radius:1
        },
        status:'hello',
        wish:'Happy Birthday Bosssssss',
        showwish:false,
        showstatus:true,
        show2:false,
        show2stats:''
        
      };
    },
    watch: {
      lati : {handler : function()  {
        this.center = latLng(this.$store.state.Lat,this.$store.state.Lon)
        this.circle.center = this.center
        this.coordArray = [{id:1,lat:this.$store.state.Lat,long:this.$store.state.Lon ,name:'Eskişehir'}]
        // if(!this.coordArray.includes){
        //   this.coordArray.push(curCoord)
        // }
        this.$forceUpdate()
        this.map = this.$refs.myMap.mapObject
        if(this.$store.state.count == 0){
          this.mainfunc()
        }
        

        
        this.map.invalidateSize(false)
        this.$store.state.count = 4
        // $('div.geosearch.leaflet-bar.leaflet-control.leaflet-control-geosearch.leaflet-geosearch-bar').style.display='none'
		}},
    windowData : {handler : function()  {
        this.center = latLng(this.$store.state.Lat,this.$store.state.Lon)
        this.circle.center = this.center
        this.coordArray = [{id:1,lat:this.$store.state.Lat,long:this.$store.state.Lon ,name:'Eskişehir'}]
        // if(!this.coordArray.includes){
        //   this.coordArray.push(curCoord)
        // }
        this.$forceUpdate()
        this.map = this.$refs.myMap.mapObject
        this.map.invalidateSize(false)
        // this.$store.state.count = this.coordArray.length
		}},
    timerCount: {
                handler(value) {
                    console.log(value)
                    console.log(this.curdate)
                    // if (value > 0) {
                      const today = new Date();
                      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                      const dateTime = date +' '+ time;
                      console.log(dateTime)
                      if (date =='2023-1-20'){

                        if (parseInt(today.getHours())  <  23){
                          let num = 24 - today.getHours() 
                          this.status =  num.toString()+ ' more hours to go' 
                        }
                        else if (parseInt(today.getHours())  ==  '23'){
                          if (parseInt(today.getMinutes()) < 59){

                            let min = 60 - today.getMinutes() 
                            this.status = 'Wait for '+ min.toString()+ 'minutes to go'
                            this.timerCount = parseInt()
                          }else{
                            let sec = 60 - today.getSeconds()
                            if (sec > 6){
                              this.status = 'Countdown '+ sec.toString()+ 'seconds to go'
                            }else if(sec > 3 ){
                              this.status = sec.toString()
                              this.show2stats = 'And here it goes ..'
                              this.show2 = true
                            }else{
                              this.showwish = true
                            }
                          }
                        }
                      }
                      // if(this.showwish){

                      // }
                      // this.timestamp = dateTime;

                        setTimeout(() => {
                            this.timerCount--;
                            this.curdate = dateTime;
                        }, 1000);
                    // }

                },
                immediate: true // This ensures the watcher is triggered upon creation
      },

		
	}
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
.leaflet-geosearch-bar {
    position: relative;
    display: block;
    height: auto;
    width: 400px;
    max-width: calc(100% - 120px);
    margin: 10px auto 0;
    cursor: auto;
    z-index: 1000;
}
.leaflet-control-geosearch .results>* {
    line-height: 24px;
    padding: 0 8px;
    border: 1px solid transparent;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: white
}


</style>
