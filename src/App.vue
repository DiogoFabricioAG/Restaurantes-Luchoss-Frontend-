<template>
  <RouterView />
  <PopupToast />
</template>
<script>
import PopupToast from '@/components/PopupToast.vue'

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
    components: {
      PopupToast
    },
}
</script>
