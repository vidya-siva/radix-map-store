


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
    <div  id="home">
      <div v-if="showstatus || show2" class="row d-flex justify-content-center" style="background-color:white;border-radius: 40px;">
        <!-- <h1 v-if="showwish">{{ wish }}</h1> -->
        <h1 v-if="showstatus">{{ status }}</h1>
        <h1 v-if="show2">{{ show2stats }}</h1>
      <!-- <div class="col-md-3 "> <button class="btn btn-dark w-100" type="button" style="width: auto; margin: 0.5rem;" @click="submitFunction()">Check other placess </button></div>   -->
      </div>
      

      <!-- <div v-if="showwish" style="float: left; margin-left: 1em;text-align: left; margin-bottom: 1em;" class="typing-text">
        <span>{{ text }}</span>
      </div> -->
    </div>
    <div v-if="showwish" id="card" :class="cardClass">
    <div id="card-inside">
      <div class="wrap">
        
            <p> {{ text1 }}</p>
            <p>{{ text4 }}</p>
        <p>{{ text5 }}</p>
        <p>{{ text6 }}</p>
        <p><b>{{ text7 }}</b></p>
        <p>{{ text8 }}</p>
        <p style="color:red">{{ text10 }}</p>
        
        <button id="open" @click="openPage">&gt;</button>
      </div>
    </div>
    

    <div id="card-front" >
      <div class="wrap" >
        <h1 style="padding-top:1.5em">Happy Birthday!</h1>
        <p>{{ text2 }}<b>{{ text3 }}</b></p>
      </div>
      <button id="open" @click="openCard">&gt;</button>
      <button id="close" @click="closeCard">&lt;</button>
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
  computed: {...mapGetters([
      'evenOrOdd','lati','long','windowData'
    ]),
    typedText() {
      return this.text.split("").map((char, index) => ({ char, index }));
    }
  },
  methods:{
    
    openCard() {
      this.cardClass = 'open-half'
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.cardClass = 'open-fully'
        this.timer = null
      }, 1000)
    },
    closeCard() {
      this.cardClass = 'close-half'
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.cardClass = ''
        this.timer = null
      }, 1000)
    },
    openPage() {
      this.cardClass = 'open-half'
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.cardClass = 'open-fully'
        this.timer = null
      }, 1000)
    },
    closePage() {
      this.cardClass = 'close-half'
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.cardClass = ''
        this.timer = null
      }, 1000)
    }
  ,
    
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
        timerCount:10,
        text: 'Happy Birthday Bosss!!',
        text1:"Heyy!",
        text2:"You have turned ",
        text3:"27!",
        text4:" I wanted to take a moment to express how much you mean to me. Since we first met at TRI3D, you have been an important figure in my life. I remember how you were the first person I felt truly connected to in the company, and how that connection only deepened as we got to know each other better. Even though you left for Germany, our friendship never faltered and I always looked forward to catching up with you.",
        text5:"As I think back on our time together, I realize that you have been a constant source of support, encouragement, and positivity in my life. Your genuine nature is something I have admired. I'm grateful to have you in my life and I want you to know that I will always hold a special place in my heart for you.",
        text6:"I wanted to get you a gift for your birthday but didn't know your address, so I thought of pinging any one of your friends to get the address but i found it - Frankengutstraße 16, 95447 Bayreuth (Germany). I chose to give you a violin. I can't wait to see you play it.Ideally you should have got the violin and a card with the qrcode as a surprise but its okay. ",
        text7:"I can't wait to see you in 10 days, I am so excited to run and come to you. ",
        text8:"Once again, happy birthday bosss Muuahhhhhh. I wish you all the best in the coming year, Lets be focused, I'm waiting to to see you grow and many more memories together.",
        text9:"Love,",
        text10:"Muuahhhhhh :*",
        cnt:0,
        dtext:{},
        cardClass: '',
        timer: null

        
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
                    if(!value){return}
                    
                    // console.log(this.curdate)
                    // if (value > 0) {
                      const today = new Date();
                      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                      const dateTime = date +' '+ time;
                      if (date =='2023-1-20' ){

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
                      }else if (date =='2023-1-21' && !this.showwish){
                        // this.status = 'Happy Birthday Boss'
                        this.showstatus = false
                        this.showwish = true
                        this.timerCount= 30
                        this.dtext={'text':this.text,
                        'text2':this.text2,
                        'text3':this.text3,
                        'text4':this.text4,
                        'text5':this.text5,
                        'text6':this.text6,
                        'text7':this.text7,
                        'text8':this.text8,
                        'text9':this.text9,
                        'text10':this.text10,
                      }
                        this.text = ""
                        this.text2 = ""
                        this.text3 = ""
                        this.text4 = ""
                        this.text5 = ""
                        this.text6 = ""
                        this.text7 = ""
                        this.text8 = ""
                        this.text9 = ""
                        this.text10 = ""
                        
                      }
                      if(this.showwish){

                      if(this.text.length != this.dtext['text'].length){
                        
                        this.text = this.text+this.dtext['text'].split("")[this.cnt]
                        this.cnt = this.cnt + 1
                        if(this.text.length >= this.dtext['text'].length){
                          this.cnt = 0
                        }
                      }else if(this.text2.length != this.dtext['text2'].length){
                        this.text2 = this.text2+this.dtext['text2'].split("")[this.cnt]
                        this.cnt = this.cnt + 1
                        if(this.text2.length >= this.dtext['text2'].length){
                          this.cnt = 0
                        }
                      }else if(this.text3.length != this.dtext['text3'].length){
                        this.text3 = this.text3+this.dtext['text3'].split("")[this.cnt]
                        this.cnt = this.cnt + 1
                        if(this.text3.length >= this.dtext['text3'].length){
                          this.cnt = 0
                        }
                      }else if(this.text4.length != this.dtext['text4'].length){
                        this.text4 = this.text4+this.dtext['text4'].split("")[this.cnt]
                        this.cnt = this.cnt + 1
                        if(this.text4.length >= this.dtext['text4'].length){
                          this.cnt = 0
                        }
                      }else if(this.text5.length != this.dtext['text5'].length){
                        this.text5 = this.text5+this.dtext['text5'].split("")[this.cnt]
                        this.cnt = this.cnt + 1
                        if(this.text5.length >= this.dtext['text5'].length){
                          this.cnt = 0
                        }
                      }else if(this.text6.length != this.dtext['text6'].length){
                        this.text6 = this.text6+this.dtext['text6'].split("")[this.cnt]
                        this.cnt = this.cnt + 1
                        if(this.text6.length >= this.dtext['text6'].length){
                          this.cnt = 0
                        }
                      }else if(this.text7.length != this.dtext['text7'].length){
                        this.text7 = this.text7+this.dtext['text7'].split("")[this.cnt]
                        this.cnt = this.cnt + 1
                        if(this.text7.length >= this.dtext['text7'].length){
                          this.cnt = 0
                        }
                      }else if(this.text8.length != this.dtext['text8'].length){
                        this.text8 = this.text8+this.dtext['text8'].split("")[this.cnt]
                        this.cnt = this.cnt + 1
                        if(this.text8.length >= this.dtext['text8'].length){
                          this.cnt = 0
                        }
                      }else if(this.text9.length != this.dtext['text9'].length){
                        this.text9 = this.text9+this.dtext['text9'].split("")[this.cnt]
                        this.cnt = this.cnt + 1
                        if(this.text9.length >= this.dtext['text9'].length){
                          this.cnt = 0
                        }
                      }else if(this.text10.length != this.dtext['text10'].length){
                        this.text10 = this.text10+this.dtext['text10'].split("")[this.cnt]
                        this.cnt = this.cnt + 1
                        if(this.text10.length >= this.dtext['text10'].length){
                          this.cnt = 0
                        }
                      }
                    }


                      // if(this.timerCount<20 && this.timerCount>10){


                      // }
                      // this.timestamp = dateTime;

                        setTimeout(() => {
                            this.timerCount--;
                            this.curdate = dateTime;
                        }, 20);
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
  /* margin-top: 60px; */
}

