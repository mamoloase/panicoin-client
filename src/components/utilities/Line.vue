<template>
    <div :style="`width:${width};height:${height};background:rgba(var(--border-color) ,0.2);`"></div>
</template>

<script setup lang="ts">
interface Props {
    width?: string,
    height?: string,
}
const props = withDefaults(defineProps<Props>(), {
    width: "100%",
    height: "1px",
});
</script>