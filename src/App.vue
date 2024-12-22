<template>
    <Notification v-for="(notif, index) in notifs" :key="index" :text="notif.title" :type="notif.type" />
    <div class="w-full h-full grow-1 d-flex align-items-start justify-content-start flex-column">

        <section v-if="$store.state.pageLoading" class="modal bg-color flex-center">
            <div class="loader rounded-circle"></div>
        </section>
        <section v-if="$store.state.siteLoading" class="modal bg-color flex-center position-relative">
            <div class="w-full h-full flex-center site_loading">
                <img src="/loading.webp" alt="">
            </div>

            <div class="modal w-full h-full flex-column d-flex align-items">
                <div class="grow-1 basis-0 shrink-0"></div>
                <div class="flex-center grow-1 basis-0 shrink-0">
                    <div class="loader rounded-circle"></div>

                </div>
                <div
                    class="d-flex align-items-center justify-content-end flex-column grow-1 basis-0 shrink-0 site_loader_bottom">
                    <span class="text-color text-md text-shadow">Panicoin Blockchain</span>
                    <div class="flex-center gap-2">
                        <div class="flex-center mt-2">
                            <TonIcon width="45px" height="45px" />
                        </div>
                        <span class="text-color text-lg text-shadow ">TON</span>

                    </div>

                    <div class="py-5"></div>
                </div>
            </div>
        </section>
        <main class="grow-1 d-flex align-items-start justify-content-start flex-column w-full h-full container">
            <router-view v-slot="{ Component, route }">
                <KeepAlive>
                    <component :is="Component" :key="route.path" />
                </KeepAlive>
            </router-view>
        </main>
        <div v-if="reward" class="section modal modal-fade d-flex align-items-end justify-content-center">
            <div class="w-full bg-card box-shadow rounded-2 px-3 py-4 flex-center flex-column position-relative">
                <div class="flex-center mw-content">
                    <GiftIcon width="100px" height="100px" />
                </div>
                <div class="w-full flex-center flex-column mt-4">
                    <span class="text-md text-color text-shadow">
                        You Win .please collect Bonus
                    </span>
                </div>
                <div @click="closeRewardModal"
                    class="click-animation w-full bg-theme p-2 rounded-1 box-shadow flex-center mt-4 gap-2">
                    <span class="text-color text-md text-shadow mr-1">Collect</span>
                    <div class="d-flex align-items-center gap-1">
                        <div class="flex-center">
                            <CoinIcon v-if="reward.type == RewardType.Coin" width="18px" height="18px" />
                            <TonIcon v-if="reward.type == RewardType.Ton" width="18px" height="18px" />
                        </div>

                        <span class="text-md text-color text-shadow">
                            {{ $filters.formatNumber(reward.reward) }}
                        </span>
                    </div>
                </div>

            </div>
        </div>

        <footer v-if="!$route.meta.hideFooter" class="footer flex-center w-full">
            <div class="flex-center bg-card rounded-3 box-shadow p-2 gap-2 w-full m-1 overflow-hidden">

                <div @click="$router.push({ name: 'mission' })"
                    class="click-animation grow-1 shrink-0 basis-0 flex-center flex-column">
                    <div class="flex-center">
                        <MissionIcon width="25px" height="25px" />
                    </div>
                    <span class="mt-1 text-sm text-color text-shadow">Missions</span>
                </div>
                <Line width="1px" height="50px" />

                <div @click="$router.push({ name: 'boosts' })"
                    class="click-animation grow-1 shrink-0 basis-0 flex-center flex-column">
                    <div class="flex-center">
                        <BoostIcon width="25px" height="25px" />
                    </div>
                    <span class="mt-1 text-sm text-color text-shadow">Boosts</span>
                </div>
                <Line width="1px" height="50px" />

                <div @click="$router.push({ name: 'index' })"
                    class="click-animation grow-1 shrink-0 basis-0 flex-center flex-column">
                    <div class="flex-center">
                        <HomeIcon width="40px" height="40px" />
                    </div>
                </div>
                <Line width="1px" height="50px" />

                <div @click="$router.push({ name: 'leaderboard' })"
                    class="click-animation grow-1 shrink-0 basis-0 flex-center flex-column">
                    <div class="flex-center">
                        <LeaderboardIcon width="25px" height="25px" />
                    </div>
                    <span class="mt-1 text-sm text-color text-shadow">State</span>
                </div>
                <Line width="1px" height="50px" />

                <div @click="$router.push({ name: 'wallet' })"
                    class="click-animation grow-1 shrink-0 basis-0 flex-center flex-column">
                    <div class="flex-center">
                        <WalletIcon width="25px" height="25px" />
                    </div>
                    <span class="mt-1 text-sm text-color text-shadow">Wallet</span>
                </div>
            </div>
        </footer>
    </div>

</template>

<script lang="ts" setup>
import { provide, ref } from "vue";
import Line from "@/components/utilities/Line.vue";
import BoostIcon from "@/components/icons/filled/BoostIcon.vue";
import LeaderboardIcon from "@/components/icons/filled/LeaderboardIcon.vue";
import MissionIcon from "@/components/icons/filled/MissionIcon.vue";
import WalletIcon from "@/components/icons/filled/WalletIcon.vue";
import HomeIcon from "@/components/icons/filled/HomeIcon.vue";
import Notification from "@/components/notification/Notification.vue";
import TonIcon from "./components/icons/filled/TonIcon.vue";
import RewardModel, { RewardType } from "./models/rewardModel";
import GiftIcon from "./components/icons/filled/GiftIcon.vue";
import CoinIcon from "./components/icons/filled/CoinIcon.vue";

const notifs = ref<Array<{ title; type }>>([]);
const reward = ref<RewardModel | null>(null);
function createNotification(title: string, types: string) {
    notifs.value.push({ title: title, type: types });
}

function showCollectReward(rew: RewardModel) {
    reward.value = rew;
}
function closeRewardModal() {
    reward.value = null;
}
showCollectReward()

provide("notification", createNotification);
provide("showReward", showCollectReward);
</script>

<style>
.footer {
    left: 0;
    bottom: 0;
    position: fixed;
    max-height: 90px;
    z-index: var(--z-index-fixed);
}

.site_loading {
    max-width: 768px;

}

.site_loading img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
}

.site_loader_bottom {
    background: linear-gradient(180deg, transparent, rgb(var(--bg-color)));
}

.loader {
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 8px solid rgb(var(--text-color));
    border-right-color: hsl(var(--theme-color));
    animation: l2 1s infinite linear;
}

@keyframes l2 {
    to {
        transform: rotate(1turn)
    }
}

main {
    margin-bottom: 85px;
}

section {
    width: 100%;
}
</style>
