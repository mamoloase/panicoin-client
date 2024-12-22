<template>
    <section class="mt-3">
        <div class="bg-card p-3 box-shadow rounded-3 flex-center gap-2 overflow-hidden">
            <div @click="$router.push({ name: 'leaderboard' })"
                class="click-animation d-flex align-items-center grow-1 gap-3">
                <div v-if="$store.getters.getLeague" class="flex-center mw-content">
                    <img :src="$filters.serverLink($store.getters.getLeague.image)" width="37px" alt="">
                </div>
                <div class="d-flex flex-column gap-1">
                    <span v-if="$store.getters.getLeague" class="text-md text-color text-shadow">{{
                        $store.getters.getLeague.name }}</span>
                    <div class="d-flex align-items-center gap-1">
                        <span class="text-sm description-color text-shadow">
                            {{ $filters.formatNumber($store.getters.getUserBalance) }} /
                            {{ $store.getters.getTargetLeague ?
                                $filters.formatNumber($store.getters.getTargetLeague.availableCoin) : " - " }}
                        </span>
                    </div>
                </div>
            </div>

            <Line width="1px" height="40px" class="mr-3" />

            <div @click="$router.push({ name: 'profile' })" class="d-flex align-items-center click-animation gap-2">
                <div class="flex-center mw-content">
                    <img v-if="$store.state.user" :src="$filters.serverLink($store.state.user.image)" width="37px"
                        alt="">
                </div>
                <div class="d-flex flex-column gap-2">
                    <span class="text-md text-color text-shadow">Profile</span>
                </div>
            </div>
        </div>
    </section>
    <section class="mt-4">
        <div class="flex-center flex-column gap-2">
            <span class="description-color text-sm text-shadow">Count Your Coin</span>
            <div class="flex-center gap-2" :class="showReceiveCoinAnimation ? 'receive-coin-animation' : ''">
                <CoinIcon width="40px" height="40px" />
                <span class="text-lg text-color text-shadow">
                    {{ $filters.formatNumber($store.getters.getUserBalance) }}
                </span>
            </div>
        </div>
    </section>

    <section class="grow-1 flex-center position-relative">
        <div class="flex-center player" :class="waitCollectRequest ? 'fade' : ''">
            <Vue3Lottie :autoPlay="$store.state.user?.collectionStatus" @click="startCollectRequest"
                ref="lottieAnimation" :animationLink="$filters.serverLink($store.getters.getLevel?.animation ?? '')" />
        </div>
    </section>

    <section>
        <div v-if="$store.state.user?.collectionStatus"
            class="overflow-hidden flex-center timeline flex-column gap-3 bg-theme-light box-shadow rounded-5 position-relative">
            <div class="px-3 py-3 w-full h-full timeline_info d-flex align-items-center justify-content-between">
                <div class="gap-2 d-flex align-items-center">
                    <span class="text-color text-md text-shadow">Farming</span>
                    <div class="flex-center gap-1">
                        <div class="max-content flex-center">
                            <CoinIcon width="23" height="23" />
                        </div>
                        <span class="text-color text-md text-shadow">
                            {{ $filters.formatNumber($store.state.user?.collectedReward ?? 0) }}
                        </span>
                    </div>
                </div>

                <div class="d-flex align-items-center">
                    <span class="text-color text-md text-shadow">{{ hours }}:</span>
                    <span class="text-color text-md text-shadow">{{ minutes }}:</span>
                    <span class="text-color text-md text-shadow">{{ seconds }}</span>
                </div>
            </div>
            <div class="timeline_fill bg-theme h-full box-shadow"
                :style="`width: ${(($store.state.user?.collectedReward ?? 0) / (($store.state.user?.durationInSeconds ?? 0) * ($store.state.user?.rewardPerSecond ?? 0))) * 100}%;`">
            </div>
        </div>
        <div @click="receiveRewardRequest" v-else-if="$store.state.user && $store.state.user?.collectedReward > 0"
            class="w-full flex-center timeline flex-column gap-3 bg-theme box-shadow rounded-5 click-animation">
            <LoaderButton :loading="waitReceiveRequest">
                <div class="flex-center gap-2">
                    <span class="text-color text-md text-shadow">
                        Claim
                    </span>
                    <div class="flex-center gap-1">
                        <div class="max-content flex-center">
                            <CoinIcon width="23" height="23" />
                        </div>
                        <span class="text-color text-md text-shadow">
                            {{ $filters.formatNumber($store.state.user?.collectedReward ?? 0) }}
                        </span>
                    </div>
                </div>
            </LoaderButton>
        </div>
        <div @click="startCollectRequest" v-else
            class="w-full flex-center timeline flex-column gap-3 bg-theme box-shadow rounded-5 click-animation">
            <div class="flex-center gap-2">
                <span class="text-color text-md text-shadow">
                    Start
                </span>
            </div>
        </div>
    </section>


