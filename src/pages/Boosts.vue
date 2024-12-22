<template>
    <section class="mt-4">
        <div class="flex-center flex-column gap-2">
            <span class="description-color text-sm text-shadow">Upgrade Miner</span>

            <div class="flex-center gap-2">
                <div class="flex-center">
                    <BoostIcon width="40px" height="40px" />
                </div>
                <span class="text-lg text-color text-shadow">Boosts</span>
            </div>
        </div>
    </section>
    <section class="mt-4">
        <span class="text-md text-color text-shadow">Upgrades</span>
        <div class="flex-center flex-column gap-3 mt-3 overflow-scroll">
            <div :class="$store.getters.getTargetLevel ? '' : 'fade'"
                class="w-full flex-center flex-column bg-card box-shadow p-3 rounded-2">
                <div @click="show_confirm = $store.getters.getTargetLevel ? true : false"
                    class="click-animation w-full flex-center">
                    <div class="d-flex align-items-center grow-1 gap-3">
                        <div class="flex-center mw-content">
                            <UpgradeIcon width="50px" height="50px" />
                        </div>
                        <div class="gap-2 d-flex flex-column">
                            <span v-if="$store.getters.getTargetLevel" class="text-md text-color text-shadow">
                                Upgrade Farmer
                            </span>
                            <span v-else class="text-md text-color text-shadow">Farmer Is Max</span>

                            <div class="d-flex align-items-center gap-1">
                                <div class="flex-center">
                                    <CoinIcon width="16px" height="16px" />
                                </div>

                                <span v-if="$store.getters.getTargetLevel"
                                    class="text-sm description-color text-shadow">
                                    {{ $filters.formatNumber($store.getters.getTargetLevel.availableCoin) }}
                                    for LVL {{ $store.getters.getTargetLevel.level }}
                                </span>

                                <span v-else class="text-sm description-color text-shadow">
                                    Is MAX
                                </span>

                            </div>
                        </div>
                    </div>
                    <div class="flex-center mw-content text-color">
                        <RightIcon width="20px" height="20px" />
                    </div>
                </div>
                <Line width="100%" height="1px" class="my-3" />

                <div class="flex-center flex-column gap-2 w-full">
                    <div class="w-full d-flex align-items-center justify-content-between">
                        <span class="text-sm text-color text-shadow">Level</span>
                        <div class="d-flex align-items-center gap-1">
                            <span class="text-sm description-color text-shadow">
                                {{ $store.getters.getTargetLevel?.level ?? "MAX" }}
                            </span>
                        </div>
                    </div>
                    <div class="w-full d-flex align-items-center justify-content-between">
                        <span class="text-sm text-color text-shadow">UpTime</span>
                        <div class="d-flex align-items-center gap-1">
                            <span v-if="$store.getters.getTargetLevel" class="text-sm description-color text-shadow">
                                {{ $store.getters.getTargetLevel.durationInSeconds / 3600 }} H
                            </span>
                            <span v-else class="text-sm description-color text-shadow">
                                MAX
                            </span>
                        </div>
                    </div>
                    <div class="w-full d-flex align-items-center justify-content-between">
                        <span class="text-sm text-color text-shadow">Reward</span>
                        <div class="d-flex align-items-center gap-1">
                            <span v-if="$store.getters.getTargetLevel" class="text-sm description-color text-shadow">
                                {{ $filters.formatNumber($store.getters.getTargetLevel.rewardPerSecond *
                                    $store.getters.getTargetLevel.durationInSeconds) }}
                            </span>
                            <span v-else class="text-sm description-color text-shadow">
                                MAX
                            </span>
                        </div>
                    </div>
                </div>

                <div @click="show_confirm = $store.getters.getTargetLevel ? true : false"
                    class="click-animation mt-3 w-full bg-theme rounded-2 box-shadow p-2 flex-center">
                    <span class="text-color text-md text-shadow">Upgrade</span>
                </div>
            </div>


        </div>

    </section>
    <div v-if="$store.getters.getTargetLevel" :class="show_confirm ? '' : 'd-none'"
        class="section modal modal-fade d-flex align-items-end justify-content-center">
        <div class="w-full bg-card box-shadow rounded-2 px-3 py-4 flex-center flex-column position-relative">
            <div @click="show_confirm = false" class="close_modal description-color m-2 rounded-circle border-light">
                <XIcon width="20px" height="20px" />
            </div>
            <div class="flex-center mw-content">
                <UpgradeIcon width="100px" height="100px" />
            </div>
            <div class="w-full flex-center flex-column mt-4">
                <span class="text-md text-color text-shadow">
                    <b class="theme-color">Upgrade</b> To Level {{ $store.getters.getTargetLevel.level }}
                </span>

                <div class="flex-center flex-column mt-3 gap-2 w-full">
                    <div class="w-full d-flex align-items-center justify-content-between">
                        <span class="text-sm text-color text-shadow">Level</span>
                        <div class="d-flex align-items-center gap-1">
                            <span class="text-sm description-color text-shadow">
                                {{ $store.getters.getTargetLevel.level }}
                            </span>
                        </div>
                    </div>
                    <div class="w-full d-flex align-items-center justify-content-between">
                        <span class="text-sm text-color text-shadow">UpTime</span>
                        <div class="d-flex align-items-center gap-1">

                            <span class="text-sm description-color text-shadow">
                                {{ $store.getters.getTargetLevel.durationInSeconds / 3600 }} H
                            </span>
                        </div>
                    </div>
                    <div class="w-full d-flex align-items-center justify-content-between">
                        <span class="text-sm text-color text-shadow">Reward</span>
                        <div class="d-flex align-items-center gap-1">
                            <span class="text-sm description-color text-shadow">
                                {{ $filters.formatNumber($store.getters.getTargetLevel.rewardPerSecond *
                                    $store.getters.getTargetLevel.durationInSeconds) }}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
            <div v-if="$store.getters.getUserBalance < $store.getters.getTargetLevel.availableCoin"
                class="w-full border-light p-2 rounded-2 box-shadow flex-center mt-4">

                <span class="text-md text-color text-shadow">
                    Balance Not Enough
                </span>
            </div>
            <div v-else-if="$store.getters.getUserCountReferral < $store.getters.getTargetLevel.availableFriends"
                class="w-full border-light p-2 rounded-2 box-shadow flex-center mt-4">

                <span class="text-md text-color text-shadow">
                    Required Invite {{ $store.getters.getTargetLevel.availableFriends }} Friends
                </span>
            </div>

            <div v-else @click="upgradeRequest"
                class="click-animation w-full bg-theme p-2 rounded-2 box-shadow flex-center mt-4">
                <LoaderButton :loading="loadingUpgrade" class="flex-center gap-1">
                    <span class="text-color text-md text-shadow mr-1">Upgrade</span>
                    <span class="text-color text-md text-shadow mr-1">-</span>
                    <div class="d-flex align-items-center gap-1">
                        <div class="flex-center">
                            <CoinIcon width="18px" height="18px" />
                        </div>

                        <span class="text-md text-color text-shadow">
                            {{ $filters.formatNumber($store.getters.getTargetLevel.availableCoin) }}
                        </span>
                    </div>
                </LoaderButton>
            </div>

        </div>
    </div>
