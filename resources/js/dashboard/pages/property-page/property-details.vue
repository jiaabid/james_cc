<template>
  <section class="properties-page">
    <div class="inner-bx scroll-section" >
      <div class="page-inn">
        <div class="map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14468.024787266106!2d66.9868871!3d24.965903799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1633537774180!5m2!1sen!2s"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
        <div class="row align-items-center mx-0 mt-2 mb-4">
          <div class="col name-container">
           <span class="icon-property name-icon mr-4"></span>
           <div>
             <div class="property-name">
              {{ property_name }}
             </div>
              <div class="property-address"><span class="icon-map-pin"></span> {{property.street}}</div>
             </div>
          </div>
          <div class="col-6">
            <!-- gateway custom div here -->
          </div>
        </div>

        <!-- PROPERTY DETAILS SECTION -->
        <div class="row">
          <div class="col-5">
            <div class="section-header">
              <span class="icon-align-justify mr-1"></span>
              <div class="title">Property Details</div>
              <button
                class="btn btn-sm btn-outline-primary edit-btn"
                @click="editProperty"
                v-if="disabled"
              >
                <span class="icon-edit"></span> Edit
              </button>
              <div v-else>
                <button class="btn btn-sm btn-light edit-btn" @click="cancel" ref="cancelBtn">
                  <span class="icon-x"></span> Cancel
                </button>
                <button
                  class="btn btn-sm btn-primary edit-btn"
                  @click="saveProperty"
                >
                  <span class="icon-save"></span> Save
                </button>
              </div>
            </div>
            <form>
              <div class="form-group">
                <label for="name">Name*</label>
                <input
                  placeholder="Propery Name"
                  type="text"
                  class="form-control"
                  id="name"
                  aria-describedby="Name"
                  v-model="interProperty.name"
                  :disabled="disabled"
                />
              </div>
              <div class="form-group">
                <label for="address">Address*</label>
                <input
                  placeholder="Propery Address"
                  type="text"
                  class="form-control"
                  id="address"
                  v-model="interProperty.street"
                  :disabled="disabled"
                  maxlength="255"
                />
              </div>
              <div class="form-group">
                <label for="billing-company">BILLING COMPANY* </label>
                <select
                  v-model="property.billing_company_id"
                  class="form-control"
                  :disabled="disabled"
                >
                  <option
                    v-for="billing in billings"
                    :key="billing.id"
                    :value="billing.id"
                  >
                    {{ billing.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="management-company">MANAGEMENT COMPANY*</label>
                <select
                  v-model="property.management_company_id"
                  class="form-control"
                  :disabled="disabled"
                >
                  <option
                    v-for="management in managements"
                    :key="management.id"
                    :value="management.id"
                  >
                    {{ management.manager_name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="custom-id">CUSTOM ID (OPTIONAL)</label>
                <input
                  placeholder="Custome Specific ID "
                  type="text"
                  class="form-control"
                  id="custom-id"
                  v-model="property.property_id"
                  :disabled="disabled"
                />
              </div>
              <div class="label-container mt-4">
                <label
                  ><span class="icon-contact-card"></span> Contact Info</label
                >
              </div>
              <div class="form-group contact-info-group disabled">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="icon-user"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Contact Name"
                    class="form-control"
                    :disabled="disabled"
                    v-model="property.contact_name"
                  />
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="icon-tag"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Title or Job Description"
                    class="form-control"
                    :disabled="disabled"
                    v-model="property.contact_title"
                  />
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="icon-phone"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Phone"
                    class="form-control"
                    :disabled="disabled"
                    v-model="property.contact_phone"
                  />
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="icon-mail"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Email"
                    class="form-control"
                    :disabled="disabled"
                    v-model="property.contact_email"
                  />
                </div>
              </div>
            </form>
          </div>

          <!-- PROPERTY HEALTH SECTION -->
          <div class="col-7">
            <div :class="'flip-card' + ' '+ flipped">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <div>
                  <div class="section-header">
                    <span class="icon-heart mr-2" style="color:red;"></span>
                      <div class="title">Property Health</div>
                      <button class="btn btn-sm btn-outline-primary edit-btn"  @click="toggleCard">
                        <span class="icon-check-square"></span>
                      </button>
                  </div>
                    <div class="row mt-5">
                      <div class="col-6 chart-container">
                        <donut-chart  v-if="loaded" :chart-data="chartdata.data" :options="chartdata.options" />
                      </div>
                  </div>
                  </div>
                </div>
              <div class="flip-card-back">
                <div class="flip-card-front">
                  <div class="section-header">
                    <span class="icon-check-square mr-2" style="color: #7bc147;"></span>
                      <div class="title">Property Setup Checklist</div>
                      <button class="btn btn-sm btn-outline-primary" @click="toggleCard">
                        <span class="icon-heart"></span>
                      </button>
                    </div>
                    <div class="p-4">
                      <div class="flex-center installation-percentage completed mb-3">
                        <span>{{installationPercentage}}</span>% Complete
                      </div>
                      <div class="flex-bar">
                          <k-progress :percent="installationPercentage" bg-color="rgb(185, 220, 159)" status="success" :line-height="15" :show-text="false"></k-progress>
                      </div>
                    </div>
                    <div class="checklist-container">
                      <div>
                        <div :class="property.name ? 'checklist-item completed' : 'checklist-item'">
                          <span :class="property.name ? 'icon-check-square' : 'icon-square'"></span>
                          <div class="item-name"> Add Property Name </div>
                        </div>
                         <div :class="property.street ? 'checklist-item completed' : 'checklist-item'">
                          <span :class="property.street ? 'icon-check-square' : 'icon-square'"></span>
                          <div class="item-name"> Add Property Address </div>
                        </div>
                         <div :class="property.unit_count!=0 ? 'checklist-item completed' : 'checklist-item'">
                          <span :class="property.unit_count!=0 ? 'icon-check-square' : 'icon-square'"></span>
                          <div class="item-name"> Program a Gateway </div>
                        </div>
                          <div :class="property.building_count!=0 ? 'checklist-item completed' : 'checklist-item'">
                          <span :class="property.building_count!=0 ? 'icon-check-square' : 'icon-square'"></span>
                          <div class="item-name"> Program Equipment </div>
                        </div>
                        <!-- <div :class="property.name ? 'checklist-item completed' : 'checklist-item'">
                          <span :class="property.name ? 'icon-check-square' : 'icon-square'"></span>
                          <div class="item-name"> Set Repeater Locations </div>
                        </div> -->
                         <!-- <div :class="property.name ? 'checklist-item completed' : 'checklist-item'">
                          <span :class="property.name ? 'icon-check-square' : 'icon-square'"></span>
                          <div class="item-name"> Add IMRs (Initial Meter Readings) </div>
                        </div> -->
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseComponentVue from "../../../components/base/BaseComponent.vue";
import DonutChart from "./chart-transceiver";
import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";
import ChartJSPluginDoughnutLabel from "chartjs-plugin-doughnutlabel";
import KProgress from 'k-progress';
export default {
  name: "property-details",
  extends: BaseComponentVue,
  components: {
    DonutChart,
    KProgress
  },
  data() {
    return {
      property: {},
      disabled: "disabled",
      property_name: "",
      interProperty:{
        name:"",
        street:"",
      },
      billings: [],
      managements: [],
      chartdata: null,
      loaded: false,
      flippedToggle:false,
      flipped:"",
      installationPercentage: 0
    };
  },
  mounted() {
    this.getProperty();
    this.getBillings();
    this.getManagements();
    this.getChart();

    // this.textCenter(880);
  },
  beforeRouteEnter(to, from, next){
    next(vm => {
     vm.emitEvent("selected_property", vm.property);
     vm.disabled = "disabled";
     vm.getProperty();
    })
  },
 
  methods: {
    async getProperty() {
      let res = await this.network().getPropertyName(this.$route.params.pid);
      let count = 0
      this.property = res.property;
      this.property_name = res.property.name;
      this.interProperty.name = res.property.name;
      this.interProperty.street = res.property.street;

      if(this.property.name){
        count++
      }
      if(this.property.street){
        count++
      }
      if(this.property_name.unit_cunt!=0){
        count++
      }
      if(this.property.building_count!=0){
        count++
      }
      this.installationPercentage = (count/4)*100
       this.emitEvent("selected_property", this.property);
    },
    editProperty() {
      this.disabled = null;
    },
    async saveProperty() {
      try{
        this.disabled = "disabled";
        this.property.name = this.interProperty.name;
        this.property.street = this.interProperty.street;
        this.property_name = this.property.name
        let res = await this.network().updateProperty(
          this.$route.params.pid,
          this.property
        );
        this.utility().presentSuccessToast("Property is updated successfully!");
      }catch(e){
         this.disabled = null;
      }
    },
    cancel() {
      this.disabled = "disabled";
      this.getProperty();
    },
    async getBillings() {
      const res = await this.network().getBillings();
      this.billings = res.billingCompany;
    },
    async getManagements() {
      const res = await this.network().getManagers();
      this.managements = res.managementCompany;
    },

    async getChart() {
      let chartRes = await this.network().getTransceiverChart(
        this.$route.params.pid
      );
      this.chartdata = {
        data: {
          labels: ["Online", "Not Installed"],
          datasets: [
            {
              data: chartRes.transceivers,
              label: "Transceiver",
              backgroundColor: ["#3e95cd"],
              hoverBorderColor: ["#3e95cd", "rgb(221 221 221)"],
              hoverBorderWidth: 5,
              borderAlign: "inner",
            },
          ],
        },

        options: {
           plugins: {
          datalabels: {
            color: 'white',
            textAlign: 'center',
            font: {
              size: 14
            }
          },
           doughnutlabel: {
            labels: [{
              text: 'Transceiver',
              font: {
                size: 14,
              }
            }]
          }
        },
          hoverBorderWidth: 30,
          borderWidth: 10,
          cutoutPercentage: 60,
          legend: {
            position: "bottom",
          },
         
        },
      };
      this.loaded = true;
    },

     toggleCard() {
      this.flippedToggle = !this.flippedToggle;
      if(this.flippedToggle){
          this.flipped = "flipped"
      }else{
        this.flipped = ""
      }
    },
  },
};
</script>

<style>
@import "./property-details.css";
</style>