</template>
<style scoped>
.player {
    max-width: 250px;
}

.timeline {
    height: 50px;
}

.timeline_info {
    top: 0;
    left: 0;
    position: absolute;
    z-index: var(--z-index-fixed);
}

.timeline_fill {
    top: 0;
    left: 0;
    position: absolute;
    z-index: var(--z-index-tooltip);
}


@keyframes ReceiveCoinAnimation {
    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}

.receive-coin-animation {
    animation: ReceiveCoinAnimation forwards var(--transition-fast);
}

@media (max-height:600px) {
    .player {
        max-width: 150px !important;
    }

}
</style>
<script lang="ts" setup>
import { inject, ref } from 'vue';
import { useStore } from '@/store';
import { Vue3Lottie } from 'vue3-lottie'

import Line from "@/components/utilities/Line.vue";
import CoinIcon from "@/components/icons/filled/CoinIcon.vue";


import GameService from '@/services/gameService';
import LoaderButton from '@/components/buttons/LoaderButton.vue';

const store = useStore();
const lottieAnimation = ref();

const hours = ref<string>("00");
const minutes = ref<string>("00");
const seconds = ref<string>("00");

const waitCollectRequest = ref<boolean>(false);
const waitReceiveRequest = ref<boolean>(false);
const showReceiveCoinAnimation = ref<boolean>(false);

const createNotification: any = inject("notification");

const startCollectRequest = () => {
    if (waitCollectRequest.value) return;
    if (store.state.user && store.state.user.collectionStatus) return;
    if (store.state.user && store.state.user.collectedReward > 0) return;

    waitCollectRequest.value = true;

    new GameService().CollectRequest()
        .then((result) => {
            (lottieAnimation.value as any).play();
            store.commit("updateUser", result);
        })
        .catch(except => {
            if (except.responseStatus == 0)
                createNotification("Netword Error try again please", "error");
            if (except.responseStatus == 400)
                createNotification("server error please try again later", "error");

        })
        .finally(() => waitCollectRequest.value = false);
};
const receiveRewardRequest = () => {
    if (waitReceiveRequest.value) return;

    waitReceiveRequest.value = true;

    new GameService().ReceiveRequest()
        .then((result) => {
            (lottieAnimation.value as any).stop();
            store.commit("updateUser", result);

            showReceiveCoinAnimation.value = true;
            setTimeout(() => showReceiveCoinAnimation.value = false, 5000);
        })
        .catch(except => {
            if (except.responseStatus == 0)
                createNotification("Netword Error try again please", "error");
            if (except.responseStatus == 400)
                createNotification("server error please try again later", "error");

        })
        .finally(() => waitReceiveRequest.value = false);
};

const interval = setInterval(() => {
    setupFarmingReward();

    if (store.state.user && store.state.user.collectionStatus) {
        setupFarmingTimeLine();

        store.state.user.collectedReward += store.state.user.rewardPerSecond;
    }
}, 1000);

function convertSecondsToTime(secs: number) {
    hours.value = addZeroPadding(Math.floor(secs / 3600));
    minutes.value = addZeroPadding(Math.floor((secs % 3600) / 60));
    seconds.value = addZeroPadding(secs % 60);
}

function addZeroPadding(number) {
    number = Math.floor(number);
    return number < 0 ? "00" : (number < 10 ? "0" : "") + number;
}

const setupFarmingTimeLine = () => {
    convertSecondsToTime(store.getters.getWaitFarmingDelaySeconds);
}

const setupFarmingReward = () => {
    if (store.state.user && store.state.user.collectedReward + store.state.user.rewardPerSecond > store.state.user.rewardPerSecond * store.state.user.durationInSeconds) {
        store.state.user.collectionStatus = false;
        store.state.user.collectedReward = store.state.user.rewardPerSecond * store.state.user.durationInSeconds;
    }
}

setupFarmingReward();
setupFarmingTimeLine();

</script>