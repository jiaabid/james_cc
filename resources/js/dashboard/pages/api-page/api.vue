<template>
<h2>Welcom to APIs Section</h2>
</template>

<script>
import BaseComponentVue from "../../../components/base/BaseComponent.vue";

export default {
    name: "api",
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
