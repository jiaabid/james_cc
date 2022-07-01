<template>
  <div class="accordion" id="accordionExample">
    <div class="spinner-border" role="status" v-if="loading">
      <span class="sr-only"></span>
    </div>
    <div class="px-4 py-4" v-if="units.length == 0 && !loading">
      <h2>No Unit Found!</h2>
    </div>
    <div v-if="units.length > 0 && units[0].id">
    <div
      class="accordion-item"
      v-for="singleUnit in units"
      :key="'unit'+singleUnit.id"
    >
      <!-- Unit section header info -->
      <h2 class="accordion-header" id="headingOne" >
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapseOne' + singleUnit.id"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          <div class="row tb-box" style="justify-content:normal; font-weight:300">
            <div class="col-md-4">
              <h3 class="title">  <span class="tile-icon icon-home"></span> {{ singleUnit.name }}</h3>
            </div>
            <div class="col-md-8" v-if="singleUnit.unit_meter.length > 0">
              <div
                class="row mb-2"
                v-for="sMeter in singleUnit.unit_meter.filter(x=>x.id != null)"
                :key="'meter'+sMeter.id"
              >
                <div class="col-md-4">
                  <div class="warning" v-if="sMeter.meter_read">
                     <span
                      class="icon-water"
                      :style="[
                        sMeter.meter_id == 1
                          ? { color: 'rgb(227, 81, 95)' }
                          : sMeter.meter_id == 2
                          ? { color: 'rgb(62, 137, 191)' }
                          : { color: 'rgb(169,169,169)' },
                      ]"
                    ></span>
                    <span  class="small-font">{{ sMeter.meter_read.meter_reading }}</span>
                  </div>
                </div>
                <div class="col-md-5">
                  <div
                    :title="sMeter.device_serial_number"
                    class="home"
                    v-if="sMeter.device_serial_number"
                    style="overflow: hidden"
                  >
                    <span class="mr-1 icon-barcode ng-star-inserted"></span>
                  
                    <span class="small-font">{{ sMeter.device_serial_number }}</span>
                  </div>
                </div>
                <div class="col-md-3">
              <div class="home">
                <span class="small-font">{{ sMeter.time_diff }}</span>
              </div>
            </div>
                
                <!-- <hr/> -->
              </div>
            </div>
          </div>
        </button>
      </h2>
      <!-- After open accordion -->
      <div
        :id="'collapseOne' + singleUnit.id"
        class="accordion-collapse collapse"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div class="collaps-footer">
          <div class="row">
            <div class="text-left col-md-6">
              <div class="edit">
                <button class="edt pull-right" @click="unitPage(singleUnit)">
                  <span class="icon-icon icon-layout"></span>
                  View
                </button>
                <button
                  class="edt btn"
                  @click="autoFillUnit(singleUnit)"
                  ref="openEditUnit"
                  data-bs-toggle="modal"
                  data-bs-target="#newEditunit"
                >
                  <span class="icon-edit"></span>
                  Edit
                </button>
              </div>
            </div>
            <div class="text-right col-md-6">
              <div class="edit pull-right">
                <button
                  class="edt"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteUnit"
                  @click="autofillId(singleUnit.id, singleUnit.name)"
                >
                  <span class="icon-trash"></span>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

<new-edit-unit 
    v-bind:unitEditName="unitEditName" 
    v-bind:buildings="buildings"  
    v-bind:manufacturers="manufacturers"
    v-bind:devices="devices"
    v-bind:device_types="device_types" 
    v-bind:allMeters="gMeters">
    </new-edit-unit>
    <!-- Edit Unit Modal -->
   

    <!-- Delete Unit Modal -->
    <div
      class="modal fade"
      id="deleteUnit"
      tabindex="-1"
      aria-labelledby="deleteUnitLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog-centered modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteUnitLabel">
              <span class="icon-trash"></span> Are You Sure?
            </h5>
            <a
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></a>
          </div>
          <div class="modal-body">
            You are about to delete {{ unit.name }}. Are you sure you want to
            proceed?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-light"
              data-bs-dismiss="modal"
              ref="closeDeleteUnit"
            >
              No, Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteUnit(unit.id)"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseComponentVue from "../../../components/base/BaseComponent.vue";
import Popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import NewEditUnit from './new-edit-unit.vue';
export default {
  name: "unitList",
  extends: BaseComponentVue,
  components: {
    popper: Popper
  },
  props:{
    units: Array,
    loading: Boolean,
    buildings: Array,
    manufacturers: Array,
    devices: Array,
    device_types: Array,
    gMeters: Array
  },
 
  data() {
    return {
      id: -1,
      filter: {
        search: "",
        device_serial_number: "",
        meter_id: "",
        type_something: "",
      },
      unitEditName: "",
      unit: {
        id: "",
        name: "",
        building_id: 0,
        building: "",
        meters: [],
        gMeters: [],
      },

      errorsUnit: {
        name: [],
      },
      manufacturer: {
        name: "",
      },
      device: {
        name: "",
        manufacturer_id: "",
        device_type_id: "",
      },
      tempMeter: [],
      sortOrder: "asc",
    };
  },
  created() {
    
    let id = this.$route.params.bid;

    // this.getUnits(item.building_id);
    this.eventbus().$on("close_modal", (item) => {
      if(item == 'yes'){
        this.$refs.closeDeleteUnit.click();
      }
    })
   this.eventbus().$on("sort_units", (item) => {
       let order = this.sortOrder == "asc" ? true : false;
      this.units = [
        ...this.units.sort(function (a, b) {
          const fa = a.name ? a.name.toLowerCase() : "";
          const fb = b.name ? b.name.toLowerCase() : "";

          if (fa < fb) {
            return order ? -1 : 1;
          }
          if (fa > fb) {
            return order ? 1 : -1;
          }
          return 0;
        }),
      ];

      this.sortOrder = this.sortOrder == "asc" ? "desc" : "asc";
    });
 
    var self = this;
    this.eventbus().$on("selected_building_for_unit", (id) => {
      this.filter = {
        search: "",
        device_serial_number: "",
        meter_id: "",
        type_something: "",
      };
      this.getUnits(id);
    });

    this.eventbus().$on("clear_units", (id) => {
      this.filter = {
        search: "",
        device_serial_number: "",
        meter_id: "",
        type_something: "",
      };
      this.units = [];
    });
    
   
  },

  methods: {
    async addManufacturer() {
      let res = await this.network().addManufacturer(this.manufacturer);
      this.utility().presentSuccessToast("Manufacturer added successfully!");
      this.$refs.closePopper.click();
      let resManufacturer = await this.network().getManufacturers();
      this.manufacturers = [...resManufacturer];
      this.manufacturer.name = "";
    },
    async addDevice() {
      let res = await this.network().addDevice(this.device);
      this.utility().presentSuccessToast("Device added successfully!");
      this.$refs.closePopper.click();
      this.device.name = "";
      this.device.manufacturer_id = "";
      this.device.device_type_id = "";
    },
   

    unitPage(unit) {
      this.route(
        "/dashboard/properties/" +
          this.$route.params.pid +
          "/equipment/" +
          unit.building_id +
          "/unit/" +
          unit.id
      );
    },

    async autoFillUnit(unitItem) {
      this.unitEditName = unitItem.name
      this.unit.name = unitItem.name;
      this.unit.building_id = unitItem.building_id;
      this.unit.building = unitItem.building;
      this.unit.meters = unitItem.unit_meter;
      this.unit.id = unitItem.id;
      this.unit.gMeters = [...this.gMeters];
      let deviceRes = await this.network().allDevices();
      this.devices = deviceRes;

      const reason = {
        'options_reason_id': '',
        'text_reason': '',
        'picture': ''
      }
      this.unit.meters.forEach((element,index) => {
        const meterToBeRemove = this.unit.gMeters
          .map(function (item) {
            return item.id;
          })
          .indexOf(element.meter_id);
        // console.log(meter, 'Attached Meter');
        this.unit.gMeters.splice(meterToBeRemove, 1);
        if(element.installation_status == 2){
            this.$set(element, 'step5form',2)
        }else{
            this.$set(element, 'step5form',1)
            this.$set(element, 'reason', reason)
        }
        this.$set(element, 'step1form',1)
        this.$set(element, 'step2form',1)
        this.$set(element, 'keyId',index+1)
      });
      const u = Object.assign({}, this.unit)
      this.emitEvent("unit_edit_fill", u);
       console.log("UNITSS", u);
    },

    // async getMeters() {
    //   try {
    //     let res = await this.network().getMeters();
    //     this.gMeters = res;
    //   } catch (e) {
    //     console.log(e, "get building errors!");
    //   }
    // },

    uValidate: function (e) {
      e.preventDefault();
      if (this.unit.name) {
        return this.updateUnit();
      }
      this.errorsUnit = {
        name: [],
      };
      if (!this.unit.name) {
        this.errorsUnit.name.push("Unit name is required.");
      }
    },
    async getUnits(id) {
      try {
        const unitGet = {
          building_id: id,
          search: this.filters.search,
          device_serial_number: this.filters.device_serial_number,
          meter_id: this.filters.meter_id,
          type_something: this.filters.type_something,
        };

        this.loading = true;
        this.units = [];
        let res = await this.network().getUnits(unitGet);
        this.units = res;
        this.loading = false;
      } catch (e) {
        console.log(e, "get UNITS errors!");
      }
 },
    // async EditUnitMeters() {
    //   var itemsProcessed = 0;
    //   console.log("editunitmeter", this.unit);
    //   if (this.unit.meters.length != 0) {
    //     this.unit.meters.forEach(async (meter) => {
    //       if (meter.type_id) {
    //         const updateRes = await this.network().EditMeterTypeBuilder(
    //           meter.type_id,
    //           meter.type
    //         );
    //       } else {
    //         const resType = await this.network().addMeterTypeBuilder(
    //           meter.type
    //         );
    //         console.log("addtype:", resType.type);
    //         meter.type_id = resType.type.id;
    //       }
    //       itemsProcessed++;
    //       if (itemsProcessed === this.unit.meters.length) {
    //         this.updateUnit();
    //       }
    //     });
    //   } else {
    //     this.updateUnit();
    //   }
    // },

    async updateUnit() {
      const res = await this.network().updateUnit(this.unit.id, this.unit);
      this.$refs.closeEditUnit.click();
      this.utility().presentSuccessToast("Units is Updated successfully!");
      const unitGet = {
        building_id: this.unit.building_id,
        search: this.filter.search,
        device_serial_number: this.filter.device_serial_number,
        meter_id: this.filter.meter_id,
        type_something: this.filter.type_something,
      };
      this.eventbus().$on("selected_building_for_unit", (id) => {
        this.filter = {
          search: "",
          device_serial_number: "",
          meter_id: "",
          type_something: "",
        };
        this.getUnits(id);
        this.getBuildings();

        this.getManufacturers();
      });

      let resUnit = await this.network().getUnits(unitGet);
      this.units = resUnit;
    
      (this.unit.name = ""),
        (this.unit.building_id = ""),
        (this.unit.meters = []);
    },

    addMeter(id) {
      const meter = this.gMeters.filter((item) => item.id === id);
      const unitMeter = {
        meter_id: id,
        meter_name: meter[0].name,
        device_serial_number: "",
        meter_serial_number: "",
        initial_meter_reading:"",
        time_diff:"",
        device_id: "",
        device: {
          manufacturer_id: "",
        },
      };
      // this.unit.building_id = this.$route.params.bid;
      console.log("add-meter", this.unit);
      // this.attachedMeters.meterName  = meter[0].name;
      this.unit.meters.push(unitMeter);

      const index = this.unit.gMeters.findIndex((x) => x.id == id);
      if (index != -1) {
        this.unit.gMeters.splice(index, 1);
      }
    },

    async deleteUnitMeter(id, meter_id) {
      let mIndex = this.unit.meters.findIndex((x) => x.meter_id == meter_id);

      // find the type of meter removed
      this.unit.meters.splice(mIndex, 1);

      const m = this.gMeters.find((x) => x.id == meter_id);
      this.unit.gMeters.push(m);

      if (id) {
        let res = await this.network().deleteUnitMeter(id);
        this.utility().presentSuccessToast("Meter is deleted successfully!");
      }
    },

    async deleteUnit(id) {
      let res = await this.network().deleteUnit(id);
      this.$refs.closeDeleteUnit.click();
      let index = this.units.findIndex((x) => x.id == id);
      if (index != -1) {
        this.units.splice(index, 1);
      }
      //   let resUnit = await this.network().getUnits({
      //     building_id: this.$route.params.bid,
      //   });
      //   this.$refs.closeDeleteUnit.click();
      //   this.utility().presentSuccessToast("Unit is deleted successfully!");
      //   this.units = [...resUnit];
    },

    autofillId(id, name) {
      this.unit.id = id;
      this.unit.name = name;
    },

    async close() {
      let resUnit = await this.network().getUnits({
        building_id: this.unit.building_id,
      });
      this.units = resUnit;
      // this.unit.meters = [];
    },
  },
};
</script>
<style scoped>
.modal {
  z-index: 1052 !important;
}
.modal-backdrop.show {
  z-index: 1051 !important;
}
.spinner-border {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}
.small-font{
  font-size: 14px !important;
}
</style>
