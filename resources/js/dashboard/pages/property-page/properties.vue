<template>
  <section class="properties-page">
    <div class="inner-bx">
      <div class="page-inn">
        <h2><span class="lnr lnr-apartment"></span>Properties</h2>
        <div class="row">
          <div class="col-6">
            <div class="filter-area">
              <div class="dropdown">
                <button
                  class="btn btn-cstm dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="icon-plus"></span> Add Property
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a
                      class="dropdown-item"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      href="#"
                      ><span class="mr-1 icon-property"></span> Add Property</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="#"
                      ><span class="mr-1 icon-upload"></span> Upload Property
                      Files</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- Add Propert Modal  starts here-->
          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h2 class="modal-title" id="exampleModalCenterTitle">
                    <span class="tile-icon icon-property"></span> New Property
                  </h2>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label for="name">Name*</label>
                      <input
                        placeholder="Propery Name"
                        type="text"
                        class="form-control"
                        id="name"
                        aria-describedby="Name"
                        v-model="property.name"
                      />
                      <ul
                        class="mt-1"
                        v-if="errors.name.length"
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
                    <div class="form-group">
                      <label for="address">Address*</label>
                      <input
                        placeholder="Propery Address"
                        type="text"
                        class="form-control"
                        id="address"
                        v-model="property.street"
                        maxlength="255"
                      />
                      <ul
                        class="mt-1"
                        v-if="errors.street.length"
                        style="padding-left: 0"
                      >
                        <li
                          class="text-danger"
                          v-for="error in errors.street"
                          :key="error.id"
                        >
                          {{ error }}
                        </li>
                      </ul>
                    </div>
                    <div class="form-group">
                      <label for="billing-company">BILLING COMPANY* </label>
                      <select
                        v-model="property.billing_company_id"
                        class="form-control"
                      >
                        <option
                          v-for="billing in billings"
                          :key="billing.id"
                          :value="billing.id"
                        >
                          {{ billing.name }}
                        </option>
                      </select>
                      <ul
                        class="mt-1"
                        v-if="errors.billing_company_id.length"
                        style="padding-left: 0"
                      >
                        <li
                          class="text-danger"
                          v-for="error in errors.billing_company_id"
                          :key="error.id"
                        >
                          {{ error }}
                        </li>
                      </ul>
                    </div>
                    <div class="form-group">
                      <label for="management-company"
                        >MANAGEMENT COMPANY*</label
                      >
                      <select
                        v-model="property.management_company_id"
                        class="form-control"
                      >
                        <option
                          v-for="management in managements"
                          :key="management.id"
                          :value="management.id"
                        >
                          {{ management.manager_name }}
                        </option>
                      </select>
                      <ul
                        class="mt-1"
                        v-if="errors.management_company_id.length"
                        style="padding-left: 0"
                      >
                        <li
                          class="text-danger"
                          v-for="error in errors.management_company_id"
                          :key="error.id"
                        >
                          {{ error }}
                        </li>
                      </ul>
                    </div>
                    <div class="form-group">
                      <label for="custom-id">CUSTOM ID (OPTIONAL)</label>
                      <input
                        placeholder="Custome Specific ID "
                        type="text"
                        class="form-control"
                        id="custom-id"
                        v-model="property.property_id"
                      />
                    </div>
                    <div class="form-group">
                      <label for="customer-name">Customer Name</label>
                      <input
                        placeholder="Customer Name"
                        type="text"
                        class="form-control"
                        id="customer-name"
                        v-model="property.contact_name"
                      />
                    </div>
                    <div class="form-group">
                      <label for="title-jd">Title / Job Description</label>
                      <input
                        placeholder="Title/ Job Description"
                        type="text"
                        class="form-control"
                        id="title-jd"
                        v-model="property.contact_title"
                      />
                    </div>
                    <div class="form-group">
                      <label for="phone">Phone </label>
                      <input
                        placeholder="Phone"
                        type="text"
                        class="form-control"
                        id="phone"
                        v-model="property.contact_phone"
                      />
                    </div>
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input
                        placeholder="Email"
                        type="text"
                        class="form-control"
                        id="email"
                        v-model="property.contact_email"
                      />
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    ref="closeProperty"
                  >
                    Close
                  </button>
                  <button
                    @click="validate"
                    type="button"
                    class="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Add Property Modal ends here -->
          <!-- FILTER  Modal Starts here -->
          <div class="col-6">
            <div class="filter-area-2">
              <button class="updown-btn" @click="sortList">
                <span class="icon-arrow-sort"></span>
              </button>
              <popper
                trigger="clickToOpen"
                :options="{
                  placement: 'bottomRight',
                }"
              >
                <div class="popper col-sm-3 property-filter">
                  <form class="mt-3 text-left row p-2">
                    <div class="form-group col-sm-11">
                      <input
                        placeholder="Search"
                        type="text"
                        class="form-control"
                        id="search"
                        v-model="filters.search"
                      />
                    </div>
                    <div class="text-left form-group col-sm-11">
                      <label for="billing-company">BILLING COMPANY </label>
                      <!--                        v-on:input="getAllProperties"-->
                      <select
                        class="form-control"
                        id="billing-company"
                        v-model="filters.billing"
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

                    <div class="form-group col-sm-11">
                      <label for="locaiton">Location</label>
                      <input
                        type="text"
                        class="form-control"
                        id="locaiton"
                        v-model="filters.location"
                      />
                    </div>
                    <div class="form-group col-sm-11">
                      <a
                        type="button"
                        class="btn btn-primary col-sm-12"
                        @click="doSearch"
                      >
                        <span></span> Search
                      </a>
                    </div>
                    <div class="form-group col-sm-11">
                      <a
                        type="button"
                        class="btn btn-light col-sm-12"
                        @click="resetForm"
                      >
                        <span></span> Clear Filter</a
                      >
                    </div>
                  </form>
                </div>

                <button slot="reference" class="btn-filtr" v-on:click="show">
                  <span class="icon-filter"></span>
                  Filter
                </button>
              </popper>
            </div>
          </div>
        </div>
        <hr />
        <div class="table-box">
          <div
            class="accordion"
            v-for="property in properties"
            :key="property.id"
            :id="'accordionExample-' + property.id"
          >
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#collapseOne' + property.id"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <div class="row tb-box">
                    <div class="col-md-1">
                      <span class="tile-icon icon-property"></span>
                    </div>
                    <div class="col-md-4">
                      <h3 style="max-height: 53px; overflow: hidden;">
                        {{ property.name }}-{{ property.street }} -
                        {{ property.property }}
                      </h3>
                      <p class="adrees">
                        <span class="material-icons-outlined"> place </span
                        >{{ property.city }}, {{ property.st }} (7885 mi)
                      </p>
                    </div>
                    <div class="col-md-1">
                      <div
                        class="warning"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Alert Count"
                      >
                        3<span class="icon-alert-triangle"></span>
                      </div>
                    </div>
                    <div class="col-md-1">
                      <div
                        class="home"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Unit Count"
                      >
                        {{ property.unit_count }}<span class="icon-home"></span>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <div
                        class="home"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Device Count"
                      >
                        3<span class="icon-transceiver"></span>
                      </div>
                    </div>
                    <div class="text-right col-md-3">
                      <div class="last-btn">
                        <span class="icon-bar-chart-weak"> </span>
                        <span class="icon-gw301"> </span>
                      </div>
                    </div>
                  </div>
                </button>
              </h2>
              <div
                :id="'collapseOne' + property.id"
                class="accordion-collapse collapse"
                aria-labelledby="headingOne"
                :data-bs-parent="'#accordionExample-' + property.id"
              >
                <div class="accordion-body" style="padding: 0">
                  <div class="map-sc">
                    <div class="row">
                      <div class="col-md-3" style="padding: 0">
                        <div class="map">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14468.024787266106!2d66.9868871!3d24.965903799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1633537774180!5m2!1sen!2s"
                            style="border: 0; height: 285px"
                            allowfullscreen=""
                            loading="lazy"
                          ></iframe>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="list-box">
                          <ul>
                            <li class="detail">DETAILS</li>
                            <li>
                              <span class="icon-globe detail-icon"> </span>
                              {{ property.billing_company }}
                            </li>
                            <li>
                              <span class="icon-folder"> </span> MDHA/SPPlus
                            </li>
                            <li>
                              <span class="icon-map-pin"> </span>
                              {{ property.city }}, {{ property.st }}
                              (7885 mi)
                            </li>
                            <li>
                              <span class="mr-1"
                                ><span class="icon-building"> </span>
                                {{ property.building_count }}</span
                              >
                              <span class="icon-home"> </span>
                              {{ property.unit_count }}
                            </li>
                            <li>
                              <span class="mr-1"
                                ><span class="icon-gw301"></span> 1</span
                              >
                              <span class="mr-1"
                                ><span class="icon-repeater"></span> 1</span
                              >
                              <span class="mr-1"
                                ><span class="icon-transceiver"></span> 1</span
                              >
                            </li>
                            <li>
                              <span class="icon-check-square"> </span> Install
                              Complete
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div>
                          <div class="chart-inner">
                            <canvas
                              id="BA-chart-job-error"
                              width="300"
                              height="230"
                            ></canvas>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="collaps-footer">
                  <div class="row">
                    <div class="text-left col-md-6">
                      <div class="edit">
                        <button
                          :style="child.cursor"
                          class="edt"
                          v-for="child in propertyMenus"
                          :disabled="child.disabled"
                          :key="child.id"
                          @click="redirectTo(child.link, property)"
                        >
                          <span :class="child.icon"></span> {{ child.label }}
                        </button>
                      </div>
                    </div>
                    <div class="text-right col-md-6">
                      <div class="pull-right edit">
                        <button
                          class="edt"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteProperty"
                          @click="
                            autofillPropertyId(property.id, property.name)
                          "
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
        </div>
      </div>
      <div class="mt-3 pb-2 d-flex btn-on-right">
        <a
          v-show="filters.offset != -1"
          @click="loadMoreProperties"
          type="button"
          class="btn btn-secondary btn-lg"
          >Load More</a
        >
      </div>

      <!-- Delete Property MODEL -->
      <div
        class="modal fade"
        id="deleteProperty"
        tabindex="-1"
        aria-labelledby="deletePropertyLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog-centered modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deletePropertyLabel">
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
              You are about to delete {{ property.name }}. Are you sure you want
              to proceed?
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-light"
                data-bs-dismiss="modal"
                ref="closeDeleteProperty"
              >
                No, Cancel
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="propertyDelete(property.id)"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseComponentVue from "../../../components/base/BaseComponent.vue";
// import EventBus from "../../../components/base/event-bus.js";

import Popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "properties",
  extends: BaseComponentVue,
  components: {
    popper: Popper,
    DatePicker: DatePicker,
  },
  mounted() {
    this.getAllProperties();
    this.getBillings();
    this.getManagements();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      (vm.filters = {
        offset: 0,
        limit: 10,
        search: "",
        billing: "",
        management: "",
        location: "",
      }),
        vm.getAllProperties();
      vm.emitEvent("selected_property", null);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.closeProperty.click();
    this.$refs.closeDeleteProperty.click();

    next();
  },
  beforeDestroy() {
    clearTimeout(this.interval);
  },
  data() {
    return {
      core_url: process.env.MIX_core_url,
      showDiv: false,
      interval: null,
      id: "",
      propertyMenus: [
        {
          id: 1,
          label: "Details",
          link: "/details",
          icon: "icon-icon icon-layout",
        },
        {
          id: 2,
          label: "Equipment",
          link: "/equipment",
          icon: "icon-icon icon-layout",
        },
        {
          id: 3,
          label: "Report",
          link: "",
          icon: "icon-icon icon-layout",
          cursor: "cursor:context-menu",
          disabled: "disabled",
        },
        {
          id: 4,
          label: "Alerts",
          link: "",
          icon: "icon-icon icon-layout",
          cursor: "cursor:context-menu",
          disabled: "disabled",
        },
        {
          id: 5,
          label: "Program",
          link: "",
          icon: "icon-edit",
          cursor: "cursor:context-menu",
          disabled: "disabled",
        },
      ],
      billings: [],
      managements: [],
      properties: [],
      filters: {
        offset: 0,
        limit: 10,
        search: "",
        billing: "",
        management: "",
        location: "",
      },
      property: {
        name: "",
        property_id: "",
        street: "",
        city: "",
        st: "",
        office_contact_number: "",
        contact_name: "",
        contact_title: "",
        contact_phone: "",
        contact_email: "",
        billing_company_id: "",
        management_company_id: "",
        maintainance_name: "",
        maintainance_email: "",
        maintainance_phone_number: "",
        maintainance_superviser_name: "",
        maintainance_superviser_email: "",
        maintainance_superviser_contact: "",
        developer: "",
        units: "",
        target_adc: "",
      },
      errors: {
        name: [],
        property_id: [],
        street: [],
        city: [],
        st: [],
        office_contact_number: [],
        contact_name: [],
        contact_title: [],
        contact_phone: [],
        contact_email: [],
        billing_company_id: [],
        management_company_id: [],
        maintainance_name: [],
        maintainance_email: [],
        maintainance_phone_number: [],
        maintainance_superviser_name: [],
        maintainance_superviser_email: [],
        maintainance_superviser_contact: [],
        property: [],
        developer: [],
        units: [],
        target_adc: [],
      },
      createdAfter: "",
      createdBefore: "",
      sortOrder: "asc",
    };
  },

  methods: {
    doSearch() {
      this.filters.offset = 0;
      this.getAllProperties();
    },
    redirectTo(url, item) {
      this.$forceUpdate();
      url = "properties/" + item.id + url;
      this.emitEvent("selected_property", item);
      this.emitEvent("empty_unit", item);

      this.route(url);
    },
    show() {
      this.showDiv = !this.showDiv;
    },

    openProperty(item) {
      //return alert(item);
      // items = ['data', 'data3']
      // this.emitEvent("selected_property", item);
      // this.EventBus
    },
    clearObject(value) {
      if (_.isString(value)) {
        return "";
      }
      if (_.isArray(value)) {
        return [];
      }
    },
    async getAllProperties() {
      if (this.filters.offset == -1) {
        return;
      }

      const res = await this.network().getProperties(this.filters);
      // if (res.properties.length > 0) {
      if (
        this.filters.search == "" &&
        this.filters.billing == "" &&
        this.filters.location == ""
      ) {
        this.properties = [...this.properties, ...res.properties];
      }

      this.properties = [...res.properties];
      if (res.users && res.users.length <= 0) {
        this.utility().presentFailureToast("No Further Properties Found");
      }

      this.filters.offset = res.offset;
    },

    async getBillings() {
      try {
        const res = await this.network().getBillings();
        this.billings = res.billingCompany;
      } catch (e) {
        console.log(e, "GET BILLLING ERRORS");
      }
    },
    async getManagements() {
      try {
        const res = await this.network().getManagers();
        this.managements = res.managementCompany;
      } catch (e) {
        console.log(e, "GET Manager ERRORS");
      }
    },
    async loadMoreProperties() {
      if (this.filters.offset == -1) {
        return;
      }

      const res = await this.network().getProperties(this.filters);
      console.log(res);
      if (res.properties.length > 0) {
        if (
          this.filters.search == "" &&
          this.filters.billing == "" &&
          this.filters.location == ""
        ) {
          this.properties = [...this.properties, ...res.properties];
        } else {
          this.properties = [...res.properties];
        }

        console.log(this.properties);
      }

      this.filters.offset = res.offset;
    },
    async addProperty() {
      const res = await this.network().addProperty(this.property);
      this.$refs.closeProperty.click();
      this.property = _.mapValues(this.property, this.clearObject);
      this.utility().presentSuccessToast("Property added successfully!");
      this.interval = setTimeout(this.refreshData, 1000);
    },

    async refreshData() {
      const res = await this.network().getProperties();
      this.properties = res.properties;
    },
    validate: function (e) {
      if (
        this.property.name &&
        this.property.street &&
        this.property.management_company_id &&
        this.property.billing_company_id
      ) {
        return this.addProperty();

        // return alert('Validated');
      }

      this.errors = {
        name: [],
        property_id: [],
        street: [],
        city: [],
        st: [],
        office_contact_number: [],
        contact_name: [],
        contact_title: [],
        contact_phone: [],
        contact_email: [],
        billing_company_id: [],
        management_company_id: [],
        maintainance_name: [],
        maintainance_email: [],
        maintainance_phone_number: [],
        maintainance_superviser_name: [],
        maintainance_superviser_email: [],
        maintainance_superviser_contact: [],
        property: [],
        developer: [],
        units: [],
        target_adc: [],
      };

      if (!this.property.name) {
        this.errors.name.push("Property Name is required.");
      }
      if (!this.property.street) {
        this.errors.street.push("Property Address is required.");
      }
      if (!this.property.management_company_id) {
        this.errors.management_company_id.push(
          "Management company is required."
        );
      }
      if (!this.property.billing_company_id) {
        this.errors.billing_company_id.push("Management company is required.");
      }
    },
    autofillPropertyId(id, name) {
      this.property.id = id;
      this.property.name = name;
    },
    async propertyDelete(id) {
      const res = await this.network().deleteProperty(id);
      this.$refs.closeDeleteProperty.click();
      this.utility().presentSuccessToast("Property is deleted successfully!");
      this.property.id = "";
      this.property.name = "";
      this.interval = setTimeout(this.refreshData, 1000);
    },
    resetForm() {
      this.filters.search = "";
      this.filters.billing = "";
      this.filters.location = "";
      this.filters.offset = 0;
      this.interval = setTimeout(this.refreshData, 1000);
    },
    sortList() {
      let order = this.sortOrder == "asc" ? true : false;
      this.properties = [
        ...this.properties.sort(function (a, b) {
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
    },
  },
};
</script>


<style scoped>
@import "properties.css";
/* .mx-datepicker .mx-calendar .mx-calendar-panel-date{
  z-index: 1000;
} */
.popper.col-sm-8.z-index-1 {
  z-index: 1;
}
.popper.col-sm-2 {
  transform: none !important;
  right: 0px !important;
  left: 83% !important;
  top: 31% !important;
}
.table-box {
  height: calc(100vh - 270px);
  overflow-y: scroll;
}

.table-box::-webkit-scrollbar {
  display: none;
}

.btn-on-right {
  justify-content: right;
}
</style>
