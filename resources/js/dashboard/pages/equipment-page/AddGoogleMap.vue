<template>
  <div>
    <div>
      <h5 class="text-center mt-3">Location</h5>

      <div class="row">
        <div class="col-md-8">
            <GmapAutocomplete ref="gmapAutocomplete" @place_changed="initMarker" class="form-control m-2"></GmapAutocomplete>
        </div>
        <div class="col-md-4 mt-2">
          <div class="input-group-prepend">
              <button
                class="btn btn-outline-primary"
                type="button"
                @click="addLocationMarker"
              >
                Search
              </button>
          </div>
        </div>
      </div>  
    </div>
    <GmapMap
        :zoom="14"    
        :center="center"
        map-type-id="terrain"
        style="width:100%;  height: 230px; margin: 7px"
      >
      <GmapMarker
        :key="index"
        v-for="(m, index) in locationMarkers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      ></GmapMarker>
    </GmapMap>
  </div>
</template>
 
<script>
import BaseComponentVue from "../../../components/base/BaseComponent.vue";

export default {
  name: "AddGoogleMap",
  extends: BaseComponentVue,

  data() {
    return {
      center: { 
        lat: 39.7837304,
        lng: -100.4458825
      },
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null,
      marker: {
          lat: "",
          lng: ""
      }
    };
  },
 
  mounted() {
    this.locateGeoLocation();
  },
 
  methods: {
    initMarker(loc) {
      this.existingPlace = loc;
    },
    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng()
        };
        this.locationMarkers.push({ position: marker });
        this.$emit('location_emitter', marker);
        this.locPlaces.push(this.existingPlace);
        this.center = marker;
        this.existingPlace = null;
      }
    },
    locateGeoLocation: function() {
      navigator.geolocation.getCurrentPosition(res => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        };
      });
    },

    setValue(lat, lng){
      const marker = {
          lat: lat,
          lng: lng
      };
      console.log(marker)
      this.locationMarkers.push({ position: marker });
      this.locPlaces.push(this.existingPlace);
      this.center = marker;
      this.existingPlace = null;
    }
  }
};
</script>
