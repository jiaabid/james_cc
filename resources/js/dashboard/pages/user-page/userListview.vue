<template>
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
          <div class="col-md-1" style="width: 5%">
            <span class="icon-user-A"></span>
          </div>
          <div class="col-md-3">
            <h3>Doug Pullen</h3>
            <p class="adrees">Admin</p>
          </div>
          <div class="col-md-4">
            <div class="warning color-gray-xxlight">
              <span class="mr-1 icon-mail color-gray-xxlight"></span>
              marquitapinkham@ionenergysolutions.com
            </div>
          </div>

          <div class="col-md-2">
            <div class="warning color-gray-xxlight">
              <span class="mr-1 icon-phone color-gray-xxlight"></span>
              (xxx)xxx-xxxx
            </div>
          </div>

          <div class="text-right col-md-2">
            <div class="last-btn">
              <span class="online-indicator color-gray-light"> </span>
              <span class="status color-gray-xxlight">Offline</span>
            </div>
          </div>
        </div>
      </button>
    </h2>
    <div
      id="collapseOne"
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
              >
                <span class="icon-edit"></span>
                Edit
              </button>
            </div>
          </div>
          <div class="text-right col-md-6">
            <div class="edit">
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
  <!-- </div> -->
</template>

<script>
export default {
  name: "userListview",
};
</script>

<style scoped>
</style>
