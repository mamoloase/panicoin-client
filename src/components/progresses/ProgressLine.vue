<template>
    <div class="progress_line w-full bg-theme-light border-light rounded-3">
        <div :style="`width:${getPercentFill()}%;`" class="bg-theme h-full"></div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    size: number
    value: number
}

const props = defineProps<Props>()

const getPercentFill = () => {
    return (props.value / props.size) * 100;
};
</script>

<style scoped>
.progress_line {
    overflow: hidden;
}
</style>