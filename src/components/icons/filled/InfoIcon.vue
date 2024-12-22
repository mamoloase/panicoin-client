<template>
    <svg viewBox="0 0 1024 1024" :width="props.width" :height="props.height" fill="#000000">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#2196F3"></path>
            <path d="M469.333333 469.333333h85.333334v234.666667h-85.333334z" fill="#FFFFFF"></path>
            <path
                d="M512 352m-53.333333 0a53.333333 53.333333 0 1 0 106.666666 0 53.333333 53.333333 0 1 0-106.666666 0Z"
                fill="#FFFFFF"></path>
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
