<template>
  <div>
    <section class="properties-page">
      <div class="inner-bx">
        <div class="page-inn">
          <!-- navigator -->
          <div class="top-tbs">
            <div class="row">
              <div class="col-md-12">
                <div>
                  <h2>
                    <span
                      class="color-gray-light text-truncate"
                      @click="property"
                      style="cursor: pointer"
                      ><span class="mx-2 icon-property color-gray-light"></span>
                      {{ property_name }}</span
                    >
                    <span
                      class="ml-2 icon-chevron-right color-gray-light"
                    ></span>
                    <span
                      class="color-gray-light"
                      @click="equipment"
                      style="cursor: pointer"
                    >
                      <span class="mx-2 icon-waves"></span>Equipment
                    </span>
                    <span
                      class="ml-2 icon-chevron-right color-gray-light"
                    ></span>
                    <span class="text-truncate"
                      ><span class="mx-2 icon-property"></span>
                      {{ property_name }}-{{ unit.name }}</span
                    >
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <!-- tabs -->
          <div class="top-tbs">
            <div class="row">
              <div class="col-md-12 text-left jus">
                <ul
                  class="nav nav-pills mb-0 justify-content-start"
                  id="pills-tab"
                  role="tablist"
                >
                  <li
                    class="nav-item"
                    role="presentation"
                    v-for="meter in unit.unit_meter"
                    v-bind:key="meter.id"
                  >
                    <button
                      :class="
                        unit.unit_meter[0].id == meter.id
                          ? 'active nav-link cstm-tbs'
                          : 'nav-link cstm-tbs'
                      "
                      data-bs-toggle="tab"
                      :data-bs-target="'#tab' + meter.id"
                      @click="getMeterReading(meter.id)"
                      type="button"
                      role="tab"
                    >
                    <span
                      v-if="meter.meter_id == 1"
                      class="icon-water"
                      style="color: rgb(227, 81, 95)"
                    ></span>
                    <span
                      v-if="meter.meter_id == 2"
                      class="icon-water"
                      style="color: rgb(62, 137, 191)"
                    ></span>
                      {{ meter.meter_name }}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- tabs-contents -->
          <div class="tab-content" id="pills-tabContent">
            <div
              :class="
                unit.unit_meter[0].id == meter.id
                  ? 'tab-pane fade show active'
                  : 'tab-pane fade'
              "
              :id="'tab' + meter.id"
              role="tabpanel"
              v-for="meter in unit.unit_meter"
              v-bind:key="meter.id"
            >
             <div class="spinner-border" role="status" v-if="loading">
              <span class="sr-only">Loading...</span>
            </div>
              <div class="detail-box" v-if="!loading">
                <div v-if="meter_readings && meter_readings.length != 0 && length_mr">
                  <p>CURRENT READ</p>
                  <div class="feet-value">
                    <h1>
                      {{ meter_readings[length_mr].meter_reading }} Gallon
                    </h1>
                  </div>
                  <p>As of {{ meter_readings[length_mr].time_diff }}</p>
                </div>
                <div v-else class="row">
                    <div class="feet-value col-md-4">
                    <h1 style="color:#bbbec0">
                      Waiting for first check in
                    </h1>
                  </div>
                </div>
                <div>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="cubic-img">
                        <img
                          src="/ion-meter-bh\resources\js\dashboard\pages\equipment-page\img\next-century-box.png"
                        />
                      </div>
                    </div>
                    <div class="col-md-5">
                      <!-- Transmitter -->
                      <div
                        class="pro-name mb-5"
                        v-if="meter.device_serial_number"
                      >
                        <div class="row">
                          <div class="col-md-8">
                            <div>
                              <h3>Transceiver</h3>
                              <p>
                                {{
                                  meter.device_serial_number
                                }}
                              </p>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="pro-icn">
                              <img
                                src="/ion-meter-bh\resources\js\dashboard\pages\equipment-page\img\transceiver.png"
                              />
                            </div>
                          </div>
                        </div>
                        <hr />
                        <p  v-if="meter_readings && meter_readings.length != 0 && length_mr">
                          Last Checked in {{ meter_readings[length_mr].time_diff }}
                          <span class="icon-check color-green ml-2"></span>
                        </p>
                        <div class="accordion" id="accordionExample" >
                          <div class="accordion-item" v-if="meter_readings && meter_readings.length != 0 && length_mr">
                            <h2 class="accordion-header" id="show-detail">
                              <button
                                class="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                Show More
                                <span class="icon-chevron-down ml-1"></span>
                              </button>
                            </h2>
                            <div
                              id="collapseOne"
                              class="accordion-collapse collapse"
                              aria-labelledby="show-detail"
                              data-bs-parent="#accordionExample"
                            >
                              <div class="accordion-body">
                                <div class="det-list">
                                  <ul>
                                    <li>
                                      <div class="val-dt">Signal Strength</div>
                                      <div class="val-dt">
                                        <span class="icon-waves"></span
                                        >{{
                                          meter_readings[length_mr]
                                            .signal_strength
                                        }}
                                      </div>
                                    </li>
                                    <li>
                                      <div class="val-dt">Temperature</div>
                                      <div class="val-dt">
                                        <span class="icon-thermometer"></span
                                        >{{
                                          meter_readings[length_mr].temperature
                                        }}
                                        F
                                      </div>
                                    </li>
                                    <li>
                                      <div class="val-dt">Battery</div>
                                      <div class="val-dt">
                                        <span class="icon-battery"></span
                                        >{{
                                          meter_readings[length_mr].battery
                                        }}%
                                      </div>
                                    </li>
                                    <!--                                                            <li>-->
                                    <!--                                                            <div class="val-dt">-->
                                    <!--                                                                Version-->
                                    <!--                                                            </div>-->
                                    <!--                                                            <div class="val-dt">-->
                                    <!--                                                                <span class="icon-transceiver"></span>TR201-->
                                    <!--                                                            </div>-->
                                    <!--                                                            </li>-->
                                  </ul>
                                  <div class="trans-grf">
                                    <span class="icon-gw301"></span>

                                    <span
                                      class="divider"
                                      style="display: block"
                                    ></span>

                                    <span class="icon-repeater"></span>
                                    <span
                                      class="divider"
                                      style="display: block"
                                    ></span>

                                    <span class="icon-transceiver"></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="pro-name mb-5" v-else>
                        <div class="row">
                          <div class="col-md-9">
                            <div>
                              <h3>No Device Programmed</h3>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <button class="btn btn-primary">
                          <span class="icon-barcode mr-2"></span>Program a
                          Device
                        </button>
                      </div>

                      <!-- Meter -->
                      <div class="pro-name">
                        <div class="row">
                          <div class="col-md-8">
                            <div>
                              <h3 class="text-capitalize">
                                {{ meter.meter_name }}
                              </h3>
                              <p>
                                {{ meter.device.name }}-{{
                                  meter.device.manufacturer
                                }}
                              </p>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="pro-icn">
                              <img
                                src="/ion-meter-bh\resources\js\dashboard\pages\equipment-page\img\meter-plain-5.png"
                              />
                            </div>
                          </div>
                        </div>
                        <hr />
                        <p v-if="meter_readings && meter_readings.length != 0 && length_mr">
                          Last Checked in {{ meter_readings[length_mr].time_diff }}
                          <span class="icon-check color-green ml-2"></span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chart-area" v-if="!loading">
                <div class="chart">
                   <bar-chart v-if="chartdata && chartdata.length!=0"
                        :id="'chart'+meter.id"
                       :chart-data="chartdata.data"
                       :options="chartdata.options"
                      ></bar-chart>
                      <div v-else>
                         <img
                                src="/ion-meter-bh\resources\js\dashboard\pages\equipment-page\img\empty_chart.png"
                              />
                      </div>
                </div>
                
                   
                <div class="table-sc">
                  <div class="row">
                    <div class="col-md-3">
                      <div class="date-drop-down">
                        <div class="filter-area-3">
                          <div class="dropdown">
                            <button
                              class="btn btn-cstm dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <span class="icon-date"></span> Custom
                            </button>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                              style=""
                            >
                              <li>
                                <a class="dropdown-item" href="#"> Today</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#">
                                  Last 7 Days</a
                                >
                              </li>
                              <li>
                                <a class="dropdown-item" href="#">
                                  This Month</a
                                >
                              </li>
                              <li>
                                <a class="dropdown-item" href="#"> Custom</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div>
                        <div class="row">
                          <div class="col-md-6">
                            <input
                              type="date"
                              v-model='filters.start_date'
                              id="reportrange"
                              class="form-control"
                              @change="getMeterReading(meter.id)"
                            />
                          </div>
                          <div class="col-md-6">
                            <input
                              type="date"
                              v-model='filters.end_date'
                              id="reportrange"
                              class="form-control"
                               @change="getMeterReading(meter.id)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3 text-right">
                      <div class="filter-area">
                        <div class="dropdown">
                          <button
                            class="btn btn-cstm dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span class="icon-download"></span> Add
                          </button>
                          <ul
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                            style=""
                          >
                          <li>
                              <a
                                class="dropdown-item"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#addunit"
                                @click="addMeterReading(meter.device_serial_number)"
                                >Meter Reading</a>
                            </li>
                            <li>
                              <a
                                class="dropdown-item"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#addunit"
                                >Download
                                Simple CSV</a
                              >
                            </li>
                            <li>
                              <a
                                class="dropdown-item"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#newunit"
                                >Download
                                CSV</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <table class="table table-striped table-hover table-bordered">
                    <thead>
                      <tr style="font-weight: 400; color: #408ac0">
                        <th scope="col">Check In</th>
                        <th scope="col">Serial Number</th>
                        <th scope="col">Signal Strength</th>
                        <th scope="col">Temperature</th>
                        <th scope="col">Battery</th>
                        <th scope="col">Meter Usage</th>
                        <th scope="col">Meter Read</th>
                      </tr>
                    </thead>
                    <tbody class="table-sc-body">
                      <tr
                        v-for="meter_reading in meter_readings"
                        :key="meter_reading.id"
                      >
                        <td>{{ meter_reading.check_in }}</td>
                        <td>
                          {{ meter_reading.unit_meter.device_serial_number }}
                        </td>
                        <td>{{ meter_reading.signal_strength }}</td>
                        <td>{{ meter_reading.temperature }} F</td>
                        <td>{{ meter_reading.battery }} %</td>
                        <td>{{ meter_reading.meter_usage }}</td>
                        <td>{{ meter_reading.meter_reading }} Gallons</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div class="tab-access">asd</div>
            </div>

             <!-- When no meter found page -->
          <div v-if="unit.unit_meter && unit.unit_meter.length == 0" class="text-center">
            <i
              >Before you can program equipment here, you will need to select a
              utility type. To get started, click below:</i
            >
            <div class="row">
              <div class="col-md-4"></div>
              <div class="col-md-2 mx-auto">
                <div class="pro-icn" @click="equipment">
                  <img
                    src="/ion-meter-bh\resources\js\dashboard\pages\equipment-page\img\meter-plain-5.png"
                  />
                </div>
              </div>
              <div class="col-md-4"></div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BaseComponentVue from "../../../components/base/BaseComponent.vue";
