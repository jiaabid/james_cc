<template>
<h2>Welcome to Billing Section</h2>
</template>

<script>
import BaseComponentVue from "../../../components/base/BaseComponent.vue";

export default {
    name: "billing",
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