</template>
<style scoped>
.close_modal {
    top: 0;
    right: 0;
    position: absolute;
}
</style>
<script lang="ts" setup>
import { inject, ref } from 'vue';
import { useStore } from '@/store';
import BoostIcon from '@/components/icons/filled/BoostIcon.vue';
import UpgradeIcon from '@/components/icons/filled/UpgradeIcon.vue';
import CoinIcon from '@/components/icons/filled/CoinIcon.vue';
import RightIcon from '@/components/icons/monocolor/RightIcon.vue';
import XIcon from '@/components/icons/monocolor/XIcon.vue';
import GameService from '@/services/gameService';
import LoaderButton from '@/components/buttons/LoaderButton.vue';
import Line from '@/components/utilities/Line.vue';

const store = useStore();
const createNotification: any = inject("notification");

const show_confirm = ref<boolean>(false);
const loadingUpgrade = ref<boolean>(false);

const upgradeRequest = () => {
    if (!store.state.user || !store.getters.getLevel) return;

    if (store.state.user.balanceCoin < store.getters.getTargetLevel.availableCoin)
        return createNotification("balance not enough !", "error");

    loadingUpgrade.value = true;

    new GameService().UpgradeRequest()
        .then(result => {
            show_confirm.value = false;
            store.commit("updateUser", result);
            createNotification("Level Up Successfully .", "success");
        })
        .catch(except => {
            createNotification("Can not Level Up .Try Again please", "error");
        })
        .finally(() => loadingUpgrade.value = false)
}
</script>
