<template>
    <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex flex-column">
            <span class="text-color text-md text-shadow">{{ props.title }}</span>
            <span class="description-color text-sm text-shadow mt-1">{{ props.description }}</span>
        </div>
        <div class="search_box rounded-2 box-shadow p-2 flex-center">
            <SearchIcon width="17" height="17" class="mr-2 description-color" />
            <input v-model="query" @input="changeSearchData" class="text-color text-md" type="text"
                placeholder="Search">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchIcon from '@/components/icons/monocolor/SearchIcon.vue';

interface Props {
    title: string,
    description?: string,
}

const props = defineProps<Props>();

const query = ref<string>("");

const emit = defineEmits<{
    (e: 'change', query: string): void
}>()


const changeSearchData = () => {
    emit('change', query.value)
};
</script>

<style scoped>
.search_box input {
    width: 120px;
}
</style>