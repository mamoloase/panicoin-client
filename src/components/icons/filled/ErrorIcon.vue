<template>
    <svg viewBox="0 0 24 24" :width="props.width" :height="props.height" fill="#000000">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <g transform="translate(0 -1028.4)">
                <path
                    d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                    transform="translate(0 1029.4)" fill="#c0392b"></path>
                <path
                    d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                    transform="translate(0 1028.4)" fill="#e74c3c"></path>
                <path
                    d="m7.0503 1037.8 3.5357 3.6-3.5357 3.5 1.4142 1.4 3.5355-3.5 3.536 3.5 1.414-1.4-3.536-3.5 3.536-3.6-1.414-1.4-3.536 3.5-3.5355-3.5-1.4142 1.4z"
                    fill="#c0392b"></path>
                <path
                    d="m7.0503 1036.8 3.5357 3.6-3.5357 3.5 1.4142 1.4 3.5355-3.5 3.536 3.5 1.414-1.4-3.536-3.5 3.536-3.6-1.414-1.4-3.536 3.5-3.5355-3.5-1.4142 1.4z"
                    fill="#ecf0f1"></path>
            </g>
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
