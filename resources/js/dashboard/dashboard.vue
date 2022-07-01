<template>
  <div class="d-flex" id="wrapper">
    <!-- Sidebar-->
    <div class="sidebr">
      <div id="">
        <div class="logo-bar">
          <img src="/images/logo.png" alt="logo" />
        </div>
        <sidemenu></sidemenu>
      </div>
    </div>
    <!-- Page content wrapper-->
    <div id="page-content-wrapper">
      <!-- Top navigation-->
      <nav
        class="
          bg-white
          navbar navbar-expand-lg navbar-light
          border-bottom
          sticky-top
        "
      >
        <div class="container-fluid" style="padding: 0 !important">
          <!-- <span class="icon-menu" @click="toggleSideBar"> </span> -->
          <div class="search-bx-icon">
            <span class="icon-search"> </span>
            <input
              type="search"
              name=""
              onkeydown=""
              placeholder="Search"
              @input="searching"
              v-model="filter.search"
            />
          </div>

          <!---------------- notification ---------------->
          <popper
            trigger="clickToOpen"
            :options="{
              placement: 'top',
              modifiers: { offset: { offset: '10px,10px' } },
            }"
          >
            <div class="popper-1">
              <ul class="drop">
                <div class="head">
                  <i
                    class="fa fa-bell"
                    style="
                      margin-right: 12px;
                      margin-left: 3px;
                      margin-top: 8px;
                      font-size: 15px;
                    "
                  ></i>
                  <span style="font-size: 20px">Notifications</span>
                </div>
                <hr />
                <li style="margin-left: -10px">
                  <a class="dropdown-item border-radius-md" href="javascript:;">
                    <div class="d-flex">
                      <div class="my-auto">
                        <img
                          src="/public/images/drake.jpg"
                          class="avatar avatar-sm bg-gradient-dark me-3"
                        />
                      </div>
                      <div
                        class="d-flex flex-column justify-content-center"
                        style="margin-top: 5px"
                      >
                        <h6 class="mb-1">
                          New Message
                          <span style="color: gray">from Tina Willson</span>
                        </h6>
                        <p style="color: gray">
                          <i class="material-icons text-sm my-auto me-1"
                            >schedule</i
                          >
                          15 days ago
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li style="margin-left: -10px">
                  <a class="dropdown-item border-radius-md" href="javascript:;">
                    <div class="d-flex">
                      <div class="my-auto">
                        <img
                          src="/public/images/drake.jpg"
                          class="avatar avatar-sm bg-gradient-dark me-3"
                        />
                      </div>
                      <div
                        class="d-flex flex-column justify-content-center"
                        style="margin-top: 5px"
                      >
                        <h6 class="mb-1">
                          New Message
                          <span style="color: gray">from Tina Willson</span>
                        </h6>
                        <p style="color: gray">
                          <i class="material-icons text-sm my-auto me-1"
                            >schedule</i
                          >
                          15 days ago
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li style="margin-left: -10px">
                  <a class="dropdown-item border-radius-md" href="javascript:;">
                    <div class="d-flex">
                      <div class="my-auto">
                        <img
                          src="/public/images/drake.jpg"
                          class="avatar avatar-sm bg-gradient-dark me-3"
                        />
                      </div>
                      <div
                        class="d-flex flex-column justify-content-center"
                        style="margin-top: 5px"
                      >
                        <h6 class="mb-1">
                          New Message
                          <span style="color: gray">from Tina Willson</span>
                        </h6>
                        <p style="color: gray">
                          <i class="material-icons text-sm my-auto me-1"
                            >schedule</i
                          >
                          15 days ago
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li style="margin-left: -10px">
                  <a class="dropdown-item border-radius-md" href="javascript:;">
                    <div class="d-flex">
                      <div class="my-auto">
                        <img
                          src="/public/images/drake.jpg"
                          class="avatar avatar-sm bg-gradient-dark me-3"
                        />
                      </div>
                      <div
                        class="d-flex flex-column justify-content-center"
                        style="margin-top: 5px"
                      >
                        <h6 class="mb-1">
                          New Message
                          <span style="color: gray">from Tina Willson</span>
                        </h6>
                        <p style="color: gray">
                          <i class="material-icons text-sm my-auto me-1"
                            >schedule</i
                          >
                          15 days ago
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <button
              slot="reference"
              class="bell-icon px-15"
              style="margin-left: 548px"
            >
              <i class="fa fa-bell cursor-pointer"></i>
            </button>
          </popper>

          <div class="length">
            <!-- collapse navbar-collapse -->
            <div class="" id="navbarSupportedContent">
              <ul class="mt-2 navbar-nav ms-auto mt-lg-0">
                <li class="nav-item dropdown user link">
                  <button
                    class="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span class="user-bx"
                      ><span class="badge badge-pill badge-light">{{
                        notificationCount
                      }}</span>
                      <span class="sr-only">unread messages</span> JH</span
                    >
                    Dropdown
                  </button>
                  <div
                    class="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <div
                      class="profile-tb"
                      v-for="notification in notifications"
                      :key="notification.id"
                    >
                      <div>
                        <div class="profile-pic">
                          <button
                            @click="seen(notification.id)"
                            class="
                              p-2
                              list-group-item
                              list-group-item-action
                              list-group-item-light
                            "
                          >
                            <span class="mr-1 side-icon"></span
                            >{{ notification.message }}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="profile-tb">
                      <div>
                        <div class="profile-pic">
                          <button
                            @click="logout"
                            class="
                              p-2
                              list-group-item
                              list-group-item-action
                              list-group-item-light
                            "
                          >
                            <span class="mr-1 side-icon"></span>Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div class="row">
        <div class="col-10">
          <popper
            trigger="clickToOpen"
            :options="{
              placement: 'bottomLeft',
            }"
          >
            <div style="background-color: #fff; z-index: 1000">
              <div
                v-for="item in items"
                :key="item.id"
                class="search-result-tile focus-element"
                @click="detailPage(item.id)"
              >
                <span class="main-icon icon-property"></span>
                <div>
                  <div class="main-text">
                    {{ item.name }}
                  </div>
                  <div class="secondary-text">
                    <span class="icon-map-pin mr-1"></span>{{ item.street }}
                  </div>
                </div>
              </div>
            </div>
            <button
              slot="reference"
              ref="showPopper"
              class="btn-filtr ml-3 text-primary"
            ></button>
          </popper>
        </div>
      </div>

      <!-- Page content-->
      <div class="container-fluid" style="padding: 0 !important">
        <keep-alive>
          <router-view :key="$route.path"></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from "../components/base/BaseComponent";
import Popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";

export default {
  name: "dashboard",
  extends: BaseComponent,
  components: {
    popper: Popper,
  },
  data() {
    return {
      isProfile: false,
      filter: {
        search: null,
      },
      items: [],
      notifications: [],
      notificationCount: "",
    };
  },
  mounted() {
    this.showNotification();
  },
  methods: {
    toggleSideBar() {
      this.emitEvent("toggle_sidebar");
    },
    async logout() {
      return new Promise(async (resolve) => {
        await this.sqlite().setLogout();
        this.route("/");
        // point to taken
      });
    },

    async searching() {
      let res = await this.network().getProperties(this.filter);
      this.$refs.showPopper.click();
      this.items = res.properties;
      console.log("items", this.items);
      if (this.filter.search == "") {
        this.items = [];
      }
    },
    detailPage(pid) {
      this.route("/dashboard/properties/" + pid + "/details/");
      this.filter.search = "";
      this.items = [];
    },

    async showNotification() {
      let res = await this.network().showFirebaseNotification();
      this.notificationCount = res.length;
      this.notifications = res;
    },

    async seen(id) {
      let res = await this.network().updateNotificationStatus(id);
      let resNotify = await this.network().showFirebaseNotification();
      this.notifications = [...resNotify];
      this.notificationCount = resNotify.length;
    },
  },
};
</script>

<style scoped>
#wrapper {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: hidden;
}

.search-result-tile {
  background: #edfbff;
  border: 1px solid #e4e4e4;
  border-radius: 4px;
  padding: 5px 20px;
  margin: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.main-icon {
  font-size: 28pt;
  margin-right: 20px;
  color: #444;
}
.main-text {
  font-size: 20pt;
  color: #444;
}
.secondary-text {
  font-size: 12pt;
  color: #999;
}
.drop {
  padding-right: 30px;
}
.popper-1 {
  width: auto;
  background-color: #fafafa;
  color: #212121;
  padding: 2px;
  display: inline-block;
  border-radius: 3px;
  position: absolute;
  font-size: 14px;
  font-weight: normal;
  border: 1px #ebebeb solid;
  z-index: 200000;
  box-shadow: rgb(58 58 58) 0 0 6px 0;
  margin-left: -280px;
}
.head {
  display: inline-flex;
  margin-top: 10px;
  margin-bottom: 8px;
}
h5 {
  margin-left: 10px;
  color: rgba(66, 66, 66, 0.671);
}
.material-icons {
  font-size: 15px;
}
</style>
