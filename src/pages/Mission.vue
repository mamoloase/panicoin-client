<template>
    <section class="mt-4">
        <div class="flex-center flex-column gap-2">
            <span class="description-color text-sm text-shadow">Receive Reward</span>

            <div class="flex-center gap-2">
                <div class="flex-center">
                    <MissionIcon width="40px" height="40px" />
                </div>
                <span class="text-lg text-color text-shadow">Missions</span>
            </div>
        </div>
    </section>
    <section class="mt-5">
        <div class="flex-center gap-2">
            <div @click="$router.push({ name: 'earn' })"
                class="click-animation flex-center gap-3 flex-column grow-1 shrink-0 basis-0 p-3 box-shadow bg-card rounded-2">
                <div class="flex-center">
                    <UnLockIcon width="45px" height="45px" />
                </div>
                <span class="text-color text-sm text-shadow">Daily Cipher</span>
            </div>
            <div @click="$router.push({ name: 'earn' })"
                class="click-animation flex-center gap-3 flex-column grow-1 shrink-0 basis-0 p-3 box-shadow bg-card rounded-2">
                <div class="flex-center">
                    <SlotIcon width="45px" height="45px" />
                </div>
                <span class="text-color text-sm text-shadow">Daily Reward</span>
            </div>
        </div>
    </section>
    <section class="mt-4">
        <div class="d-flex align-items-center">
            <div class="d-flex flex-column">
                <span class="text-md text-color text-shadow">Special</span>
            </div>
        </div>
        <div class="mt-3 d-flex flex-column gap-2">
            <div @click="$router.push({ name: 'profile' })"
                class="click-animation flex-center bg-card box-shadow p-3 rounded-2">
                <div class="d-flex align-items-center grow-1 gap-3">
                    <div class="flex-center mw-content">
                        <InviteIcon width="50px" height="50px" />
                    </div>
                    <div class="d-flex flex-column gap-2 overflow-hidden">
                        <span class="text-md text-color text-shadow">Receive Reward for
                            Invite</span>
                        <div class="d-flex align-items-center gap-1">
                            <span class="text-sm description-color"> You’ll
                                get Many Rewards for every invite .</span>
                        </div>
                    </div>
                </div>

                <div class="flex-center description-color">
                    <RightIcon width="16px" height="16px" />
                </div>
            </div>

        </div>
    </section>
    <section class="mt-3">
        <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex flex-column">
                <span class="text-md text-color text-shadow">Missions</span>
            </div>
            <div class="click-animation flex-center py-2 gap-1" @click="$router.push({ name: 'mission_history' })">
                <span class="text-md description-color text-shadow">History</span>
                <RightIcon width="14px" height="14px " class="description-color" />
            </div>
        </div>
        <div class="mt-3 d-flex flex-column gap-2">
            <div v-if="$store.getters.getMissions && $store.getters.getMissions.length == 0" class="flex-center py-3">
                <span class="text-color text-md text-shadow">Can not found Missions</span>
            </div>
            <TransitionGroup name="list">

                <div v-for="(mission, index) in $store.getters.getMissions" :key="index"
                    class="click-animation flex-center bg-card box-shadow p-3 rounded-2">
                    <a target="_blank" @click="mission.isViewd ? () => { } : userViewdMission(mission)"
                        :href="mission.path" class="grow-1 d-flex align-items-center gap-3">
                        <div class="flex-center mw-content">
                            <img width="50px" :src="$filters.serverLink(mission.image)" alt="">
                        </div>
                        <div class="gap-2 d-flex flex-column">
                            <span class="text-md text-color text-shadow">{{ mission.title }}</span>
                            <div class="d-flex align-items-center gap-1">
                                <div class="flex-center">
                                    <CoinIcon v-if="mission.rewardType == RewardType.Coin" width="16px" height="16px" />
                                    <TonIcon v-if="mission.rewardType == RewardType.Ton" width="16px" height="16px" />
                                </div>
                                <span class="text-sm description-color text-shadow">
                                    {{ $filters.formatNumber(mission.reward) }}
                                </span>

                            </div>
                        </div>
                    </a>
                    <a target="_blank" :href="mission.path" @click="userViewdMission(mission)" v-if="!mission.isViewd"
                        class="flex-center px-2 text-color">
                        <RightIcon width="20px" height="20px" />
                    </a>
                    <div @click="confirmMission(mission)" v-else :class="mission.loading ? 'loading-mission' : ''"
                        class="flex-center px-2 text-color">
                        <ArrowClockwise width="20px" height="20px" />
                    </div>

                </div>
            </TransitionGroup>
        </div>
    </section>
</template>
<style scoped>
@keyframes LoadingMissionAnimation {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}


.loading-mission {
    animation: LoadingMissionAnimation linear infinite var(--transition-slow);
}

.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.box {
    max-width: 120px;
}

@keyframes openBox {
    20% {
        transform: rotate(-10deg);
    }

    40% {
        transform: rotate(10deg);
    }

    50% {
        transform: scaleY(0.8);
    }

    60% {
        transform: rotate(-10deg);
    }

    75% {
        transform: rotate(10deg);
    }

    90% {
        transform: rotate(-10deg);
    }
}

.open-box {
    animation: openBox infinite var(--transition-slow);
}

@keyframes boxRewardShow {
    0% {
        transform: scale(0, 1);
    }

    100% {
        transform: scale(1, 1);
    }
}

.box-reward {
    top: 0;
    left: 0;
    position: absolute;
    background: transparent;
    backdrop-filter: blur(5px);
}

.show-animation {
    animation: boxRewardShow forwards var(--transition-fast);

}
</style>
<script lang="ts" setup>
import { inject, ref } from 'vue';
import { useStore } from '@/store';
import CoinIcon from '@/components/icons/filled/CoinIcon.vue';
import InviteIcon from '@/components/icons/filled/InviteIcon.vue';
import MissionIcon from '@/components/icons/filled/MissionIcon.vue';
import ArrowClockwise from '@/components/icons/monocolor/ArrowClockwise.vue';
import RightIcon from '@/components/icons/monocolor/RightIcon.vue';
import MissionModel from '@/models/missionModel';
import MissionService from '@/services/missionService';
import UnLockIcon from '@/components/icons/filled/UnLockIcon.vue';
import TonIcon from '@/components/icons/filled/TonIcon.vue';
import { RewardType } from '@/models/rewardModel';
import SlotIcon from '@/components/icons/filled/SlotIcon.vue';

const store = useStore();

const missions = ref<Array<MissionModel>>(store.getters.getMissions);
const createNotification: any = inject("notification");
const showReward: any = inject("showReward");


const userViewdMission = (mission: MissionModel) => {
    mission.isViewd = true;
    mission.dateView = new Date();

    store.commit("updateMissions", missions.value);
}
const confirmMission = (mission: MissionModel) => {
    mission.loading = true;

    if (((new Date().getTime() - new Date(mission.dateView).getTime()) / 1000) < 10) {
        setTimeout(() => {
            createNotification("You have not completed this mission", "error");
            mission.loading = false;
        }, 2000);

        return;
    }

    new MissionService().CheckMission(mission.id)
        .then(result => {
            store.commit("updateUser", result);
            store.commit("updateMissions", missions.value.filter(x => x.id != mission.id));

            showReward({ reward: mission.reward, type: mission.rewardType })

        })
        .catch(except => {
            createNotification("You have not completed this mission", "error");
        })
        .finally(() => {
            mission.loading = false
        })
}



</script>