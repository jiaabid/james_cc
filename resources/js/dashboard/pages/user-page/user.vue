<template>
  <div>
    <section class="properties-page">
      <div class="inner-bx">
        <div class="page-inn">
          <h2><span class="icon-users"></span> Users</h2>
          <div class="top-tbs">
            <div class="row">
              <div class="col-6">
                <div class="filter-area">
                  <!-- Button trigger modal -->
                  <div class="dropdown">
                    <button
                      class="btn btn-cstm"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      data-bs-dismiss="modal"
                    >
                      <span class="icon-plus"></span> Add Users
                    </button>
                  </div>
                </div>
              </div>
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
                      <span class="icon icon-users"></span> Permissions
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
                      <span class="icon icon-key"></span> Groups
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div class="row">
                <div class="text-right col-12">
                  <div class="filter-area-2">
                    <button
                      class="updown-btn"
                      @click="sortList"
                      v-show="users.length != 0"
                    >
                      <span class="icon-arrow-sort"></span>
                    </button>
                    <popper
                      trigger="clickToOpen"
                      :options="{
                        placement: 'bottomRight',
                      }"
                    >
                      <div class="popper col-sm-3 property-filter">
                        <div class="mt-3 text-left row p-2">
                          <div class="form-group col-sm-11">
                            <input
                              placeholder="Search"
                              type="text"
                              class="form-control"
                              id="search"
                              v-model="filters.search"
                              autocomplete="none"
                            />
                          </div>
                          <div class="text-left form-group col-sm-11">
                            <label>Roles</label>
                            <select
                              v-model="filters.role_id"
                              class="form-control"
                            >
                              <option
                                v-for="role in roles"
                                :key="role.id"
                                :value="role.id"
                              >
                                {{ role.name }}
                              </option>
                            </select>
                          </div>
                          <div class="form-group col-sm-11">
                            <button
                              type="button"
                              class="btn btn-primary col-sm-12"
                              @click="searchusers"
                            >
                              <span></span> Search
                            </button>
                          </div>
                          <div class="form-group col-sm-11">
                            <button
                              class="btn btn-light col-sm-12"
                              type="button"
                              @click="resetForm"
                            >
                              Clear Filter
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        slot="reference"
                        class="btn-filtr"
                        v-on:click="show"
                      >
                        <span
                          class="icon-filter"
                          :disabled="users.length != 0 ? 'disabled' : null"
                        ></span>
                        Filter
                      </button>
                    </popper>
                    <!-- <button class="btn-filtr" @click="openNav()">
                      <span class="icon-filter"></span>
                      Filter
                    </button> -->
                  </div>
                </div>
              </div>
              <!-- <hr /> -->

              <div class="table-box">
                <div
                  class="accordion-item"
                  v-for="user in users"
                  :key="user.id"
                >
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      :data-bs-target="'#collapseOne' + user.id"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <div class="row tb-box">
                        <div class="col-md-1" style="width: 5%">
                          <span
                            class="icon-user-A color-cyan icon-size"
                            v-if="user.role_id == 2"
                          ></span>
                          <span
                            class="icon-user-MR color-orange icon-size"
                            v-if="user.role_id == 3"
                          ></span>
                          <span
                            class="icon-user-T color-green icon-size"
                            v-if="user.role_id == 4"
                          ></span>
                          <span
                            class="icon-user-E color-green icon-size"
                            v-if="user.role_id == 5"
                          ></span>
                          <span
                            class="icon-user-B color-indigo icon-size"
                            v-if="user.role_id == 6"
                          ></span>
                        </div>
                        <div class="col-md-3">
                          <h3>{{ user.name }}</h3>
                          <p class="adrees">{{ user.role }}</p>
                        </div>
                        <div class="col-md-4">
                          <div class="warning color-gray-xxlight">
                            <span
                              class="mr-1 icon-mail color-gray-xxlight"
                            ></span>
                            {{ user.email }}
                            <!-- <small> {{ user.current_password }}</small> -->
                          </div>
                        </div>

                        <div class="col-md-2">
                          <div class="warning color-gray-xxlight">
                            <span
                              class="mr-1 icon-lock color-gray-xxlight"
                            ></span>
                            {{ user.current_password }}
                          </div>
                        </div>

                        <div class="text-right col-md-2">
                          <div class="last-btn">
                            <span class="online-indicator color-gray-light">
                            </span>
                            <span class="status color-gray-xxlight"
                              >Offline</span
                            >
                          </div>
                        </div>
                      </div>
                    </button>
                  </h2>
                  <div
                    :id="'collapseOne' + user.id"
                    class="accordion-collapse collapse user"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body"></div>
                    <div class="collaps-footer">
                      <div class="row">
                        <div class="text-left col-md-6">
                          <div class="edit">
                            <button
                              class="edt"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_user"
                              @click="fillUser(user)"
                            >
                              <span class="icon-edit"></span>
                              Edit
                            </button>
                          </div>
                        </div>
                        <div class="text-right col-md-6">
                          <div class="edit" style="justify-content: right">
                            <button
                              class="edt"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteUser"
                              @click="autofillUserId(user.id, user.name)"
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
            <div
              class="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div class="tab-access">
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
                        <span class="ml-3 mr-2 icon-key"></span> Received
                        Company Access <span class="icon-chevron-right"></span>
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <div class="key-list-bx">
                          <ul class="key-acc">
                            <li>
                              <div class="key-name">
                                <span class="icon-globe"></span> ION Energy
                                Solutions
                                <span class="has"
                                  ><span class="icon-key"></span>Has Access
                                  To</span
                                >
                              </div>
                              <div class="show-key">
                                <button
                                  class="btn btn-outline-secondary"
                                  type="button"
                                  id="show_key"
                                  onclick="switchVisible();"
                                >
                                  Show Key <span class="icon-key"></span>
                                </button>
                                <div class="keyy" id="keyy">
                                  <span
                                    class="icon-key"
                                    style="margin-right: 8px; font-size: 12pt"
                                  >
                                  </span>
                                  3XCYf_2i4zi
                                </div>
                              </div>
                            </li>
                          </ul>
                          <div class="display-message">
                            ION Energy Solutions has not been granted access to
                            any other companies...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                      >
                        <span class="ml-3 mr-2 icon-key"></span> Received
                        Company Access <span class="icon-chevron-right"></span>
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <div class="key-list-bx">
                          <ul class="key-acc">
                            <li>
                              <div class="key-name">
                                <span class="icon-globe"></span> ION Energy
                                Solutions
                                <span class="has"
                                  ><span class="icon-key"></span>Has Access
                                  To</span
                                >
                              </div>
                              <div class="show-key">
                                <button
                                  class="btn btn-outline-secondary"
                                  type="button"
                                  id="show_key2"
                                  onclick="switchVisible2();"
                                >
                                  Show Key <span class="icon-key"></span>
                                </button>
                                <div class="keyy" id="keyy2">
                                  <span
                                    class="icon-key"
                                    style="margin-right: 8px; font-size: 12pt"
                                  >
                                  </span>
                                  3XCYf_2i4zi
                                </div>
                              </div>
                            </li>
                          </ul>
                          <div class="display-message">
                            ION Energy Solutions has not been granted access to
                            any other companies...
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
        <div class="mt-3 d-flex btn-on-right">
          <a
            v-show="filters.offset != -1"
            @click="loadMoreUsers"
            type="button"
            class="btn btn-secondary btn-lg"
            >Load More</a
          >
        </div>
      </div>
      <div class="ftr-icons-area">
        <div class="row">
          <div class="col-md-6">
            <div class="fotter-cr-icon">
              <div class="icon1" v-for="role in roles" :key="role.id">
                <span
                  class="mr-1 icon-user-A color-cyan"
                  v-if="role.id == 2"
                ></span>
                <span
                  class="mr-1 icon-user-MR color-orange"
                  v-if="role.id == 3"
                ></span>
                <span
                  class="mr-1 icon-user-T color-green"
                  v-if="role.id == 4"
                ></span>
                <span
                  class="mr-1 icon-user-E color-green"
                  v-if="role.id == 5"
                ></span>
                <span
                  class="mr-1 icon-user-B color-indigo"
                  v-if="role.id == 6"
                ></span
                >{{ role.count }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Button trigger modal -->
    <!-- Modal -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              <span class="icon-users"></span>Add User
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeAdd"
            ></button>
          </div>
          <div class="modal-body">
            <div class="md-form">
              <div class="mb-3 form-group">
                <label class="mb-1">Email Address*</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="user.email"
                  placeholder="Enter Email Address or Username"
                />
                <ul
                  class="list-group"
                  v-if="errors.email.length && !user.email"
                >
                  <li
                    class="list-group-item list-group-item-danger"
                    v-for="error in errors.email"
                    :key="error.id"
                  >
                    {{ error }}
                  </li>
                </ul>
              </div>
              <div class="mb-3 form-group">
                <label class="mb-1">Full Name*</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="user.name"
                  placeholder="Enter Your Full Name"
                />
                <ul class="list-group" v-if="errors.name.length && !user.name">
                  <li
                    class="list-group-item list-group-item-danger"
                    v-for="error in errors.name"
                    :key="error.id"
                  >
                    {{ error }}
                  </li>
                </ul>
              </div>
              <div class="mb-3 form-group">
                <label class="mb-1">Role*</label>
                <select class="form-control" v-model="user.role_id">
                  <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.name }}
                  </option>
                </select>
              </div>
              <input
                hidden
                type="password"
                class="form-control"
                :placeholder="placeholder"
                v-model="user.password"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" @click="validate">
              Add User
            </button>
            <button
              class="btn btn-light"
              type="button"
              @click="closeAdd"
              data-bs-dismiss="modal"
              ref="closeAddUser"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- EDIT USER MODEL -->
    <div
      class="modal fade"
      id="edit_user"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="edit_userLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="edit_userLabel">
              <span class="icon-user"></span>Edit User Role
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeEdit"
            ></button>
          </div>
          <div class="modal-body">
            <div class="">
              <div class="mb-3 form-group">
                <label class="mb-1">Email Address</label>
                <input
                  type="email"
                  class="form-control"
                  name=""
                  v-model="user.email"
                  disabled=""
                />
              </div>
              <div class="mb-4 form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label class="mb-1">NAME</label>
                    <input
                      type="text"
                      name=""
                      placeholder="First name"
                      class="form-control"
                      v-model="user.name"
                    />
                    <ul
                      class="list-group"
                      v-if="errors.name.length && !user.name"
                    >
                      <li
                        class="list-group-item list-group-item-danger"
                        v-for="error in errors.name"
                        :key="error.id"
                      >
                        {{ error }}
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-6">
                    <label class="mb-1">Role</label>
                    <select class="form-control" v-model="user.role_id">
                      <option
                        v-for="role in roles"
                        :key="role.id"
                        :value="role.id"
                      >
                        {{ role.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="eValidate"
                >
                  Save Changes
                </button>
                <button
                  class="btn btn-light"
                  type="button"
                  @click="closeEdit"
                  data-bs-dismiss="modal"
                  ref="closeEditUser"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete USER MODEL -->
    <div
      class="modal fade"
      id="deleteUser"
      tabindex="-1"
      aria-labelledby="deletUsertLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog-centered modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteUserLabel">
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
            You are about to delete {{ user.name }}. Are you sure you want to
            proceed?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-light"
              data-bs-dismiss="modal"
              ref="closeDeleteUser"
            >
              No, Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteUser(user.id)"
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

export default {
  // import "@../../public/css/style.css";
  extends: BaseComponentVue,
  name: "user",
  components: {
    popper: Popper,
  },
  props: {
    type: {
      type: String,
      default: "text",
    },
    size: {
      type: String,
      default: "16",
    },
    characters: {
      type: String,
      default: "a-z,A-Z,0-9,#",
    },
    placeholder: {
      type: String,
      default: "Password",
    },
    auto: 1,
    value: "",
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      (vm.filters = {
        offset: 0,
        limit: 10,
        search: "",
        role_id: "",
      }),
        vm.getAllUsers();
      vm.emitEvent("selected_property", null);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.closeAddUser.click();
    this.$refs.closeEditUser.click();
    this.$refs.closeDeleteUser.click();
    next();
  },

  data() {
    return {

      users: [],
      showDiv: false,
      filters: {
        offset: 0,
        limit: 10,
        search: "",
        role_id: "",
      },
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        role_id: 4,
      },
      errors: {
        name: [],
        email: [],
        password: [],
        role_id: [],
      },
      roles: [],
      sortOrder: "asc",
      interval: null,
    };
  },
  mounted() {
    this.generate();
    this.getAllUsers();
    this.RoleCount();
  },

  methods: {
    clearObject(value) {
      if (_.isString(value)) {
        return "";
      }
      if (_.isArray(value)) {
        return [];
      }
    },
    show() {
      this.showDiv = !this.showDiv;
    },
    openNav() {
      return (document.getElementById("mySidebar").style.width = "400px");
    },
    closeNav() {
      return (document.getElementById("mySidebar").style.width = "0");
    },

    //ADD USER
    async addUser() {
      const res = await this.network().addUser(this.user);
      this.$refs.closeAddUser.click();
      // this.user = _.mapValues(this.user, this.clearObject);
      this.utility().presentSuccessToast("User added successfully!");
      let res1 = await this.network().getUsers();
      this.users = res1.users;
      this.user.id = 0;
      this.user.name = "";
      this.user.email = "";
      this.user.role_id = 4;

      //to update user count
      this.RoleCount();
      // this.interval = setTimeout(this.refreshData, 1000);
    },
    closeAdd() {
      this.user = {
        id: "",
        name: "",
        email: "",
        password: "",
        role_id: 4,
      };
    },

    async getAllUsers() {
      if (this.filters.offset == -1) {
        return;
      }

      const res = await this.network().getUsers(this.filters);
      console.log(res.users, res.offset);

      if (this.filters.search == "" && this.filters.role_id == "")
        this.users = [...this.users, ...res.users];

      this.users = [...res.users];
      if (res.users.length <= 0) {
        this.utility().presentFailureToast("No Further Users Found");
      }

      this.filters.offset = res.offset;
    },

    // FUNCTIONS FOR EDIT
    async fillUser(userItem) {
      (this.user.id = userItem.id), (this.user.name = userItem.name);
      this.user.email = userItem.email;
      this.user.role_id = userItem.role_id;
      this.user.password = userItem.password;
    },
    eValidate: function (e) {
      if (this.user.name) {
        return this.editUser();
      }

      this.errors = {
        name: [],
        email: [],
        password: [],
        role_id: [],
      };

      if (!this.user.name) {
        this.errors.name.push("Full Name is required.");
      }

      // if (!this.user.role_id) {
      //   this.errors.email.push("Role is required.");
      // }

      e.preventDefault();
    },

    async editUser() {
      let res = this.network().editUser(this.user.id, this.user);
      this.$refs.closeEditUser.click();

      this.interval = setTimeout(this.refreshData, 500);
      this.utility().presentSuccessToast("User Updated successfully!");
      this.user.id = 0;
      this.user.name = "";
      this.user.email = "";
      this.user.role_id = 4;

      //to update user count
      this.RoleCount();
    },
    async refreshData() {
      let resUser = await this.network().getUsers();
      this.users = resUser.users;
    },
    closeEdit() {
      this.user.name = "";
      this.user.email = "";
      this.user.role_id = 4;
    },

    // FUNCTIONS FOR DELETE
    autofillUserId(id, name) {
      this.user.id = id;
      this.user.name = name;
    },

    async deleteUser(id) {
      let res = await this.network().deleteUser(id);
      this.$refs.closeDeleteUser.click();
      let resUser = await this.network().getUsers();
      this.users = [...resUser.users];
      this.utility().presentSuccessToast("User Deleted successfully!");
      this.user.id = 0;
      (this.user.name = ""), (this.user.email = ""), (this.user.role_id = 4);

      //to update user count
      this.RoleCount();
    },

    async loadMoreUsers() {
      if (this.filters.offset == -1) {
        return;
      }

      const res = await this.network().getUsers(this.filters);
      console.log(res.users, res.offset, "Load More Request");

      if (res.users.length > 0) {
        this.users = [...this.users, ...res.users];
      }
      this.filters.offset = res.offset;
    },
    validate: function (e) {
      if (this.user.name && this.user.email) {
        return this.addUser();
      }

      this.errors = {
        name: [],
        email: [],
        password: [],
        role_id: [],
      };

      if (!this.user.name) {
        this.errors.name.push("Full Name is required.");
      }

      if (!this.user.email) {
        this.errors.email.push("Email is required.");
      }

      e.preventDefault();
    },

    async RoleCount() {
      const res = await this.network().getRoles();
      this.roles = res;
    },

    generate() {
      let charactersArray = this.characters.split(",");
      let CharacterSet = "";
      let passwords = "";

      if (charactersArray.indexOf("a-z") >= 0) {
        CharacterSet += "abcdefghijklmnopqrstuvwxyz";
      }
      if (charactersArray.indexOf("A-Z") >= 0) {
        CharacterSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }
      if (charactersArray.indexOf("0-9") >= 0) {
        CharacterSet += "0123456789";
      }
      if (charactersArray.indexOf("#") >= 0) {
        CharacterSet += "![]{}()%&*$#^<>~@|";
      }

      for (let i = 0; i < this.size; i++) {
        passwords += CharacterSet.charAt(
          Math.floor(Math.random() * CharacterSet.length)
        );
      }
      this.user.password = passwords;
    },
    searchusers() {
      this.filters.offset = 0;
      this.getAllUsers();
    },
    async resetForm() {
      this.filters.search = "";
      this.filters.role_id = "";
      this.filters.offset = 0;
      let res1 = await this.network().getUsers();
      this.users = res1.users;
    },
    sortList() {
      let order = this.sortOrder == "asc" ? true : false;
      this.users = [
        ...this.users.sort(function (a, b) {
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
@import "users.css";

.inner-bx {
  padding: 20px;
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
.btn-on-right {
  justify-content: right;
}

div#pills-tabContent {
  background: #fff;
  padding: 15px;
  overflow-y: scroll;
  height: calc(100vh - 308px);
}
div#pills-tabContent::-webkit-scrollbar {
  display: none;
}
</style>
