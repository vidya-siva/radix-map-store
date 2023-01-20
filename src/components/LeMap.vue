


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
    <div v-else  id="home">
      <div class="row d-flex justify-content-center">
        <h1 v-if="showwish">{{ wish }}</h1>
        <h1 v-if="showstatus">{{ status }}</h1>
        <h1 v-if="show2">{{ show2stats }}</h1>
      <!-- <div class="col-md-3 "> <button class="btn btn-dark w-100" type="button" style="width: auto; margin: 0.5rem;" @click="submitFunction()">Check other placess </button></div>   -->
      </div>
      <div v-if="showwish" style="float: left; margin-left: 1em;text-align: left; margin-bottom: 1em;">
        <a>Heyy! </a>
    <br>
        <a>You have turned 27! As you celebrate your <b>27th birthday</b> :P , I wanted to take a moment to express how much you mean to me. Since we first met at TRI3D, you have been an important figure in my life. I remember how you were the first person I felt truly connected to in the company, and how that connection only deepened as we got to know each other better. Even though you left for Germany, our friendship never faltered and I always looked forward to catching up with you.</a>
    <br>
    <a>As I think back on our time together, I realize that you have been a constant source of support, encouragement, and positivity in my life. Your genuine nature and kind-heartedness have always been something I have admired. I'm so grateful to have you in my life and I want you to know that I will always hold a special place in my heart for you.</a>
    <br>
    <a>I wanted to get you a gift for your birthday but didn't know your address, so I thought of pinging any one of your friends to get the address but i found it - Frankengutstraße 16, 95447 Bayreuth (Germany). I chose to give you a violin. I thought it would be a special way for us to bond and I can't wait to see you play it. I hope it brings you as much joy as you have brought to me.
Ideally you should have got the violin and a card with the qrcode as a surprise but its okay. </a>
    <br>
    <a><b>I can't wait to see you when you in 10 days, I am so excited to run and come to you. </b></a>
    <br>
    <a>Once again, happy birthday bosss Muuahhhhhh. I wish you all the best in the coming year and I look forward to many more memories together.</a>
    <br>
    <a style="color:red">Muuahhhhhh :*</a>
    
    
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
        wish:'Happy Birthday Bosss!!',
        showwish:false,
        showstatus:true,
        show2:false,
        show2stats:'',
        timerCount:10
        
      };
    },
    watch: {
    //   lati : {handler : function()  {
    //     this.center = latLng(this.$store.state.Lat,this.$store.state.Lon)
    //     this.circle.center = this.center
    //     this.coordArray = [{id:1,lat:this.$store.state.Lat,long:this.$store.state.Lon ,name:'Eskişehir'}]
    //     // if(!this.coordArray.includes){
    //     //   this.coordArray.push(curCoord)
    //     // }
    //     this.$forceUpdate()
    //     this.map = this.$refs.myMap.mapObject
    //     if(this.$store.state.count == 0){
    //       this.mainfunc()
    //     }
        

        
    //     this.map.invalidateSize(false)
    //     this.$store.state.count = 4
    //     // $('div.geosearch.leaflet-bar.leaflet-control.leaflet-control-geosearch.leaflet-geosearch-bar').style.display='none'
		// }},
    // windowData : {handler : function()  {
    //     this.center = latLng(this.$store.state.Lat,this.$store.state.Lon)
    //     this.circle.center = this.center
    //     this.coordArray = [{id:1,lat:this.$store.state.Lat,long:this.$store.state.Lon ,name:'Eskişehir'}]
    //     // if(!this.coordArray.includes){
    //     //   this.coordArray.push(curCoord)
    //     // }
    //     this.$forceUpdate()
    //     this.map = this.$refs.myMap.mapObject
    //     this.map.invalidateSize(false)
    //     // this.$store.state.count = this.coordArray.length
		// }},
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
                          if (parseInt(today.getMinutes()) < 60){

                            let min = 60 - today.getMinutes() 
                            this.status = 'Now its '+ min.toString()+ 'minutes to go'
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
                      }else if (date =='2023-1-21'){
                        // this.status = 'Happy Birthday Boss'
                        // this.showstatus = false
                        this.showwish = true
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
  /* text-align: center; */
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
