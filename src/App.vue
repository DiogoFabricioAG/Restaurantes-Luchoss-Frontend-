

<template>
  <RouterView />

</template>
<script>
import { useUserStore } from './stores/user'
export default {
    setup() {
        const userStore = useUserStore()
        return{
            userStore,
        }
    },
    beforeCreate() {
      this.userStore.initStore();
    },

}
</script>