<template>
    <div v-if="showed" class="notification w-full p-2">
        <div class="gap-2 bg-card box-shadow p-3 d-flex align-items-center justify-content-between">
            <div class="flex-center gap-2">
                <div class="flex-center">
                    <SuccessIcon v-if="$props.type == 'success'" width="25px" height="25px" />
                    <ErrorIcon v-else-if="$props.type == 'error'" width="25px" height="25px" />
                    <InfoIcon v-else width="25px" height="25px" />
                </div>
                <span class="text-sm text-color text-shadow">{{ props.text }}</span>
            </div>
            <div @click="close_notification" class="text-color flex-center">
                <XIcon width="24px" height="24px" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import XIcon from '@/components/icons/monocolor/XIcon.vue';
import InfoIcon from '@/components/icons/filled/InfoIcon.vue';
import ErrorIcon from '@/components/icons/filled/ErrorIcon.vue';
import SuccessIcon from '@/components/icons/filled/SuccessIcon.vue';


const showed = ref<boolean>(true);

interface Props {
    type: string,
    text: string,
}
const props = defineProps<Props>();

const close_notification = () => {
    showed.value = false;
}
</script>

<style scoped>
@keyframes NotificationAnimation {
    0% {
        transform: translateY(-200px);
    }
}

.notification {
    top: 0;
    left: 0;
    position: absolute;
    z-index: 100000000;
    animation: NotificationAnimation var(--transition-slow) ease;
}
</style>