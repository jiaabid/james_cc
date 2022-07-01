<template>
<h2>Welcome to Alerts Section</h2>
</template>

<script>
import BaseComponentVue from "../../../components/base/BaseComponent.vue";

export default {
    name: "alert",
    extends: BaseComponentVue,
    beforeRouteEnter(to, from, next){
        next(vm => {
        vm.emitEvent("selected_property", null);
        })
    },
}
</script>

<style scoped>

</style>