@import url(https://fonts.googleapis.com/css?family=Nobile:400italic,700italic);
@import url(https://fonts.googleapis.com/css?family=Dancing+Script);
* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
body {
  background: #E5E5E5;
  background-image: url(.././assets/5.jpg);
  padding: 50px;
}

#card-front {
  color: #FFDFDF;
}

#card, #card-front, #card-inside {
  /* height: 480px; */
  height: 48em;
}

.wrap {
    /* padding: 1.5em 2.5em; */
    height: 100%;
}
#card-front, #card-inside {
  width: 100%;
  -webkit-box-shadow: 2px 2px 30px rgba(0, 0, 0, .25), 0 0 1px rgba(0, 0, 0, .5);
  -moz-box-shadow: 2px 2px 30px rgba(0, 0, 0, .25), 0 0 1px rgba(0, 0, 0, .5);
  box-shadow: 2px 2px 30px rgba(0, 0, 0, .25), 0 0 1px rgba(0, 0, 0, .5);
  position: absolute;
  /* left: 100%; */
  /* right: 100%; */
}


#card-inside .wrap {
    background: #FFEFEF;
    -webkit-box-shadow: inset 2px 0 1px rgba(0, 0, 0, .05);
    -moz-box-shadow: inset 2px 0 1px rgba(0, 0, 0, .05);
    box-shadow: inset 2px 0 1px rgba(0, 0, 0, .05);
}
#card {
    

    max-width: 960px;
    margin: 0 auto;
    transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
    perspective: 5000px;
    -moz-perspective: 5000px;
    -webkit-perspective: 5000px;
    position: relative;
}

