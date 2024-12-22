<template>
    <div class="w-full d-flex flex-column">
        <div class="w-full flex-center">
            <div v-if="loading" class="loader-button rounded-circle"></div>
            <slot v-else />
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    loading?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
    loading: false,
});
</script>

<style scoped>
.loader-button {
    width: 20px;
    height: 20px;
    border: 3px solid;
    border-color: rgba(var(--text-color), 1) transparent;
    animation: loader_animation var(--transition-slow) infinite;
}

@keyframes loader_animation {
    to {
        transform: rotate(.5turn)
    }
}
</style>