import BarChart  from "./chart.js";
export default {
  name: "unitPage",
  extends: BaseComponentVue,
   components: {
    BarChart
  },
  
  data() {
    return {
      loading: true,
      property_name: "",
      propertySingle:{},
      unit: {},
      meter_readings: [],
      chart_check_ins: [],
      length_mr: "",
      timestamp: "",
      reading_time: "",
      chartdata: null,
      filters:{
        start_date: "",
        end_date: "",
      },
      meterReading:{
        device_serial_number:"",
        signal_strength: 95,
        temperature:73.4,
        battery:100,
        meter_usage: "",
      }
    };
  },
  async mounted() {
    this.getUnit();
    this.getPresentTime();
    this.dateFilter();
  },

  methods: {
    async getUnit() {
      let resProp = await this.network().getPropertyName(this.$route.params.pid);
      this.propertySingle  = resProp.property;
      this.emitEvent("selected_property", this.propertySingle);
      let unitRes = await this.network().getSingleUnit(this.$route.params.id);
      if (unitRes.unit.building_id == this.$route.params.bid) {
        this.unit = unitRes.unit;
        let res = await this.network().getBuildings(this.$route.params.pid);
        this.property_name = res[0].property_name;
        if(this.unit){
        this.getMeterReading(unitRes.unit.unit_meter[0].id);
        }
      } else {
        this.utility().presentFailureToast(
          "Unit is not belongs to the specified building"
        );
      }
    },
    equipment() {
      this.route(
        "/dashboard/properties/" +
          this.$route.params.pid +
          "/equipment"
      );
    },
    property() {
      this.route(
        "/dashboard/properties/" + this.$route.params.pid + "/details"
      );
    },

    async getMeterReading(id) {
      this.loading = true;
      let res = await this.network().getMeterReading(id, this.filters);
     
      this.meter_readings = res;
    
      console.log("meterReading",this.meter_readings)

      if (this.meter_readings.length == 0) {
        this.meter_readings = [];
        this.chartdata = [];
      } else {
         
         let chartRes = await this.network().getChartMeterReading(id, this.filters)
        this.chartdata = {
          data:{
           labels: chartRes.label,
             datasets: [
          {
            type: 'line',
            data: chartRes.dataset,
            label: "meter reading",
            borderColor: "#3e95cd",
              lineTension: 0,  
            yAxisID: 'mr',
            fill: false,
            pointBackgroundColor: "rgba(1, 116, 188, 0.50)"
          },
           {
            type: 'bar',
            data: chartRes.meterUsage,
            label: "meter Usage",
            yAxisID: 'mu',
            pointBackgroundColor: "#000"
          },
         
        ],
          },
          
         options: {
             plugins: {
          datalabels: {
            color: 'transparent',
            textAlign: 'center',
            font: {
              size: 0
            }
          },
        },
           maintainAspectRatio: false,
            aspectRatio: 2,
            bezierCurve : false,
            
          scales: {
            yAxes: [
              {
                id: 'mr',
                position: 'left',
                ticks: {
                beginAtZero: false
                },
                 gridLines: {
                 color: '#fff'
                },
              },
               {
                id: 'mu',
                display: true,
                position: 'right',
                ticks: {
                  min: 0
                },
                
              }
            ],
            xAxes: [
              {
                gridLines: {
                 color: '#fff'
                },
                 grid:{
                color:'#000'
            },  ticks: {
                autoSkip : false,
                
                  beginAtZero: false
                },
              }
            ],
           
          },
           elements: {
            point: {
              radius: 0,
              hitRadius: 6,
              hoverRadius: 6
            }
          },
          legend: {
            position: "bottom"
          }
        }
        }
      this.emitEvent("selected_chart", this.chartdata);
      //  this.loaded = true
        this.length_mr = this.meter_readings.length - 1;
        let checkIn = this.meter_readings[this.length_mr].check_in;
        let str = checkIn.split(" ")[1];
        let readingTime = str.split(":")[0];
        console.log("readingTime:", readingTime);
        let date1 = new Date();
        var date2 = new Date(checkIn.split(" ")[0]);
        console.log("split::", date2);
        // To calculate the time difference of two dates
        var Difference_In_Time = date1.getTime() - date2.getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days = Math.floor(
          Difference_In_Time / (1000 * 3600 * 24)
        );
        if (Difference_In_Days == 0) {
          this.reading_time = Math.abs(readingTime - this.timestamp);
        } else {
          if (readingTime > 12) {
            readingTime = readingTime - 12;
          }
          console.log("difference days:", Difference_In_Days);

          let halfday;
          this.timestamp > 12 ? (halfday = 24) : (halfday = 12);
          this.reading_time = Math.abs(
            (readingTime - (this.timestamp + halfday)) * Difference_In_Days
          );
        }
      }
       this.loading = false;
    },
    getPresentTime: function () {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time = today.getHours();
      this.timestamp = time;
      console.log("currentime:", this.timestamp);
    },

    dateFilter(){
      var date = new Date();
      let start_date = new Date(date.getFullYear(),date.getMonth(), 2);
      start_date = start_date.toISOString();
      this.filters.start_date = start_date.split('T')[0]

      let end_date = new Date();
      end_date = end_date.toISOString();
      this.filters.end_date = end_date.split('T')[0]
    },

    async addMeterReading(deviceSerialNumber){
      this.meterReading.meter_usage = Math.floor(Math.random() * 10)
      this.meterReading.device_serial_number = deviceSerialNumber;
      let res = this.network().addMeterReading(this.meterReading);
     location.reload()
    }
  },
};
</script>