#card h1 {
    text-align: center;
    font-family: 'Nobile', sans-serif;
    font-style: italic;
    font-size: 70px;
    text-shadow: 
        4px 4px 0px rgba(0, 0, 0, .15),
        1px 1px 0 rgba(255, 200, 200, 255),
        2px 2px 0 rgba(255, 150, 150, 255),
        3px 3px 0 rgba(255, 125, 125, 255);
    color: #FFF;
}
#card-inside {
    font-size: 1.1em;
    line-height: 1.4;
    font-family: 'Nobile';
    color: #370247;
    font-style: italic;
    margin-bottom: 1em;
    height: 48em;
}
#card-front {
    
    margin-bottom: 1em;
    height: 48em;
}
p {
    margin-top: 1em;
    font-size: 0.8em;
}

p:first-child {
    margin-top: 0;
}

p.signed {
    margin-top: 1.5em;
    text-align: center;
    font-family: 'Dancing Script', sans-serif;
    font-size: 1.5em;
}

#card-front {
    background-color: #b12bda;
    background-image: linear-gradient(top, #b12bda 0%, #9308bd 100%);
    background-image: -moz-linear-gradient(top, #b12bda 0%, #9308bd 100%);
    background-image: -webkit-linear-gradient(top, #b12bda 0%, #9308bd 100%);
            transform-origin: left;
       -moz-transform-origin: left;
    -webkit-transform-origin: left;
            transition:         transform 1s linear;
       -moz-transition:    -moz-transform 1s linear;
    -webkit-transition: -webkit-transform 1s linear;
    position: relative;
}

#card-front .wrap {
            transition: background 1s linear;
       -moz-transition: background 1s linear;
    -webkit-transition: background 1s linear;
}

#card-front button {
  position: absolute;
  bottom: 1em;
  right: -12px;
  background: #6a0688;
  color: #FFF;
  font-family: 'Nobile', sans-serif;
  font-style: italic;
  font-weight: bold;
  font-size: 1.5em;
  padding: .5em;
  border: none;
  cursor: pointer;
          box-shadow: 2px 2px 3px rgba(0, 0, 0, .25), 0 0 1px rgba(0, 0, 0, .4);
     -moz-box-shadow: 2px 2px 3px rgba(0, 0, 0, .25), 0 0 1px rgba(0, 0, 0, .4);
  -webkit-box-shadow: 2px 2px 3px rgba(0, 0, 0, .25), 0 0 1px rgba(0, 0, 0, .4);
}

#card-front button:hover,
#card-front button:focus {
  background: #6a0688;
}

#close {
  display: none;
}

#card.open-fully #close,
#card-open-half #close {
  display: inline;
}

#card.open-fully #open {
  display: none;
}


#card.open-half #card-front,
#card.close-half #card-front {
            transform: rotateY(-90deg);
       -moz-transform: rotateY(-90deg);
    -webkit-transform: rotateY(-90deg);
}
#card.open-half #card-front .wrap {
    background-color: rgba(0, 0, 0, .5);
}

#card.open-fully #card-front,
#card.close-half #card-front {
  background: #FFEFEF;
}

#card.open-fully #card-front {
    transform: rotateY(-180deg);
    -moz-transform: rotateY(-180deg);
    -webkit-transform: rotateY(-180deg);
}

#card.open-fully #card-front .wrap {
    background-color: rgba(0, 0, 0, 0);
}

#card.open-fully #card-front .wrap *,
#card.close-half #card-front .wrap * {
   display: none;
}

footer {
  max-width: 500px;
  margin: 40px auto;
  font-family: 'Nobile', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #888;
  text-align: center;
}






</style>
