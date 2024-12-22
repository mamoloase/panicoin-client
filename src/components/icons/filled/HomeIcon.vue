<template>

    <svg viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve" :width="props.width"
        :height="props.height" fill="#000000">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <polygon fill="#4D5166" points="312,136 200,136 184,384 328,384 "></polygon>
            <rect fill="#747A99" height="128" width="272" x="120" y="376"></rect>
            <polygon fill="#E65C64" points="176,152 256,8 336,152 "></polygon>
            <path d="M256,176L256,176c-17.673,0-32,14.327-32,32v40h64v-40C288,190.327,273.673,176,256,176z"
                fill="#E6C067"></path>
            <g>
                <path d="M264,177.01V248h-16v-70.99c2.56-0.66,5.24-1.01,8-1.01S261.44,176.35,264,177.01z"
                    fill="#998045"></path>
            </g>
            <g>
                <rect fill="#998045" height="16" width="64" x="224" y="208"></rect>
            </g>
            <path d="M256,280L256,280c-17.673,0-32,14.327-32,32v40h64v-40C288,294.327,273.673,280,256,280z"
                fill="#E6C067"></path>
            <g>
                <path d="M264,281.01V352h-16v-70.99c2.56-0.66,5.24-1.01,8-1.01S261.44,280.35,264,281.01z"
                    fill="#998045"></path>
            </g>
            <g>
                <rect fill="#998045" height="16" width="64" x="224" y="312"></rect>
            </g>
            <path
                d="M72,64c0-19.369,11.479-36.047,28-43.633C93.91,17.571,87.14,16,80,16c-26.51,0-48,21.49-48,48 s21.49,48,48,48c7.14,0,13.91-1.571,20-4.367C83.479,100.047,72,83.369,72,64z"
                fill="#E6C067"></path>
            <polygon fill="#E6C067"
                points="352,11.132 361.889,31.169 384,34.382 368,49.978 371.777,72 352,61.603 332.223,72 336,49.978 320,34.382 342.111,31.169 ">
            </polygon>
            <polygon fill="#E6C067"
                points="152,40 161.889,60.036 184,63.249 168,78.846 171.777,100.868 152,90.47 132.223,100.868 136,78.846 120,63.249 142.111,60.036 ">
            </polygon>
            <polygon fill="#E6C067"
                points="456,56 465.889,76.036 488,79.249 472,94.846 475.777,116.868 456,106.47 436.223,116.868 440,94.846 424,79.249 446.111,76.036 ">
            </polygon>
            <path d="M256,424L256,424c-17.673,0-32,14.327-32,32v48h64v-48C288,438.327,273.673,424,256,424z"
                fill="#E65C64"></path>
            <rect fill="#E6C067" height="32" transform="matrix(-1 -4.467905e-11 4.467905e-11 -1 384 832)" width="32"
                x="176" y="400"></rect>
            <rect fill="#E6C067" height="32" width="32" x="304" y="400"></rect>
            <g>
                <path d="M248,464c0,4.42-3.58,8-8,8h-16v-16h16C244.42,456,248,459.58,248,464z" fill="#6A2A2E"></path>
            </g>
            <polygon fill="#4D5166" points="32,232 144,232 160,504 16,504 "></polygon>
            <polygon fill="#E65C64" points="168,240 88,136 8,240 "></polygon>
            <path d="M88,280L88,280c-17.673,0-32,14.327-32,32v40h64v-40C120,294.327,105.673,280,88,280z" fill="#E6C067">
            </path>
            <g>
                <path d="M96,281.01V352H80v-70.99c2.56-0.66,5.24-1.01,8-1.01S93.44,280.35,96,281.01z" fill="#998045">
                </path>
            </g>
            <g>
                <rect fill="#998045" height="16" width="64" x="56" y="312"></rect>
            </g>
            <rect fill="#E6C067" height="48" width="64" x="56" y="384"></rect>
            <rect fill="#998045" height="48" width="16" x="80" y="384"></rect>
            <rect fill="#998045" height="16" width="64" x="56" y="400"></rect>
            <polygon fill="#4D5166" points="480,232 368,232 352,504 496,504 "></polygon>
            <polygon fill="#E65C64" points="344,240 424,136 504,240 "></polygon>
            <path d="M424,280L424,280c17.673,0,32,14.327,32,32v40h-64v-40C392,294.327,406.327,280,424,280z"
                fill="#E6C067"></path>
            <g>
                <path d="M432,281.01V352h-16v-70.99c2.56-0.66,5.24-1.01,8-1.01S429.44,280.35,432,281.01z"
                    fill="#998045"></path>
            </g>
            <g>
                <rect fill="#998045" height="16" width="64" x="392" y="312"></rect>
            </g>
            <rect fill="#E6C067" height="48" transform="matrix(-1 -4.499169e-11 4.499169e-11 -1 848 816)" width="64"
                x="392" y="384"></rect>
            <rect fill="#998045" height="48" width="16" x="416" y="384"></rect>
            <rect fill="#998045" height="16" width="64" x="392" y="400"></rect>
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