<style>
@import "styles.css";

.table-sc {
  margin-top: 30px;
  margin-bottom: 30px;
}
/* .table-sc-body {
  height: calc(70vh - 245px);
  overflow-y: scroll;
  overflow-x: hidden;
} */
/* .table-sc-body::-webkit-scrollbar {
  display: none;
} */
.inner-bx {
  padding: 20px;
}

.cstm-tbs {
  background: transparent !important;
}
.cstm-tbs.active {
  background: #fff !important;
}
div#pills-tabContent {
  background: #fff;
  padding: 15px;
  overflow-y: scroll;
  height: calc(100vh - 215px);
}
div#pills-tabContent::-webkit-scrollbar {
  display: none;
}
.feet-value {
  display: flex;
}

.feet-value p {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.vs-hide span {
  margin-right: 15px;
  text-align: center;
  font-weight: 100;
  font-size: 14px;
}
.feet-value h1 {
  font-weight: 400;
  color: #408ac0;
  margin-right: 60px;
}
.vs-hide {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}
.feet-value:hover .vs-hide {
  visibility: visible;
  opacity: 1;
}
.cubic-img img {
  width: 100%;
}
.pro-icn img {
  width: 100%;
}
.pro-icn img {
  width: 100px;
}
.pro-icn {
  text-align: right;
}
.det-list ul {
  list-style: none;
  padding-left: 0;
}
.det-list ul li {
  display: flex;
  justify-content: space-between;
  color: #c4c4c4;
  font-size: 12pt;
  border-bottom: 1px solid #c4c4c4;
  margin-bottom: 0px;
  padding: 10px;
}
.trans-grf {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
  font-size: 24px;
}
.detail-box {
  padding: 60px;
}
.btn-cstm {
  border: 1px solid #212529;
}
</style>
