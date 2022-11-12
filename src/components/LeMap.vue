


<template>
  <div id="app">
    <div style="height: 1000px; width: 100%">
      
      <l-map
          @click="onCustomClick"
          @update:zoom="updateZoom"
          @update:center="updateCenter"
          :zoom="zoom"
          :center="center"
          style="height: 100%"
          ref="myMap" 
      >
        <!-- <l-circle  :lat-lng="circle.center" fillColor="black" :fillOpacity="0.7" color="red" :radius="10"/> -->
        <l-tile-layer
            :url="url"
            :attribution="attribution"
        />
        <l-marker  :draggable="false" @update:latLng="onDrag"  @click="onLogMarker(item)" :lat-lng="getCoord(item.lat,item.long)" v-for="item in coordArray" :key="item.id">
          <!-- <l-icon :icon-url="icon" :icon-size="iconSize" /> -->
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
  </div>
</template>

<script>
import { latLng ,Icon} from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup} from "vue2-leaflet";
import markerimage from './marketimage.png'
import { mapGetters } from 'vuex'


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
    }
  },
    data() {
      return {
        zoom: 12,
        center: latLng(this.$store.state.Lat,this.$store.state.Lon),
        url: 'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=b90e089c365242a3a08dbb49a7084a61',
        attribution: 'Haritamız',
        coordArray:[{}],
        icon:markerimage,
        iconSize:[40,40],
        circle:{
          center: latLng(this.$store.state.Lat,this.$store.state.Lon),
          radius:1
        }
        
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
        this.map.invalidateSize(false)
        this.$store.state.count = this.coordArray.length
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
        this.$store.state.count = this.coordArray.length
		}}

		
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
</style>

