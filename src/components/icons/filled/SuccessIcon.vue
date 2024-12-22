<template>
    <svg viewBox="0 0 48 48" :width="props.width" :height="props.height" enable-background="new 0 0 48 48"
        fill="#000000">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <circle fill="#4CAF50" cx="24" cy="24" r="21"></circle>
            <polygon fill="#CCFF90" points="34.6,14.6 21,28.2 15.4,22.6 12.6,25.4 21,33.8 37.4,17.4"></polygon>
        </g>
    </svg>


</template>

<script setup lang="ts">
interface Props {
    width?: string,
    height?: string,
}
const props = withDefaults(defineProps<Props>(), {
    width: "20px",
    height: "20px",
});
</script>
