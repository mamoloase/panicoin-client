<template>

    <svg :width="props.width" :height="props.height" viewBox="0 0 17 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M11.9331 7.40216L6.7449 1.99756L5.51852 3.17484L10.1417 7.9908L5.50098 12.825L6.72735 14.0023L11.9331 8.57944L12.4982 7.9908L11.9331 7.40216Z"
            :fill="props.fill" />
    </svg>
</template>

<script setup lang="ts">
interface Props {
    width?: string,
    height?: string,
    fill?: string,
}
const props = withDefaults(defineProps<Props>(), {
    width: "20px",
    height: "20px",
    fill: "currentColor"
});
</script>