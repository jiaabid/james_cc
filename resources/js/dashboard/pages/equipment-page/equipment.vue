<template>
  <div>
    <section class="properties-page">
      <div class="inner-bx">
        <div class="page-inn">
          <div class="top-tbs">
            <div class="row">
              <!-- Navigator -->
              <div class="col-md-6">
                <div>
                  <h2>
                    <!-- @click="propertyRoute" -->
                    <span
                      class="color-gray-light text-truncate"
                      style="cursor: pointer"
                      @click="propertyDetail"
                      ><span class="mx-2 icon-property color-gray-light"></span>
                      {{ property_name }}</span
                    >
                    <span
                      class="ml-2 icon-chevron-right color-gray-light"
                    ></span>
                    <span>
                      <span class="mx-2 icon-waves"></span>Equipment
                    </span>
                  </h2>
                </div>
              </div>
              <!-- tabs -->
              <div class="text-right col-md-6 jus">
                <ul
                  class="mb-3 nav nav-pills justify-content-end"
                  id="pills-tab"
                  role="tablist"
                >
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link cstm-tbs active"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      <span class="icon icon-home"></span>
                      Units
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link cstm-tbs"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      <span class="icon icon-radio"></span>
                      Network
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Tab content -->
          <div
            class="tab-content"
            id="pills-tabContent"
            style="overflow-y: hidden"
          >
            <div
              class="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <!-- add button -->
              <div class="tb-btn">
                <div class="row">
                  <div class="col-6">
                    <div>
                      <div class="filter-area-3">
                        <div class="dropdown">
                          <button
                            class="btn btn-cstm dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span class="icon-file"></span>
                            File
                          </button>
                          <ul
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a class="dropdown-item" href="#"
                                ><span class="mr-1 icon-upload"></span> Upload a
                                CSV File</a
                              >
                            </li>
                            <li>
                              <a class="dropdown-item" href="#"
                                ><span class="mr-1 icon-download"></span>
                                Download a Backup File</a
                              >
                            </li>
                          </ul>
                        </div>
                        <div class="filter-area">
                          <div class="dropdown">
                            <button
                              class="btn btn-cstm dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <span class="icon-plus"></span>
                              Add
                            </button>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <a
                                  class="dropdown-item"
                                  href="#newAddunit"
                                  ref="openAddUnit"
                                  data-bs-toggle="modal"
                                  data-bs-target="#newAddunit"
                                  ><span class="mr-1 icon-home"></span> Add
                                  Unit</a
                                >
                              </li>
                              <li>
                                <a
                                  class="dropdown-item"
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#newunit"
                                  @click="collectUnits"
                                  ><span class="mr-1 icon-home"></span> Add
                                  Multiple Unit</a
                                >
                              </li>
                              <li>
                                <a
                                  class="dropdown-item"
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#addbilling"
                                  @click="collectUnits"
                                  ><span class="mr-1 icon-building"></span>
                                  Add a Building
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="text-right col-6">
                    <div class="filter-area-2">
                      <button
                        class="updown-btn"
                        @click="sortList"
                        :disabled="buildings.length == 0 ? 'disabled' : null"
                      >
                        <span class="icon-arrow-sort"></span>
                      </button>
                      <button
                        class="btn-filtr"
                        @click="openNav"
                        :disabled="buildings.length == 0 ? 'disabled' : null"
                      >
                        <span class="icon-filter"></span>
                        Filter
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Buildings section -->
              <div class="row cstm1">
                <div class="col-2">
                  <div class="side-ar">
                    <div class="side-area">
                      <div v-if="buildings.length != 0">
                        <!-- <router-link
                          class="side-bx"
                          v-for="buildingItem in buildings"
                          :key="buildingItem.id"
                          :to="
                            '/dashboard/properties/' +
                            $route.params.pid +
                            '/equipment/' +
                            buildingItem.id +
                            '/units'
                          "
                          >{{ buildingItem.name }}</router-link
                        > -->

                        <div
                          class="side-bx"
                          v-for="buildingItem in buildings"
                          :key="buildingItem.id"
                        >
                          <span
                            class="mt-1 mr-2 icon-building"
                            :style="[
                              buildingItem.id == buildingID
                                ? {
                                    color: '#3e89bf',
                                  }
                                : {},
                            ]"
                          ></span>

                          <a
                            style="max-width: 60%"
                            :title="buildingItem.name"
                            type="button"
                            @click="getBuildingUnit(buildingItem.id)"
                          >
                            <span
                              class="title"
                              :style="[
                                buildingItem.id == buildingID
                                  ? {
                                      color: '#3e89bf',
                                    }
                                  : {},
                              ]"
                              >{{ buildingItem.name }}
                            </span>
                          </a>
                          <button
                            class="btn btn-sm btn-light building-button"
                            @click="autoFillBuilding(buildingItem)"
                            ref="openEditBuilding"
                            data-bs-toggle="modal"
                            data-bs-target="#editbuilding"
                          >
                            <span class="icon-edit"></span>
                          </button>
                        </div>
                      </div>
                      <div v-else>No Building Found</div>
                    </div>
                    <div class="side-bt">
                      <div class="text-center">
                        <button
                          class="mt-2 btn btn-sm btn-light color-gray-light"
                          data-bs-toggle="modal"
                          data-bs-target="#addbilling"
                          @click="collectUnits"
                        >
                          <!-- <i class="mr-1 icon-plus"></i> -->
                          Add Building
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <main class="col-10" style="border-left: 1px solid #dddddd">
                  <!-- <router-view :key="$route.path"></router-view> -->
                  <!-- <h3>{{ returnBuildingNameFromId(buildingID) }}</h3> -->
                  <unitList
                    v-bind:units="units"
                    v-bind:loading="loading"
                    v-bind:buildings="buildings"
                    v-bind:manufacturers="manufacturers"
                    v-bind:devices="devices"
                    v-bind:device_types="device_types"
                    v-bind:gMeters="gMeters"

                  />
                </main>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div>
                <!-- File add -->
                <div class="tb-btn">
                  <div class="row">
                    <div class="col-md-6">
                      <div>
                        <div class="filter-area-3">
                          <div class="dropdown">
                            <button
                              class="btn btn-cstm dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <span class="icon-file"></span>
                              File
                            </button>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <a class="dropdown-item" href="#"
                                  ><span class="mr-1 icon-upload"></span> Upload
                                  a CSV File</a
                                >
                              </li>
                              <li>
                                <a class="dropdown-item" href="#"
                                  ><span class="mr-1 icon-download"></span>
                                  Download a Backup File</a
                                >
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Network Tab -->
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <div class="row tb-box">
                          <div class="col-1" style="width: 3%">
                            <span class="tile-icon icon-gw301"></span>
                          </div>
                          <div class="col-3">
                            <h3 class="title">DA100508</h3>
                          </div>
                          <div class="col-2">
                            <div class="warning">
                              <span class="mr-1 icon-refresh-cw"></span>
                              Synced 12 minutes ago
                            </div>
                          </div>
                          <div class="text-right col-2"></div>
                          <div class="text-right col-2"></div>

                          <div class="text-right col-2">
                            <div>
                              <span
                                class="
                                  ml-3
                                  icon-bar-chart-weak
                                  iface-icon
                                  color-gray-light
                                "
                              ></span>
                              <span
                                class="ml-3 iface-icon icon-ethernet color-blue"
                              ></span>
                              <span
                                class="
                                  ml-3
                                  iface-icon
                                  icon-wifi
                                  color-gray-light
                                "
                              ></span>
                            </div>
                          </div>
                        </div>
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <div class="network">
                          <div class="row">
                            <div class="col-3">
                              <div class="mp-sc">
                                <iframe
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.3115151150214!2d67.31949991484247!3d25.0574286839614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34b4e1f36973f%3A0xa505e5b594f2c03d!2sAli%20Block%20Bahria%20Town%20Karachi!5e0!3m2!1sen!2s!4v1633981670771!5m2!1sen!2s"
                                  style="border: 0"
                                  allowfullscreen=""
                                  loading="lazy"
                                ></iframe>
                              </div>
                            </div>
                            <div class="col-3">
                              <div class="cellular">
                                <div class="cl">
                                  <div>
                                    <span
                                      class="icon-cellular-off iface-icon"
                                    ></span>
                                  </div>
                                  <div>
                                    <span
                                      ><h6>Cellular</h6>
                                      <p>Inactive</p>
                                    </span>
                                  </div>
                                </div>
                                <div class="cl" style="color: #3e89bf">
                                  <div>
                                    <span
                                      class="icon-ethernet iface-icon"
                                      style="color: #3e89bf"
                                    ></span>
                                  </div>
                                  <div>
                                    <span style="color: #3e89bf"
                                      ><h6>Ethernet</h6>
                                      <p style="color: #3e89bf">Connected</p>
                                    </span>
                                  </div>
                                </div>
                                <div class="cl" style="border: none">
                                  <div>
                                    <span class="icon-wifi iface-icon"></span>
                                  </div>
                                  <div>
                                    <span
                                      ><h6>WiFi</h6>
                                      <p>Disconnected</p>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="chart">
                                <img src="img/chart2.png" alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="collaps-footer">
                        <div class="row">
                          <div class="text-left col-8">
                            <div class="edit">
                              <button class="edt" @click="unitPage()">
                                <span class="icon-align-justify"></span>
                                Description
                              </button>
                              <button
                                class="edt"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_user"
                              >
                                <span class="icon-edit"></span>
                                Edit
                              </button>
                              <button
                                class="edt"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_user"
                              >
                                <span class="icon-message-circle"></span>
                                Comments (0)
                              </button>
                              <button
                                class="edt"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_user"
                              >
                                <span class="icon-bar-chart"></span>
                                Enable Cellular
                              </button>
                              <span>
                                <div class="dropdown">
                                  <button
                                    class="edt"
                                    type="button"
                                    id="dropdownMenuButton2"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <span class="icon-chevron-up"></span>
                                    Action
                                  </button>
                                  <ul
                                    class="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton2"
                                  >
                                    <li>
                                      <a class="dropdown-item" href="#"
                                        ><span
                                          class="mr-1 icon-rotate-cw"
                                        ></span>
                                        Reset Gateway</a
                                      >
                                    </li>
                                    <li>
                                      <a class="dropdown-item" href="#"
                                        ><span class="mr-1 icon-info"></span>
                                        View Network Information
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </span>
                            </div>
                          </div>
                          <div class="text-right col-4">
                            <div class="edit2">
                              <button class="edt">
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
              </div>

              <div>
                <div class="repeat">
                  <span class="mr-1 icon-repeater"></span
                  ><span> Repeaters </span>
                </div>
                <hr />
                <div>
                  <div class="Program">
                    <span class="mr-1 icon-barcode"></span>
                    <span> Program a Repeater </span>
                  </div>
                  <div class="serial">
                    <input
                      type="search"
                      name=""
                      class="form-control"
                      placeholder="Serial Number"
                    />
                    <span class="icon-cloud-scanner"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- asdsad -->
        </div>
      </div>
    </section>

    <!-- Filter section -->
    <div id="mySidebar" class="sidebar" style="z-index: 100">
      <div class="form-box">
        <form>
          <div class="form-group">
            <div class="form-row">
              <div class="col-md-12">
                <div class="sreach">
                  <a href="javascript:void(0)" class="cls-bt" @click="closeNav"
                    >×</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="mid-form">
            <div class="form-group">
              <div class="row">
                <div class="mb-2 col-md-6">
                  <label>BUILDING</label>
                  <select
                    v-model="filters.building_id"
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
                  <!-- <input
                    type="text"
                    class="form-control"
                    v-model="buildingFilter.search"
                  /> -->
                </div>
                <div class="mb-2 col-md-6">
                  <label>UNIT</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filters.search"
                  />
                </div>
              </div>
              <div class="row">
                <div class="mb-2 col-md-6">
                  <label>SERIAL NUMBER</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filters.device_serial_number"
                  />
                </div>
                <div class="mb-2 col-md-6">
                  <label></label>
                  <div>
                    <!-- <button class="drp-btn">
                      <span
                        class="icon-all-water"
                        style="color: rgb(62, 137, 191)"
                      ></span>
                    </button> -->
                    <button
                      type="button"
                      class="drp-btn"
                      @click="meterFilter(meter.id)"
                      v-for="meter in filterMeters"
                      :key="meter.id"
                    >
                      <span
                        v-if="meter.id == 1"
                        class="icon-water"
                        :style="[
                          filters.meter_id == 1
                            ? {
                                color: 'rgb(169,169,169)',
                              }
                            : {
                                color: 'rgb(227, 81, 95)',
                              },
                        ]"
                      ></span>
                      <span
                        v-if="meter.id == 2"
                        class="icon-water"
                        :style="[
                          filters.meter_id == 2
                            ? {
                                color: 'rgb(169,169,169)',
                              }
                            : {
                                color: 'rgb(62, 137, 191)',
                              },
                        ]"
                      ></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="form">
              <div class="form-group">
                <button
                  class="btn btn-sm btn-light"
                  type="button"
                  @click="clearFilter"
                >
                  <span class="mr-2 icon-refresh-ccw"></span>
                  Clear Filter
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-primary"
                  @click="searchUnit"
                >
                  <span class="mr-2 icon-search"></span>
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- New Unit Modal -->
    <new-add-unit
      v-bind:manufacturers="manufacturers"
      v-bind:devices="devices"
      v-bind:device_types="device_types"
      v-bind:buildings="buildings"
      v-bind:allMeters="gMeters"
      @notification_emitter="notification_alert"
    ></new-add-unit>
    <div
      class="modal fade"
      id="addunit"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="addunitLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addunitLabel">
              <span class="icon-home"></span>New Unit
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeUnit"
            ></button>
          </div>
          <div class="modal-body">
            <div class="md-form">
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
                <div class="form-row" v-if="unit.meters.length > 0">
                  <div
                    class="mt-2 border col-md-12"
                    :id="'aMeter' + aMeter.meter_id"
                    v-for="aMeter in unit.meters"
                    :key="aMeter.meter_id"
                  >
                    <div class="flex-row p-2 d-flex justify-content-between">
                      <h2 class="font-weight-bolder">
                        {{ aMeter.meter_name }}
                      </h2>
                      <button
                        class="edt"
                        style="color: #000"
                        @click="removeMeter(aMeter.meter_id)"
                      >
                        <span class="icon-trash"></span>
                        Delete
                      </button>
                    </div>
                    <div>
                      <div class="form-row">
                        <div class="mb-3 col-md-4">
                          <label for="validationTooltip01"
                            >Device Serial Number*</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            v-model="aMeter.device_serial_number"
                            placeholder="Device Serial Number"
                            required
                          />
                          <div class="valid-tooltip">Looks good!</div>
                        </div>
                        <div class="col-md-4">
                          <label
                            ><span class="icon-building"></span>MANUFACTURER*
                            <popper
                              trigger="clickToOpen"
                              :options="{
                                placement: 'bottomRight',
                              }"
                            >
                              <div
                                class="popper col-sm-3"
                                style="background-color: white"
                              >
                                <div class="mt-3 text-left row p-2">
                                  <div class="form-group col-sm-10">
                                    <input
                                      autocomplete="nope"
                                      placeholder="Name"
                                      type="text"
                                      class="form-control"
                                      v-model="manufacturer.name"
                                    />
                                  </div>
                                  <div class="col-sm-6"></div>
                                  <div class="col-sm-6">
                                    <button
                                      class="
                                        btn btn-outline-primary btn-sm
                                        ml-3
                                      "
                                      @click="addManufacturer"
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <button
                                slot="reference"
                                class="btn-filtr ml-3 text-primary"
                              >
                                Add New Manufacturer
                              </button>
                            </popper>
                          </label>
                          <div>
                            <select
                              v-model="aMeter.device.manufacturer_id"
                              class="form-control"
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
                        </div>
                        <div class="col-md-4">
                          <label
                            style="
                              display: flex;
                              justify-content: space-between;
                            "
                            >Device*
                            <popper
                              trigger="clickToOpen"
                              :options="{
                                placement: 'bottomRight',
                              }"
                            >
                              <div
                                class="popper col-sm-3"
                                style="background-color: white"
                              >
                                <div class="mt-3 text-left row p-2">
                                  <div class="form-group col-sm-10">
                                    <label>Device name*</label>
                                    <input
                                      autocomplete="nope"
                                      placeholder="Name"
                                      type="text"
                                      class="form-control"
                                      v-model="device.name"
                                    />
                                  </div>
                                  <div class="form-group col-sm-10">
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
                                  <div class="form-group col-sm-10">
                                    <label>Select Device Type*</label>
                                    <select
                                      class="form-control"
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
                                  <div class="col-sm-6"></div>
                                  <div class="col-sm-6">
                                    <button
                                      class="
                                        btn btn-outline-primary btn-sm
                                        ml-3
                                      "
                                      @click="addDevice"
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <button
                                slot="reference"
                                class="btn-filtr text-primary"
                              >
                                Add New Device
                              </button>
                            </popper>
                          </label>
                          <select
                            v-model="aMeter.device_id"
                            class="form-control"
                          >
                            <option
                              v-for="device in devices.filter(
                                (x) =>
                                  x.manufacturer_id ==
                                  aMeter.device.manufacturer_id
                              )"
                              :key="device.id"
                              :value="device.id"
                            >
                              {{ device.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="mb-3 col-md-4">
                          <label for="validationTooltip03"
                            >Initial Meter Reading*</label
                          >
                          <input
                            type="number"
                            class="form-control"
                            id="validationTooltip03"
                            onkeydown="return event.keyCode !== 69 && event.keyCode !== 189 && event.keyCode !== 187 && event.keyCode !== 109 && event.keyCode !== 190"
                            v-model="aMeter.initial_meter_reading"
                            placeholder="Initial Meter Reading"
                          />
                          <!-- <div class="invalid-tooltip">
                            Please provide a valid city.
                          </div> -->
                        </div>
                        <div class="mb-3 col-md-4">
                          <label for="validationTooltip03"
                            >Meter Serial Number</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip03"
                            v-model="aMeter.meter_serial_number"
                            placeholder="Meter Serial Number"
                          />
                          <!-- <div class="invalid-tooltip">
                            Please provide a valid city.
                          </div> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="btn-add" v-if="gMeters.length > 0">
              <div class="btn-group dropup">
                <a href="javascript:;" class="" data-bs-toggle="dropdown"
                  ><span class="icon-plus"></span> Add a New Meter
                </a>
                <!-- <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">Dropup</button> -->
                <div class="dropdown-menu">
                  <a
                    type="button"
                    @click="addMeter(meter.id)"
                    class="dropdown-item"
                    v-for="meter in gMeters"
                    :key="meter.id"
                    :data-id="meter.id"
                  >
                    <span
                      v-if="meter.id == 1"
                      class="icon-water"
                      style="color: rgb(227, 81, 95)"
                    ></span>
                    <span
                      v-if="meter.id == 2"
                      class="icon-water"
                      style="color: rgb(62, 137, 191)"
                    ></span>
                    {{ meter.name }}
                  </a>
                </div>
              </div>
            </div>
            <button
              type="button"
              class="mr-2 btn btn-light"
              data-bs-dismiss="modal"
              ref="closeAddUnit"
              @click="closeUnit"
            >
              <span class="mr-1 icon-x"></span>Cancel
            </button>
            <button type="button" @click="uValidate" class="btn btn-primary">
              <span class="mr-1 icon-plus"></span>Add Unit
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Multiple units Modal -->
    <div
      class="modal fade"
      id="newunit"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="addbillingLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog-centered modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addbillingLabel">
              <span class="icon-home"></span>Add Multiple Units
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              @click="onMultiAddBuildingModalHidden"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="md-form">
              <div class="form-group">
                <div class="row">
                  <div class="col-md-12">
                    <label><span class="mr-1 icon-building"></span>NAME*</label>
                    <select
                      v-model="multipleUnits.building_id"
                      class="form-control"
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
                      class="mt-2 mb-0"
                      v-if="
                        errorsMultipleUnits.building_id.length &&
                        !multipleUnits.building_id
                      "
                      style="padding-left: 0"
                    >
                      <li
                        class="text-danger"
                        v-for="error in errorsMultipleUnits.building_id"
                        :key="error.id"
                      >
                        {{ error }}
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-12">
                    <label
                      ><span class="mr-1 icon-align-justify"></span
                      >DESCRIPTION</label
                    >
                    <input
                      type="text"
                      v-model="multipleUnits.descriptions"
                      placeholder="Building Description"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="mb-2 col-md-6">
                    <label
                      ><span class="mr-1 icon-home"></span># OF UNITS</label
                    >
                    <input
                      type="number"
                      v-model="incCounter"
                      @change="updateCounter"
                      class="form-control"
                      min="1"
                      onkeydown="return event.keyCode !== 69 && event.keyCode !== 189 && event.keyCode !== 187 && event.keyCode !== 109 && event.keyCode !== 190"
                    />
                  </div>
                  <div
                    class="mb-2 col-md-6"
                    style="display: flex; align-items: end"
                  >
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        v-model="autoIncrement"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Auto Increment
                      </label>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <ul
                      class="mb-0"
                      v-if="errorsMultipleUnits.units.length && incCounter == 0"
                      style="padding-left: 0"
                    >
                      <li
                        class="text-danger"
                        v-for="error in errorsMultipleUnits.units"
                        :key="error.id"
                      >
                        {{ error }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-md-12"
                    v-for="x in incrementUnits"
                    :key="x.id"
                  >
                    <input
                      type="text"
                      @change="collectUnits(x)"
                      v-model="x.name"
                      class="mb-2 form-control unitList"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="mr-2 btn btn-light"
              data-bs-dismiss="modal"
              ref="closeAddMultipleUnits"
              @click="onMultiAddBuildingModalHidden"
            >
              <span class="mr-1 icon-x"></span>Cancel
            </button>
            <!-- @click="addBuilding" -->
            <button type="button" class="btn btn-primary" @click="muValidate">
              <span class="mr-1 icon-plus"></span>Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Add Building -->
    <div
      ref="modal"
      class="modal fade"
      id="addbilling"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="addbillingLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog-centered modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addbillingLabel">
              <span class="icon-home"></span>Add Building
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              @click="onAddBuildingModalHidden"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="md-form">
              <div class="form-group">
                <div class="row">
                  <div class="col-md-12">
                    <label><span class="mr-1 icon-building"></span>NAME*</label>
                    <input
                      type="text"
                      v-model="addbuilding.name"
                      placeholder="Building Name"
                      class="form-control"
                    />
                    <ul
                      class="mt-2 mb-0"
                      v-if="errors.name.length && !addbuilding.name"
                      style="padding-left: 0"
                    >
                      <li
                        class="text-danger"
                        v-for="error in errors.name"
                        :key="error.id"
                      >
                        {{ error }}
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-12">
                    <label
                      ><span class="mr-1 icon-align-justify"></span
                      >DESCRIPTION</label
                    >
                    <input
                      type="text"
                      v-model="addbuilding.descriptions"
                      placeholder="Building Description"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="mb-2 col-md-6">
                    <label
                      ><span class="mr-1 icon-home"></span># OF UNITS</label
                    >
                    <input
                      type="number"
                      v-model="incCounter"
                      @change="updateCounter"
                      class="form-control"
                      min="1"
                      onkeydown="return event.keyCode !== 69 && event.keyCode !== 189 && event.keyCode !== 187 && event.keyCode !== 109 && event.keyCode !== 190"
                    />
                  </div>
                  <div
                    class="mb-2 col-md-6"
                    style="display: flex; align-items: end"
                  >
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        v-model="autoIncrement"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Auto Increment
                      </label>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <ul
                      class="mb-0"
                      v-if="errors.units.length && incCounter == 0"
                      style="padding-left: 0"
                    >
                      <li
                        class="text-danger"
                        v-for="error in errors.units"
                        :key="error.id"
                      >
                        {{ error }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-md-12"
                    v-for="x in incrementUnits"
                    :key="x.id"
                  >
                    <input
                      type="text"
                      @change="collectUnits(x)"
                      v-model="x.name"
                      class="mb-2 form-control unitList"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="mr-2 btn btn-light"
              data-bs-dismiss="modal"
              ref="closeAddBuilding"
              @click="onAddBuildingModalHidden"
            >
              <span class="mr-1 icon-x"></span>Cancel
            </button>
            <button type="button" @click="bValidate" class="btn btn-primary">
              <!-- @click="addBuilding"  -->
              <span class="mr-1 icon-plus"></span>Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Edit Building -->
    <div
      class="modal fade text-left"
      id="editbuilding"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="editbillingLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog-centered modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editbillingLabel">
              <span class="icon-home"></span>Edit Building
            </h5>
            <a
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="editBuildingCancel"
            ></a>
          </div>
          <div class="modal-body">
            <div class="md-form">
              <div class="form-group">
                <div class="row">
                  <div class="col-md-12">
                    <label><span class="mr-1 icon-building"></span>NAME*</label>
                    <input
                      type="text"
                      v-model="building.name"
                      placeholder="Building Name"
                      class="form-control"
                    />
                    <ul
                      class="mt-1"
                      v-if="errors.name.length && !building.name"
                      style="padding-left: 0"
                    >
                      <li
                        class="text-danger"
                        v-for="error in errors.name"
                        :key="error.id"
                      >
                        {{ error }}
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-12">
                    <label
                      ><span class="mr-1 icon-align-justify"></span
                      >DESCRIPTION</label
                    >
                    <input
                      type="text"
                      v-model="building.descriptions"
                      placeholder="Building Description"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger float-left"
              @click="deleteBuilding"
            >
              <span class="mr-1 icon-trash"></span>Delete
            </button>
            <button
              type="button"
              class="mr-2 btn btn-light"
              data-bs-dismiss="modal"
              ref="closeEditBuilding"
              @click="editBuildingCancel"
            >
              <span class="mr-1 icon-x"></span>Cancel
            </button>
            <button type="button" @click="ebValidate" class="btn btn-primary">
              <!-- @click="editBuilding"  -->
              <span class="mr-1 icon-plus"></span>Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- type modal -->
    <!-- <div
      class="modal fade"
      id="builder"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="builderLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="builderLabel">
              <span class="icon-meter"></span>Meter Type Builder
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="md-form">
              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label
                      ><span class="mr-1 icon-building"></span
                      >MANUFACTURER*</label
                    >
                    <div class="autocomplete" style="position: relative">
                      <input
                        id="myInput"
                        type="text"
                        name="list"
                        placeholder=""
                        v-model="meterType.manufacturer"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label>MODEL</label>
                    <select
                      name="model"
                      v-model="meterType.model"
                      class="form-control"
                      id=""
                    >
                      <option value="D10 PD Bronze">D10 PD Bronze</option>
                      <option value="WN NLC Brass">WN NLC Brass</option>
                      <option value="WN NLCH Brass">WN NLCH Brass</option>
                      <option value="WN NLCD Brass PD">WN NLCD Brass PD</option>
                      <option value="WN PC Plastic">WN PC Plastic</option>
                      <option value="WN PD Poly">WN PD Poly</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="mr-2 btn btn-light"
              data-bs-dismiss="modal"
            >
              <span class="icon-x"></span>Cancel
            </button>
            <button
              type="button"
              @click="addMeterTypeBuilder"
              class="btn btn-primary"
            >
              <span class="icon-plus"></span>save
            </button>
          </div>
        </div>
      </div>
    </div> -->

    <!-- modal ends for type builder -->
  </div>
</template>
<script>
import BaseComponentVue from "../../../components/base/BaseComponent.vue";
import Popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import NotificationBox from "./NotificationBox.vue"
import * as firebase from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export default {
  name: "equipment",
  extends: BaseComponentVue,
  components: {
    popper: Popper,
    NotificationBox: NotificationBox
  },
  data() {
    return {
      loading: false,
      property_name: "",
      building_id: "",
      property: {},
      buildings: [],
      building: {
        name: "",
        property_id: this.$route.params.pid,
        descriptions: "",
        units: [],
      },
      addbuilding: {
        name: "",
        property_id: this.$route.params.pid,
        descriptions: "",
        units: [],
      },
      multipleUnits: {
        building_id: "",
        descriptions: "",
        units: [],
      },
      errors: {
        name: [],
        units: [],
      },
      errorsMultipleUnits: {
        building_id: [],
        units: [],
      },
      errorsUnit: {
        building_id: [],
        name: [],
      },
      gMeters: [],
      filterMeters: [],
      measureList: [],

      manufacturer_id: "",

      manufacturers: [],
      manufacturer: {
        name: "",
      },
      devices: [],
      device: {
        name: "",
        manufacturer_id: "",
        device_type_id: "",
      },
      device_types: [],
      unit: {
        name: "",
        building_id: 0,
        meters: [],
      },
      filters: {
        search: "",
        device_serial_number: "",
        meter_id: "",
        type_something: "",
        building_id: 0,
      },
      buildingFilter: {
        search: "",
      },
      buildingID: 0,
      buildingName: "",
      autoIncrement: true,

      //Unit Auto increment
      incCounter: 5,
      incrementUnits: [
        {
          id: 0,
          name: "Unit-101",
        },
        {
          id: 1,
          name: "Unit-102",
        },
        {
          id: 2,
          name: "Unit-103",
        },
        {
          id: 3,
          name: "Unit-104",
        },
        {
          id: 4,
          name: "Unit-105",
        },
      ],
      buildingColor: "",
      units: [],
      notifySuccess: 0,
    };
  },

  async mounted() {
    let id = this.$route.params.bid;
    this.buildingID = id;
    this.initialize();

    // this.autocomplete(document.getElementById("myInput"), this.countries);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      (vm.filters = {
        search: "",
        device_serial_number: "",
        meter_id: "",
        type_something: "",
        building_id: 0,
      }),
        (vm.buildingFilter = {
          search: "",
        }),
        (vm.filterMeters = []);
      vm.initialize();
      vm.emitEvent("selected_property", vm.property);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.closePopper.click();
    this.$refs.closeAddBuilding.click();
    this.$refs.closeEditBuilding.click();
    this.$refs.closeAddMultipleUnits.click();
    this.emitEvent("close_modal", "yes");
    this.closeNav();
    next();
  },

  methods: {
    async initialize() {
      return new Promise(async (resolve) => {
        let property_id = this.$route.params.pid;
        const res = await this.network().getBunch({
          property_id: property_id,
        });
        console.log("all-bunch", res);
        this.buildings = res["buildings"];
        this.gMeters = res["meters"];

        this.property_name = res.property.name;
        this.property = res.property;
        console.log("property......", this.property);
        this.emitEvent("selected_property", this.property);

        this.manufacturers = res.manufacturer;
        this.measureList = res.measures;

        this.devices = res.devices;
        this.device_types = res.device_type;
        this.filterMeters = await this.network().getMeters();
        if (this.buildings.length > 0) {
          this.getUnits(this.buildings[0].id);
          this.filters.building_id = this.buildings[0].id;
          // this.getBuildingUnit(this.buildings[0].id)
        }

        resolve(true);
      });
    },
    propertyDetail() {
      this.route(
        "/dashboard/properties/" + this.$route.params.pid + "/details"
      );
    },
    notification_alert(){
      this.notifySuccess = 1;
    },
    openNav() {
      document.getElementById("mySidebar").style.width = "450px";
      document.getElementById("mySidebar").style.height = "310px";
    },
    closeNav() {
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("mySidebar").style.overflow = "hidden";
      this.clearFilter();
    },
    cantNegative(int) {
      int = parseInt(int);
      if (int < 0) l;
      return (int = 0);
    },
    updateCounter() {
      if (this.incCounter > this.incrementUnits.length) {
        this.addUnites(this.incCounter - this.incrementUnits.length);
      }

      if (this.incCounter < this.incrementUnits.length) {
        this.removeUnites(this.incrementUnits.length - this.incCounter);
      }

      if (this.incCounter < 0) {
        this.incCounter = 1;
        this.incrementUnits = [
          {
            id: 0,
            name: "Unit-101",
          },
        ];

        this.incCounter = this.incrementUnits.length;
      }

      console.log(this.incCounter, this.incrementUnits.length);
      const iu = [];
      if (this.incCounter > 0 && this.incrementUnits.length == 0) {
        this.incrementUnits = [
          {
            id: 0,
            name: "Unit-101",
          },
        ];

        this.incCounter = this.incrementUnits.length;
      }
    },
    addUnites(count) {
      var isNumber = function isNumber(value) {
        return typeof value === "number" && isFinite(value);
      };

      if (this.incrementUnits.length == 0) {
        this.incrementUnits.push({
          id: 0,
          name: "Unit-101",
        });
      }

      let x =
        this.incrementUnits.length == 1
          ? this.incrementUnits[0]
          : this.incrementUnits[this.incrementUnits.length - 1];

      const tempArr = x.name.split("-");
      let name = tempArr[0];
      if (isNumber(parseInt(tempArr[1], 10))) {
        let counter = parseInt(tempArr[1], 10);

        for (var i = 0; i < count; i++) {
          counter = counter + 1;
          let name = `${tempArr[0]}-${counter}`;
          let obj = {
            id: this.incrementUnits.length + 1,
            name: name,
          };
          this.incrementUnits.push(obj);
        }
      }
    },
    removeUnites(count) {
      var isNumber = function isNumber(value) {
        return typeof value === "number" && isFinite(value);
      };

      for (var i = 0; i < count; i++) {
        this.incrementUnits.pop();
      }
    },
    collectUnits(x) {
      if (!this.autoIncrement) {
        return;
      }

      var isNumber = function isNumber(value) {
        return typeof value === "number" && isFinite(value);
      };

      if (x.name && (x.name.match(/-/g) || []).length > 0) {
        const tempArr = x.name.split("-");
        let name = tempArr[0];
        if (isNumber(parseInt(tempArr[1], 10))) {
          let counter = parseInt(tempArr[1], 10);

          let index = this.incrementUnits.findIndex((y) => {
            return y.id == x.id;
          });

          for (var i = index + 1; i < this.incrementUnits.length; i++) {
            counter = counter + 1;
            let name = `${tempArr[0]}-${counter}`;
            this.incrementUnits[i].name = name;
          }
        }
      }
    },
    propertyRoute() {
      this.route(
        "/dashboard/properties/" + this.$route.params.pid + "/equipment"
      );
    },

    //ADD UNIT FUNCTIONS
    async getUnits(id) {
      this.buildingID = id;
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
    async getManufacturers() {
      return new Promise(async (resolve) => {
        let res = await this.network().getManufacturers();
        this.manufacturers = res;
        resolve(true);
      });
    },
    async getDevices(mId) {
      let res = await this.network().getDevices(mId);
      this.devices = res;
    },
    async getDeviceTypes() {
      let res = await this.network().getDeviceTypes();
      this.device_types = res;
    },
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
    uValidate: function (e) {
      e.preventDefault();
      if (this.unit.building_id && this.unit.name) {
        this.createdUnit();
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

    async createdUnit() {
      // this.unit.building_id = this.$route.params.bid;
      let unit = Object.assign({}, this.unit);
      // console.log(unit);

      const res = await this.network().addUnit(unit);
      console.log(res.unit);

      //   console.log("unit add ?", res.bool == false);
      this.$refs.closeAddUnit.click();
      this.utility().presentSuccessToast("Units is added successfully!");
      this.getBuildingUnit(unit.building_id);
      this.unit.name = "";
      this.unit.building_id = "";
      this.unit.meters = [];
    },
    addMeter(id) {
      const meter = this.gMeters.filter((item) => item.id === id);
      const unitMeter = {
        meter_id: id,
        meter_name: meter[0].name,
        device_serial_number: "",
        meter_serial_number: "",
        initial_meter_reading: "",
        device_id: "",
        device: {
          manufacturer_id: "",
        },
      };
      // const unit = {
      //   building_id: meter[0].id,
      //   name: meter[0].name,
      //   meters: unitMeter,
      // };
      // this.unit.building_id = this.buildingID;
      // this.attachedMeters.meterName  = meter[0].name;
      this.unit.meters.push(unitMeter);
      // this.unit.attachedMeters.push(unitMeter);

      const meterToBeRemove = this.gMeters
        .map(function (item) {
          return item.id;
        })
        .indexOf(id);
      // console.log(meter, 'Attached Meter');
      this.gMeters.splice(meterToBeRemove, 1);
    },
    //Add building code
    bValidate: function (e) {
      if (this.addbuilding.name && this.incCounter != 0) {
        this.errors.name = [];
        this.errors.units = [];
        return this.addBuilding();
      }

      this.errors = {
        name: [],
        units: [],
      };

      if (!this.addbuilding.name) {
        this.errors.name.push("Building name is required.");
      }
      if (this.incCounter == 0) {
        this.errors.units.push("Unit is required.");
      }
    },

    async addBuilding() {
      this.building = this.addbuilding;
      this.building.units = this.incrementUnits;
      let res = await this.network().addBuilding(this.building);
      this.$refs.closeAddBuilding.click();
      this.buildings = [...this.buildings, res.building];
      this.utility().presentSuccessToast("Building added successfully!");
      this.building.name = "";
      this.building.descriptions = "";
      this.getBuildingUnit(res.building.id);
      //   this.route(
      //     "/dashboard/properties/" +
      //       this.$route.params.pid +
      //       "/equipment/" +
      //       res.building.id +
      //       "/units"
      //   ).catch(() => {
      //     this.$router.go(0);
      //   });
    },
    async updateBuilding() {
      const update = {
        name: this.building.name,
        descriptions: this.building.descriptions,
      };
      console.log("building_id", this.building_id);
      let res = await this.network().updateBuilding(this.building_id, update);
      this.$refs.closeEditBuilding.click();
      let resBuilding = await this.network().getBuildings(
        this.$route.params.pid,
        this.buildingFilter
      );
      this.buildings = [...resBuilding];
      this.utility().presentSuccessToast("Building Updated successfully!");
      this.building.name = "";
      this.building.descriptions = "";
    },
    autoFillBuilding(buildingItem) {
      this.building.name = buildingItem.name;
      this.building.descriptions = buildingItem.descriptions;
      this.building_id = buildingItem.id;
      this.units = buildingItem.units;
      this.getBuildingUnit(buildingItem.id);
    },
    editBuildingCancel() {
      (this.addbuilding.name = ""), (this.addbuilding.descriptions = "");
    },
    ebValidate() {
      if (this.building.name) {
        return this.updateBuilding();
      }

      this.errors = {
        name: [],
      };

      if (!this.building.name) {
        this.errors.name.push("Building Name is required.");
      }
    },
    async deleteBuilding() {
      const res = await this.network().deleteBuilding(this.building_id);
      this.$refs.closeEditBuilding.click();
      this.utility().presentSuccessToast("Building is deleted successfully!");
      let bindex = this.buildings.findIndex((x) => x.id == this.building_id);
      if (bindex != -1) {
        this.buildings.splice(bindex, 1);

        this.emitEvent("clear_units", this.building_id);
      }

      if (this.buildings.length > 0) {
        // this.building_id = this.buildings[0].id;
        // this.units = this.buildings[0].units
        this.getBuildingUnit(this.buildings[0].id);
      } else {
        this.units = [];
      }
    },
    async addMultipleUnits() {
      this.multipleUnits.units = this.incrementUnits;
      let res = await this.network().addMultipleUnits(this.multipleUnits);
      this.$refs.closeAddMultipleUnits.click();
      console.log(res, this.multipleUnits.units);
      if (res.length > 0) {
        this.utility().presentSuccessToast("Units are added successfully!");
        this.getBuildingUnit(res[0].building_id);
      }

      this.multipleUnits.building_id = "";
      this.multipleUnits.descriptions = "";
      this.multipleUnits.units = [];
      //   //   this.emitEvent("selected_building_for_unit", this.$route.params.bid);
      //   //this.getBuildingUnit(unit.building_id);
      //   console.log("multi unit", res, this.multipleUnits.units);
      //   this.multipleUnits.building_id = "";
      //   this.multipleUnits.descriptions = "";
      //   this.multipleUnits.units = [];
    },

    async propertyName() {
      return new Promise(async (resolve) => {
        let res = await this.network().getPropertyName(this.$route.params.pid);
        this.property_name = res.property.name;
        this.property = res.property;
        console.log("property......", this.property);
        let item = this.property_name;
        // to get the property submenu
        this.emitEvent("selected_property", this.property);
        resolve(true);
      });
    },

    async getBuildings() {
      return new Promise(async (resolve) => {
        let id = this.$route.params.pid;
        try {
          let res = await this.network().getBuildings(id, this.buildingFilter);
          this.buildings = res;

          if (this.buildings.length > 0) {
            this.getBuildingUnit(this.buildings[0].id);
          }
          resolve(true);
        } catch (e) {
          console.log(e, "get building errors!");
          resolve(false);
        }
      });
    },

    async getMeters() {
      return new Promise(async (resolve) => {
        try {
          let res = await this.network().getMeters();
          this.gMeters = res;
          resolve(true);
        } catch (e) {
          console.log(e, "get building errors!");
          resolve(false);
        }
      });
    },

    async getUnitsOfMeasure() {
      return new Promise(async (resolve) => {
        try {
          let res = await this.network().getUnitsOfMeasure();
          this.measureList = res;
          resolve(true);
        } catch (e) {
          console.log(e, "get getUnitsOfMeasure errors!");
          resolve(false);
        }
      });
    },

    getBuildingUnit(id) {
      this.buildingID = id;
      this.filters.building_id = id;
      this.getUnits(id);
      //   const pid = this.$route.params.pid;
      //   this.route(
      //     "/dashboard/properties/" + pid + "/equipment/" + id + "/units"
      //   );
    },

    returnBuildingNameFromId(id) {
      let building = this.buildings.find((x) => x.id == id);
      return building ? building.name : "";
    },

    removeMeter(id) {
      const meter = this.unit.meters.filter((item) => item.meter_id === id);
      const nMeter = {
        id: meter[0].meter_id,
        name: meter[0].meter_name,
      };
      this.gMeters.push(nMeter);

      const meterToBeRemove = this.unit.meters
        .map(function (item) {
          return item.meter_id;
        })
        .indexOf(id);
      this.unit.meters.splice(meterToBeRemove, 1);
      // console.log(meter, 'A?ttached Meter');
      const meterForm = document.getElementById("aMeter" + id);
      meterForm.remove();
      // this.meters.sort();
    },

    // filtration in tha data
    async searchUnit() {
      const item = this.filters;
      if (!this.filters.building_id) {
        this.utility().presentFailureToast("building selection required");
        return;
      }
      this.buildingID = this.filters.building_id;
      this.getUnits(this.filters.building_id);
      // this.units = this.buildings[this.filters.building_id].units;

      //   let resBuilding = await this.network().getBuildings(
      //     this.$route.params.pid,
      //     this.buildingFilter
      //   );
      //   this.buildings = [...resBuilding];
    },
    async clearFilter() {
      this.units = [];
      this.filters.search = "";
      this.filters.type_something = "";
      this.filters.device_serial_number = "";
      this.filters.meter_id = "";
      this.buildingFilter.search = "";
      let resBuilding = await this.network().getBuildings(
        this.$route.params.pid,
        this.buildingFilter
      );

      // this.buildingID = this.filters.building_id
      if (this.filters.building_id) {
        this.getUnits(this.filters.building_id);
      } else {
        this.getUnits(this.buildings[0].id);
      }
      this.buildings = [...resBuilding];
    },
    meterFilter(id) {
      this.filters.meter_id = id;
    },

    autocomplete(inp, arr) {
      /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
      var currentFocus;
      /*execute a function when someone writes in the text field:*/
      inp.addEventListener("input", function (e) {
        var a,
          b,
          i,
          val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
          return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML =
              "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function (e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
            });
            a.appendChild(b);
          }
        }
      });
      /*execute a function presses a key on the keyboard:*/
      inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) {
          //up
          /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
      });
      function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
      }
      function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
        }
      }
      function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      /*execute a function when someone clicks in the document:*/
      document.addEventListener("click", function (e) {
        closeAllLists(e.target);
      });
    },
    sortList() {
      this.emitEvent("sort_units", "unit");
    },
    onAddBuildingModalHidden() {
      this.errors = {
        name: [],
        units: [],
      };
      this.building.name = "";
      this.incCounter = 5;
      (this.incrementUnits = [
        {
          id: 0,
          name: "Unit-101",
        },
        {
          id: 1,
          name: "Unit-102",
        },
        {
          id: 2,
          name: "Unit-103",
        },
        {
          id: 3,
          name: "Unit-104",
        },
        {
          id: 4,
          name: "Unit-105",
        },
      ]),
        (this.building.descriptions = "");
    },
    onMultiAddBuildingModalHidden() {
      this.errorsMultipleUnits = {
        building_id: [],
        units: [],
      };
      this.incCounter = 5;
      (this.incrementUnits = [
        {
          id: 0,
          name: "Unit-101",
        },
        {
          id: 1,
          name: "Unit-102",
        },
        {
          id: 2,
          name: "Unit-103",
        },
        {
          id: 3,
          name: "Unit-104",
        },
        {
          id: 4,
          name: "Unit-105",
        },
      ]),
        (this.multipleUnits.building_id = "");
      this.multipleUnits.descriptions = "";
    },
    muValidate: function (e) {
      e.preventDefault();
      if (this.multipleUnits.building_id && this.incCounter != 0) {
        return this.addMultipleUnits();
      } else {
        this.errorsMultipleUnits = {
          building_id: [],
          units: [],
        };

        if (!this.multipleUnits.building_id) {
          this.errorsMultipleUnits.building_id.push("Building is required.");
        }

        if (this.incCounter == 0) {
          this.errorsMultipleUnits.units.push("Unit is required.");
        }
      }
    },

    async closeUnit() {
      this.filterMeters = await this.network().getMeters();

      this.unit.name = "";
      this.unit.building_id = 0;
      this.unit.meters = [];
      this.errorsUnit.building_id = "";
      this.errorsUnit.name = "";
      this.gMeters = await this.network().getMeters();
    },
    /*An array containing all the country names in the world:*/

    /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
  },
};
</script>
<style scoped>
@import "styles.css";
.inner-bx {
  padding: 20px;
  min-width: 930px;
}
.page-inn h2 span {
  margin-right: 5px;
}
.page-inn h2 {
  font-size: 16pt;
  border-bottom: 1px solid #d7d7d7;
  padding-bottom: 10px;
  font-weight: 400;
}
.btn-cstm {
  border: 1px solid #212529;
}
button.updown-btn {
  background: transparent;
  border: none;
}
button.btn-filtr {
  background: transparent;
  border: none;
}
.filter-area-2 {
  text-align: right;
}
button.accordion-button {
  background: #ffff;
  outline: none !important;
  box-shadow: none !important;
}
.last-btn {
  text-align: right !important;
}
span.material-icons-outlined {
  position: relative;
  top: 5px;
  margin-left: 5px;
}
p.adrees span {
  font-size: 16px;
  top: 3px;
  margin-left: 0px !important;
}
p.adrees {
  font-size: 13px;
  color: gray;
}
.tb-box {
  color: #666;
}
.map iframe {
  width: 100%;
  height: 250px;
}
/* //type builder css */

.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
}

.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}

/*when hovering an item:*/
.autocomplete-items div:hover {
  background-color: #e9e9e9;
}

/*when navigating through the items using the arrow keys:*/
.autocomplete-active {
  background-color: DodgerBlue !important;
  color: #ffffff;
}

.meter-img {
  position: relative;
}

span.meter-value {
  position: absolute;
  left: 0;
  right: 0;
  top: 37%;
  text-align: center;
}

.meter-img img {
  width: 100%;
}

#accordionExample,
.side-ar {
  height: calc(100vh - 247px);
  overflow-y: scroll;
  position: relative;
}

#accordionExample::-webkit-scrollbar,
.side-ar::-webkit-scrollbar {
  display: none;
}

#pills-home {
  height: 100%;
  overflow: hidden;
}

.row.cstm1 {
  height: calc(100% - 30px);
  overflow: scroll;
}
</style>
