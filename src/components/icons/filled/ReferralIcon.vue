<template>
    <svg viewBox="0 0 128 128" :width="props.width" :height="props.height" preserveAspectRatio="xMidYMid meet"
        fill="#000000">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M64 4.5C36.2 4.5 8 28.1 8 55.8s44.3 67.7 56.2 67.7c13.2 0 55.8-39.9 55.8-67.7S91.8 4.5 64 4.5z"
                fill="#adbcc3"> </path>
            <g fill="#422b0d">
                <path
                    d="M64 102.35c-9.37 0-16.06-5.52-18.07-8.58c-.76-.98-.92-2.31-.41-3.44c.39-.74 1.17-1.18 2-1.15c.3 0 .6.05.88.15C53.1 90.8 57.23 93 64 93s10.92-2.16 15.63-3.63c.28-.1.58-.15.88-.15c.83-.03 1.61.41 2 1.15c.51 1.13.35 2.46-.41 3.44c-2.04 3.02-8.73 8.54-18.1 8.54z">
                </path>
                <path
                    d="M54.05 81.56c-3 3.88-17.71 3.89-28.85-6.36c-10.09-9.28-9.46-25.64-6.13-28.94s19.19-3.38 28.85 6.36s9.8 25.3 6.13 28.94z">
                </path>
                <path
                    d="M80.08 52.58c9.66-9.7 25.52-9.62 28.85-6.33s3.53 19.11-6.13 28.8S77.64 85 73.94 81.38s-3.52-19.1 6.14-28.8z">
                </path>
            </g>
            <path
                d="M64 4.5c14.52 0 29.13 6.42 39.8 16.5C93 9.46 77.17 2 61.47 2c-27.8 0-56 23.6-56 51.3c0 15.6 14.06 35.11 28.47 49.18C20.46 88.64 8 70.49 8 55.8C8 28.1 36.2 4.5 64 4.5z"
                fill="#adbcc3"> </path>
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