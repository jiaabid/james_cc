<template>
  <div
    class="modal fade"
    id="newEditunit"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="editunitLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editunitLabel">
            <span class="icon-home"></span>Edit {{ unitEditName }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>

        <div class="modal-body">
          <!-- BUILDING AND UNIT -->
          <div class="form-group">
            <div class="form-row">
              <div class="col-md-6" style="padding-left: 0px">
                <label><span class="icon-building"></span>BUILDING*</label>
                <select
                  v-model="unit.building_id"
                  class="form-control"
                  required
                >
                  <option
                    v-for="building in buildings"
                    :key="building.id"
                    :value="building.id"
                  >
                    {{ building.name }}
                  </option>
                </select>
                <ul
                  class="mt-1"
                  v-if="errorsUnit.building_id.length && !unit.building_id"
                  style="padding-left: 0"
                >
                  <li
                    class="text-danger"
                    v-for="error in errorsUnit.building_id"
                    :key="error.id"
                  >
                    {{ error }}
                  </li>
                </ul>
              </div>

              <div class="col-md-6" style="padding-right: 0px">
                <label>UNIT*</label>
                <!-- to close the popper -->
                <button hidden ref="closePopper">close</button>
                <input
                  type="text"
                  v-model="unit.name"
                  class="form-control"
                  required
                />
                <ul
                  class="mt-1"
                  v-if="errorsUnit.name.length && !unit.name"
                  style="padding-left: 0"
                >
                  <li
                    class="text-danger"
                    v-for="error in errorsUnit.name"
                    :key="error.id"
                  >
                    {{ error }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" v-if="unit.meters && unit.meters.length > 0">
            <li
              class="nav-item btn-group border rounded mr-2"
              :class="{
                'border-primary':
                  defaultMeter && aMeter.keyId == defaultMeter.keyId,
                'border-secondary':
                  defaultMeter && aMeter.keyId != defaultMeter.keyId,
              }"
              role="presentation"
              v-for="aMeter in unit.meters"
              :key="aMeter.keyId"
            >
              <button
                @click="
                  defaultMeter = aMeter;
                  tabActive = 1;
                  meterClick();
                "
                data-bs-toggle="tab"
                :data-bs-target="'#tabEdit' + aMeter.keyId"
                role="tab"
                type="button"
                :class="
                  tabActive == 0
                    ? 'btn'
                    : 'btn active'
                "
              >
                {{ "meter-" + aMeter.keyId }}
              </button>
              <button class="btn" @click="deleteSelectedUnit(aMeter)">
                <i class="fa fa-close"></i>
              </button>
              <!-- <div class="dropdown">
                <button
                  class="btn btn-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {{ "meter-" + aMeter.keyId }}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <button
                    class="dropdown-item"
                    @click="defaultMeter = aMeter"
                    data-bs-toggle="tab"
                    :data-bs-target="'#tabEdit' + aMeter.keyId"
                    role="tab"
                    >Open
                  </button>
                  <button
                    class="dropdown-item"
                    @click="deleteSelectedUnit(aMeter)"
                  >
                    Delete
                  </button>
                </div>
              </div> -->
            </li>
            <button class="btn but-plus" @click="addMeter">
              <span class="icon-plus">Add Meter</span>
            </button>
          </ul>

          <div
            class="tab-content"
            id="pills-tabEditUnit"
            style="margin-top: -30px"
            v-if="unit.meters && unit.meters.length > 0"
          >
            <div
              :class="tabActive == 0 ? 'tab-pane fade md-form' : 'tab-pane fade md-form active show'"
              :id="'tabEdit' + aMeter.keyId"
              v-for="aMeter in unit.meters.filter(
                (x) => x.keyId != 0 && x.keyId != null
              )"
              :key="aMeter.keyId"
              role="tabpanel"
            >
              <div class="tab">
                <button
                  class="tablinks"
                  @click="openSlide(1)"
                  id="defaultOpen"
                  :class="{ active: step == 1 }"
                >
                  Device Info
                </button>
                <button
                  class="tablinks"
                  @click="openSlide(2)"
                  :class="{ active: step == 2 }"
                >
                  Meter Type
                </button>
                <button
                  class="tablinks"
                  @click="openSlide(3)"
                  :class="{ active: step == 3 }"
                >
                  Meter Info
                </button>
                <button
                  class="tablinks"
                  @click="openSlide(4)"
                  :class="{ active: step == 4 }"
                >
                  Image
                </button>
                <button
                  class="tablinks"
                  @click="openSlide(6)"
                  :class="{ active: step == 6 }"
                >
                  Location
                </button>
                <button
                  class="tablinks"
                  @click="openSlide(5)"
                  :class="{ active: step == 5 }"
                >
                  Install
                </button>
              </div>

              <!-- SLIDE 1 -->
              <div class="tabcontent" v-show="step == 1">
                <div v-show="aMeter.step1form == 1">
                  <div class="form-group">
                    <label>Select Manufacturer*</label>
                    <select
                      type="text"
                      class="form-control xyz"
                      placeholder=""
                      aria-label=""
                      aria-describedby="basic-addon1"
                      v-model="aMeter.device.manufacturer_id"
                    >
                      <option
                        v-for="manufacturer in manufacturers"
                        :key="manufacturer.id"
                        :value="manufacturer.id"
                      >
                        {{ manufacturer.name }}
                      </option>
                    </select>

                    <div class="input-group-prepend">
                      <button
                        class="btn but-add btn-outline-primary"
                        type="button"
                        @click="aMeter.step1form = 3"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Select Device*</label>
                    <select v-model="aMeter.device_id" class="form-control">
                      <option
                        v-for="device in devices.filter(
                          (x) =>
                            x.manufacturer_id == aMeter.device.manufacturer_id
                        )"
                        :key="device.id"
                        :value="device.id"
                      >
                        {{ device.name }}
                      </option>
                    </select>

                    <div class="input-group-prepend">
                      <button
                        class="btn but-add btn-outline-primary"
                        type="button"
                        @click="aMeter.step1form = 2"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Device Form -->
                <div v-show="aMeter.step1form == 2">
                  <div class="form-group">
                    <label style="display: flex; justify-content: space-between"
                      >Device Name*</label
                    >
                    <input
                      autocomplete="nope"
                      placeholder="Name"
                      type="text"
                      class="form-control"
                      v-model="device.name"
                    />
                  </div>
                  <div class="form-group">
                    <label>Select Manufacturer*</label>
                    <select
                      class="form-control"
                      v-model="device.manufacturer_id"
                    >
                      <option
                        v-for="manufacturer in manufacturers"
                        :key="manufacturer.id"
                        :value="manufacturer.id"
                      >
                        {{ manufacturer.name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Select Device Type*</label>
                    <select
                      type="text"
                      class="form-control xyz"
                      placeholder=""
                      aria-label=""
                      aria-describedby="basic-addon1"
                      v-model="device.device_type_id"
                    >
                      <option
                        v-for="device_type in device_types"
                        :key="device_type.id"
                        :value="device_type.id"
                      >
                        {{ device_type.name }}
                      </option>
                    </select>
                  </div>

                  <button
                    type="button"
                    class="btn but-sub btn-primary"
                    @click="
                      addDevice();
                      aMeter.step1form = 1;
                    "
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    class="btn but-can btn-primary"
                    @click="
                      aMeter.step1form = 1;
                      cancel();
                    "
                  >
                    Cancel
                  </button>
                </div>

                <!-- Manufacture Form -->
                <div v-show="aMeter.step1form == 3">
                  <div class="form-group">
                    <label>Manufacturer*</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder=""
                      aria-label=""
                      aria-describedby="basic-addon1"
                      v-model="manufacturer.name"
                    />
                  </div>
                  <button
                    type="button"
                    class="btn but-sub btn-primary"
                    @click="
                      addManufacturer();
                      aMeter.step1form = 1;
                    "
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    class="btn but-can btn-primary"
                    @click="
                      aMeter.step1form = 1;
                      cancel();
                    "
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <!-- SLIDE 2 -->
               <div class="tabcontent" v-show="step == 2">
                <div v-show="aMeter.step2form == 1">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Select Meter Type</label>
                    <select v-model="aMeter.meter_id" class="form-control">
                      <option
                        v-for="meter in allMeters"
                        :key="meter.id"
                        :value="meter.id"
                      >
                        {{ meter.name }}
                      </option>
                    </select>

                    <div class="input-group-prepend">
                        <button
                          class="btn but-add btn-outline-primary"
                          type="button"
                          @click="aMeter.step2form = 2"
                        >
                          Add
                        </button>
                      </div>
                  </div>
                </div>
                  <!-- Add Meter Form -->
                 <form v-show="aMeter.step2form == 2">
                  <div class="form-group">
                    <label>Meter Type*</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder=""
                      aria-label=""
                      aria-describedby="basic-addon1"
                      v-model="meterType.name"
                    />
                  </div>
                  <button
                    type="button"
                    class="btn but-sub btn-primary"
                    @click="
                      addMeterType();
                      aMeter.step2form = 1;
                    "
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    class="btn but-can btn-primary"
                    @click="
                      aMeter.step2form = 1;
                      cancel();
                    "
                  >
                    Cancel
                  </button>
                </form>
              </div>

              <!-- SLIDE 3 -->
              <div class="tabcontent" v-show="step == 3">
                <div class="form-group">
                  <label for="exampleInputEmail1">Device Serial Number*</label>
                  <input
                    class="form-control"
                    v-model="aMeter.device_serial_number"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Imr</label>
                  <input
                    class="form-control"
                    min="0"
                    type="number"
                    onkeydown="return event.keyCode !== 69 && event.keyCode !== 189 && event.keyCode !== 187 && event.keyCode !== 107 && event.keyCode !== 109 && event.keyCode !== 190"
                    v-model="aMeter.initial_meter_reading"
                  />
                </div>
              </div>

              <!-- SLIDE 4 -->
              <div class="tabcontent" v-show="step == 4">
                <div class="outer-thumbnail" @click="pickFile">
                  <img
                    :src="
                      aMeter.thumbnail
                        ? aMeter.thumbnail
                        : '/images/placeholder.jpg'
                    "
                    class="img-thumbnail"
                  />
                  <span class="badge badge-success">Upload</span>
                  <input
                    @change="onFileChange"
                    class="form-control img-up form-control-lg"
                    type="file"
                    id="fileUpload"
                    style="display: none"
                    ref="file"
                  />
                </div>

                <!-- <div
                  class="imagePreviewWrapper"
                  :style="{ 'background-image': `url(${previewImage})` }"
                  @click="selectImage"
                ></div>
                <input
                  @change="onFileChange"
                  class="form-control img-up form-control-lg"
                  :id="aMeter.keyId"
                  type="file"
                  @input="pickFile"
                />
                <button type="submit" class="btn but-up btn-outline-primary">
                  Upload
                </button> -->
              </div>
              <!-- SLIDE 6 -->
              <div class="tabcontent" v-show="step == 6">
                <AddGoogleMap
                  @location_emitter="locator"
                  :ref="'AddGoogleMap' + aMeter.keyId"
                />
              </div>
              <!-- SLIDE 5 -->
              <div class="tabcontent" v-show="step == 5">
                <div class="slide-5" v-show="aMeter.step5form == 1">
                  <button
                    type="button"
                    class="btn btn-success"
                    @click="
                      aMeter.installation_status = 1;
                      showSuccessAlert();
                      aMeter.step5form = 1;
                    "
                  >
                    Attempted and installed
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="
                      aMeter.installation_status = 2;
                      aMeter.step5form = 2;
                      showFailAlert();
                    "
                  >
                    Attempted but incomplete
                  </button>
                </div>

                <!-- NOT INSTALLED REASON FORM -->
                <div v-if="aMeter.step5form == 2">
                  <div class="form-group">
                    <label>Select a Reason*</label>
                    <select
                      class="form-control"
                      v-model="aMeter.reason.options_reason_id"
                    >
                      <option
                        v-for="optionReason in optionReasons"
                        :key="optionReason.id"
                        :value="optionReason.id"
                      >
                        {{ optionReason.name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Describe Reason*</label>
                    <input
                      class="form-control"
                      v-model="aMeter.reason.text_reason"
                    />
                  </div>
                  <div class="form-group">
                    <div class="outer-picture" @click="pickFileNotInstall">
                      <img
                        :src="
                          aMeter.reason.picture
                            ? aMeter.reason.picture
                            : '/images/placeholder.jpg'
                        "
                        class="img-thumbnail"
                        style="height: 112px"
                      />
                      <span class="badge badge-success">Upload</span>
                      <input
                        @change="onFileChangeNotInstall"
                        class="form-control img-up form-control-lg"
                        type="file"
                        id="fileUploadNotInstall"
                        style="display: none"
                        ref="file"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <button
                      type="button"
                      class="btn but-sub-2 btn-primary"
                      @click="
                        aMeter.step5form = 1;
                        aMeter.installation_status = 0;
                      "
                    >
                      cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            ref="closeEditUnit"
            @click="closeModal"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="validate">
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseComponentVue from "../../../components/base/BaseComponent.vue";
import Popper from "vue-popperjs";
import AddGoogleMap from "./AddGoogleMap.vue";

export default {
  name: "new-edit-unit",
  extends: BaseComponentVue,
  components: {
    popper: Popper,
    AddGoogleMap: AddGoogleMap,
  },
  props: {
    unitEditName: String,
    buildings: Array,
    manufacturers: Array,
    device_types: Array,
    devices: Array,
    allMeters: Array,
  },

  data() {
    return {
      tabActive: 0,
      unit: {
        name: "",
        building_id: 0,
        meters: [],
      },
      addManufactureForm: false,
      key: 0,
      ind: 0,
      step: 1,
      defaultMeter: null,
      meters: [],
      errorsUnit: {
        building_id: [],
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
      meterType:{
        name: "",
      },
      optionReasons: [],
      latitude:"",
      longitude: "",
    };
  },
  mounted() {
    this.getOptionReasons();
    this.eventbus().$on("close_modal", (item) => {
      if (item == "yes") {
        this.$refs.closePopper.click();
        this.$refs.closeEditUnit.click();
      }
    });

    this.eventbus().$on("unit_edit_fill", (item) => {
      let self = this;
      self.unit = Object.assign({}, item);
      console.log(self.unit);
    });
  },

  methods: {
    meterClick() {
      for (var i = 0; i < this.unit.meters.length; i++) {
        if (this.unit.meters[i].keyId == this.defaultMeter.keyId) {
          this.$refs["AddGoogleMap" + this.unit.meters[i].keyId][0].setValue(
            this.unit.meters[i].latitude,
            this.unit.meters[i].longitude
          );

        }
      }
    },
    locator(e) {
      for (var i = 0; i < this.unit.meters.length; i++) {
        if (this.unit.meters[i].keyId == this.defaultMeter.keyId) {
          this.unit.meters[i].latitude = e.lat;
          this.unit.meters[i].longitude = e.lng;
        }
      }
      console.log(e.lat);
      console.log(e);
    },

    openSlide(num) {
      this.step = num;
    },

    async addMeter() {
      // let meterLength = this.unit.meters.length;
      this.key = this.unit.meters.length > 0 ? this.unit.meters.length : 1;
      const defaultMeter = {
        keyId: this.key ? this.key : 1,
        meter_id: 0,
        meter_name: "",
        device_serial_number: "",
        meter_serial_number: "",
        latitude: this.latitude,
        longitude: this.longitude,
        initial_meter_reading: 0,
        installation_status: 0,
        thumbnail: "",
        device_id: "",
        device: {
          manufacturer_id: "",
        },
        reason: {
          options_reason_id: 0,
          text_reason: "",
          picture: "",
        },
        step1form: 1,
        step2form: 1,
        step5form: 1,
      };
      const m = Object.assign({}, defaultMeter);
      console.log(m);
      m.keyId = this.unit.meters.length + 1;
      this.unit.meters.push(m);
      this.key++;
      // this.unit.meters.push(this.defaultMeter);
      // this.key++;
      console.log(this.unit.meters);
    },

    //SLIDER 4
    pickFile() {
      let fileUpload = document.getElementById("fileUpload");
      if (fileUpload != null) {
        fileUpload.click();
      }
      if (this.defaultMeter == null) {
        this.defaultMeter = this.unit.meters[0];
      }
      //   let input = this.$refs.fileInput;
      //   let file = input.files;
      //   if (file && file[0]) {
      //     let reader = new FileReader();
      //     reader.onload = (e) => {
      //       this.previewImage = e.target.result;
      //     };
      //     reader.readAsDataURL(file[0]);
      //     this.$emit("input", file[0]);
      //   }
    },
    onFileChange(event) {
      let file = event.target.files[0];
      if (file) {
        let mimeType = file.type;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (e) => {
          let image = e.target.result;
          console.log(image);

          for (var i = 0; i < this.unit.meters.length; i++) {
            if (this.unit.meters[i].keyId == this.defaultMeter.keyId) {
              this.unit.meters[i].thumbnail = image;
            }
          }

          //   let meter = this.unit.meters.filter(
          //     (x) => x.keyId == defaultMeter.keyId
          //   );
          //   meter[0].thumbnail = image;
        };
      }

      //   var files = e.target.files || e.dataTransfer.files;
      //   let id = e.target.id;
      //   if (!files.length) {
      //     return;
      //   }
      //   var reader = new FileReader();
      //   const getbase64 = () =>
      //     new Promise((resolve, reject) => {
      //       reader.onload = function () {
      //         base64String = reader.result;
      //         resolve(base64String);
      //       };
      //       (err) => reject(err);
      //     });

      //   getbase64()
      //     .then((base64String) => {
      //       let meter = this.unit.meters.filter((x) => x.keyId == id);
      //       meter[0].thumbnail = base64String;
      //       console.log(meter);
      //     })
      //     .catch((error) => console.log(error));

      //   reader.readAsDataURL(files[0]);
    },

    async getMeters() {
      let res = await this.network().getMeters();
      this.allMeters = res;
    },

    // SLIDER 1
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
      this.addManufactureForm = false;
    },
    async addMeterType(){
      let res = await this.network().addMeter(this.meterType);
      this.utility().presentSuccessToast("Meter Type added successfully!");
      let resMeter = await this.network().getMeters();
      this.allMeters = [...resMeter];
      this.meterType.name = "";
    },
    cancel() {
      this.manufacturer.name = "";
      this.device.name = "";
      this.device.manufacturer_id = "";
      this.device.device_type_id = "";
      this.addManufactureForm = false;
      this.selectManufacturerForm = true;
      this.defaultMeter = {}
    },

    //SLIDER 5
    async getOptionReasons() {
      let res = await this.network().getOptionReasons();
      this.optionReasons = res;
    },
    showSuccessAlert() {
      this.$swal({
        icon: "success",
        title: "Installation successful",
        text: "Meter is installed successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    showFailAlert() {
      this.$swal({
        icon: "error",
        title: "Installation not succeed",
        text: "Meter is not installed!",
        showConfirmButton: false,
        timer: 2000,
      });
    },
    pickFileNotInstall() {
      let fileUpload = document.getElementById("fileUploadNotInstall");
      if (fileUpload != null) {
        fileUpload.click();
      }

      if (this.defaultMeter == null) {
        this.defaultMeter = this.unit.meters[0];
      }
      //   let input = this.$refs.fileInput;
      //   let file = input.files;
      //   if (file && file[0]) {
      //     let reader = new FileReader();
      //     reader.onload = (e) => {
      //       this.previewImage = e.target.result;
      //     };
      //     reader.readAsDataURL(file[0]);
      //     this.$emit("input", file[0]);
      //   }
    },
    onFileChangeNotInstall(event) {
      let file = event.target.files[0];
      if (file) {
        let mimeType = file.type;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (e) => {
          let image = e.target.result;
          console.log("image", image);
          for (var i = 0; i < this.unit.meters.length; i++) {
            if (this.unit.meters[i].keyId == this.defaultMeter.keyId) {
              this.unit.meters[i].reason.picture = image;
            }
          }
        };
      }
    },

    //ADD UNIT
    validate: function (e) {
      e.preventDefault();
      if (this.unit.building_id && this.unit.name) {
        this.editUnit();
      } else {
        this.errorsUnit = {
          building_id: [],
          name: [],
        };

        if (!this.unit.building_id) {
          this.errorsUnit.building_id.push("Building is required.");
        }

        if (!this.unit.name) {
          this.errorsUnit.name.push("Unit name is required.");
        }
      }
    },
    async editUnit() {
      // let unit = Object.assign({}, this.unit);
      let res = await this.network().updateUnit(this.unit.id, this.unit);
      this.$refs.closeEditUnit.click();
      this.utility().presentSuccessToast("unit is updated successfully!");
    },

    //Delete meter
    async deleteSelectedUnit(meter) {
      console.log(meter);
      if (meter.id != null) {
        this.$swal({
          title: "Delete Meter",
          text: "Are you sure to delete the meter?",
          confirmButtonText: '<i class="fa fa-trash"></i> Delete',
          showCancelButton: true,
        }).then(async (result) => {
          if (result.isConfirmed) {
            let index = this.unit.meters.findIndex(
              (x) => x.keyId == meter.keyId
            );
            if (index != -1) {
              this.unit.meters.splice(index, 1);
            }
            let res = await this.network().deleteUnitMeter(meter.id);
            this.utility().presentSuccessToast(
              "Meter is deleted successfully!"
            );
          }
        });
      } else {
        let index = this.unit.meters.findIndex((x) => x.keyId == meter.keyId);
        if (index != -1) {
          this.unit.meters.splice(index, 1);
        }
      }
    },

    async closeModal() {
      let self = this;
      this.$parent.close();
      self.tabActive = 0;
      this.unit = {};
    },
  },
};
</script>

<style scoped>
.body {
  box-sizing: border-box;
}

/* buttons */
.but-plus {
  border: 1px solid black;
  font-size: 17px;
  margin-left: 9px;
  /* margin-bottom: 4px; */
  padding-bottom: 4px;
  font-family: auto;
}
.but-add {
  position: absolute;
  margin-top: -38px;
  right: 57px;
}
.but-1 {
  margin-left: 7px;
}
.but-sub {
  float: right;
  width: auto !important;
  margin-right: 19px;
}
.but-can {
  float: right;
  width: auto !important;
  margin-right: 8px;
}
.but-sub-2 {
  position: relative;
  width: auto !important;
  float: right;
  margin-top: 10px;
}
.but-dev {
  padding-left: 36px;
  padding-right: 36px;
}
.but-up {
  width: 30% !important;
  margin-left: 365px;
  margin-top: 5px;
}
.but-up-1 {
  width: 30% !important;
  margin-left: 336px;
  margin-top: 5px;
}

.tab {
  float: left;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  width: 30%;
  height: 350px;
  margin-top: 26px;
  margin-left: 8px;
}
.text {
  margin-top: 10px;
}

/* Style the buttons inside the tab */
.tab button {
  display: block;
  background-color: inherit;
  color: black;
  padding: 22px 16px;
  width: 100%;
  border: none;
  outline: none;
  text-align: left;
  cursor: pointer;
  transition: 0.3s;
  font-size: 17px;
}
.card-body {
  margin-left: 20px;
}
/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current "tab button" class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
  float: left;
  padding: 0px 12px;
  border: 1px solid #ccc;
  width: 70%;
  border-left: none;
  height: 350px;
  margin-top: 26px;
  margin-left: -16px;
}
.img-up {
  margin-top: 10px;
  margin-left: 9px;
}
.img-up-1 {
  margin-top: 35px;
  margin-left: 19px;
  width: 471px;
}
.imagePreviewWrapper {
  width: 50px;
  height: 50px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
.outer-thumbnail {
  width: 150px;
  margin: 40px auto;
  position: relative;
}
.outer-thumbnail .badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: green;
}
.outer-thumbnail-1 {
  width: 150px;
  margin: 5px 0 0 12px;
  position: relative;
}
.outer-thumbnail-1 .badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: green;
}
.reason {
  margin-left: 171px;
  margin-top: -147px;
}
.reason-1 {
  margin-left: 171px;
}

.slide-5 {
  display: table-cell;
  width: 500px;
  height: 300px;
  vertical-align: middle;
  text-align: center;
}
.outer-picture {
  position: relative;
  width: 25%;
}
.outer-picture .badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: green;
}
</style>
