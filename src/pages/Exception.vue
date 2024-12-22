<template>
    <section class="h-screen flex-center gap-4 flex-column">
        <div class="flex-center">
            <img width="250" src="@/assets/images/error-page.png" alt="">
        </div>
        <div v-if="status == '0'" class="flex-center flex-column gap-1">
            <span class="text-color text-lg text-shadow"><b class="theme-color">Device</b> Exception</span>
            <span class="description-color text-md text-shadow">Opps . Leave the desktop Mobile Gaming Rocks!</span>
        </div>
        <div v-else-if="status == '404'" class="flex-center flex-column gap-1">
            <span class="text-color text-lg text-shadow"><b class="theme-color">404</b> Exception</span>
            <span class="description-color text-md text-shadow">Opps . Can not Found Page</span>
            <div @click="$router.push({ name: 'index' })" class="p-2 w-full flex-center box-shadow rounded-1 mt-5">
                <span class="text-color text-md text-shadow">Back To Home</span>
            </div>
        </div>
        <div v-else-if="status == '401'" class="flex-center flex-column gap-1">
            <span class="text-color text-lg text-shadow"><b class="theme-color">401</b> Exception</span>
            <span class="description-color text-md text-shadow">Opps . Can not Access Try again</span>
            
        </div>
        <div v-else-if="status == '400'" class="flex-center flex-column gap-1">
            <span class="text-color text-lg text-shadow"><b class="theme-color">400</b> Exception</span>
            <span class="description-color text-md text-shadow">Opps . Try again Later</span>
            <div @click="$router.push({ name: 'index' })" class="p-2 w-full flex-center box-shadow rounded-1 mt-5">
                <span class="text-color text-md text-shadow">Back To Home</span>
            </div>
        </div>

        <div v-else-if="status == '500'" class="flex-center flex-column gap-1">
            <span class="text-color text-lg text-shadow"><b class="theme-color">500</b> Exception</span>
            <span class="description-color text-md text-shadow">Opps . Server Interval Error</span>
            <div @click="$router.push({ name: 'index' })" class="p-2 w-full flex-center box-shadow rounded-1 mt-5">
                <span class="text-color text-md text-shadow">Back To Home</span>
            </div>
        </div>
        <div v-else class="flex-center flex-column gap-1">
            <span class="text-color text-lg text-shadow"><b class="theme-color">{{ status }}</b> Exception</span>
            <div @click="$router.push({ name: 'index' })" class="p-2 w-full flex-center box-shadow rounded-1 mt-5">
                <span class="text-color text-md text-shadow">Back To Home</span>
            </div>
        </div>

    </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const status = route.params.status?.toString() ?? "404";

</script>