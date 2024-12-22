<template>
    <section class="mt-4">
        <div class="flex-center flex-column gap-2">
            <div class="flex-center gap-2">
                <div class="flex-center">
                    <MissionIcon width="40px" height="40px" />
                </div>
                <span class="text-lg text-color text-shadow">History</span>
            </div>
        </div>
    </section>

    <section class="mt-5">
        <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex flex-column">
                <span class="text-md text-color text-shadow">Campaigns archive</span>
            </div>

        </div>
        <div class="mt-4 d-flex flex-column gap-2">
            <div v-if="missions && missions.length == 0" class="mt-5 flex-center">
                <span class="text-md description-color text-shadow">Can Not Found Mission In Archive</span>
            </div>

            <TransitionGroup v-if="missions" name="list">
                <div v-for="(mission, index) in missions" :key="index"
                    class="click-animation flex-center bg-card box-shadow p-3 rounded-2">
                    <a target="_blank" :href="mission.path" class="grow-1 d-flex align-items-center gap-3">
                        <div class="flex-center mw-content">
                            <img width="50px" :src="$filters.serverLink(mission.image)" alt="">
                        </div>
                        <div class="gap-2 d-flex flex-column">
                            <span class="text-md text-color text-shadow">{{ mission.title }}</span>
                            <div class="d-flex align-items-center gap-1">
                                <div class="flex-center">
                                    <CoinIcon v-if="mission.rewardType == RewardType.Coin" width="16px"
                                        height="16px" />
                                    <TonIcon v-if="mission.rewardType == RewardType.Ton" width="16px" height="16px" />
                                </div>
                                <span class="text-sm description-color text-shadow">
                                    {{ $filters.formatNumber(mission.reward ) }}
                                </span>

                            </div>
                        </div>
                    </a>
                    <a target="_blank" :href="mission.path" class="flex-center px-2 text-color">
                        <SuccessIcon width="20px" height="20px" />
                    </a>

                </div>
            </TransitionGroup>

            <div v-else v-for="(x, y) in [0, 0, 0]" :key="y"
                class="w-full d-flex align-items-center bg-card p-3 rounded-1 box-shadow justify-content-between mt-1">
                <div class="flex-center gap-2">
                    <SkeletonLoader width="40px" height="40px" />
                    <div class="d-flex flex-column gap-2">
                        <SkeletonLoader width="40px" height="15px" />
                        <SkeletonLoader width="80px" height="15px" />
                    </div>
                </div>
                <SkeletonLoader width="50px" height="15px" />
            </div>
        </div>
    </section>
</template>
<style scoped></style>
<script lang="ts" setup>
import CoinIcon from '@/components/icons/filled/CoinIcon.vue';
import MissionIcon from '@/components/icons/filled/MissionIcon.vue';
import SuccessIcon from '@/components/icons/filled/SuccessIcon.vue';
import TonIcon from '@/components/icons/filled/TonIcon.vue';
import SkeletonLoader from '@/components/utilities/SkeletonLoader.vue';
import MissionModel from '@/models/missionModel';
import { RewardType } from '@/models/rewardModel';
import MissionService from '@/services/missionService';
import { ref } from 'vue';

const missions = ref<Array<MissionModel> | null>(null);

new MissionService().getHistory()
    .then(result => {
        missions.value = result?.result ?? []
    })
    .catch(except => { })
</script>
