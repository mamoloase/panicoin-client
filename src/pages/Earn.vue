<template>
    <section class="mt-4">
        <div class="flex-center flex-column gap-2">
            <span class="description-color text-sm text-shadow">Receive Reward</span>

            <div class="flex-center gap-2">
                <div class="flex-center">
                    <GiftIcon width="40px" height="40px" />
                </div>
                <span class="text-lg text-color text-shadow">Earn</span>
            </div>
        </div>
    </section>
    <section class="mt-5">
        <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex flex-column gap-1">
                <span class="text-md text-color text-shadow">Daily Reward</span>
                <span class="text-sm description-color text-shadow">Try your luck by choosing an egg</span>
            </div>
            <div @click="$router.push({ name: 'leaderboard' })" class="click-animation flex-center py-2 gap-1">
                <span class="text-md description-color text-shadow">Rewards</span>
                <RightIcon width="14px" height="14px" class="description-color" />
            </div>
        </div>
        <div class="mt-5 d-flex flex-column gap-2 position-relative">
            <div class="flex-center gap-1">
                <div v-for="index in [0, 1, 2]" :key="index" class="flex-center grow-1">
                    <div @click="openBoxRequest(index)" :class="index == activeBox ? 'open-box' : ''" class="box p-2">
                        <EggIcon width="100%" height="100%" />
                    </div>
                </div>
            </div>
            <div v-if="showWaitBoxReward" class="flex-center w-full h-full box-reward">
                <div class="bg-card py-3 px-4 box-shadow rounded-1 flex-center flex-column show-animation">
                    <span class="text-sm description-color text-shadow">The next select starts in</span>

                    <div class="flex-center mt-2 gap-2">
                        <div class="flex-center">
                            <ClockIcon width="40px" height="40px" />
                        </div>
                        <div class="flex-center">
                            <span class="text-color text-lg text-shadow">{{ hours }}:</span>
                            <span class="text-color text-lg text-shadow">{{ minutes }}:</span>
                            <span class="text-color text-lg text-shadow">{{ seconds }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
    <section class="mt-5">
        <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex flex-column gap-1">
                <span class="text-md text-color text-shadow">Daily Cipher</span>
                <span class="text-sm description-color text-shadow">Get rewarded for guessing the correct word</span>
            </div>
        </div>
        <div class="d-flex flex-column gap-2 position-relative ">
            <div class="mt-5 flex-center" v-if="!$store.state.puzzle">
                <span class="description-color text-md text-shadow">Cipher is not yet available today</span>
            </div>

            <div class="mt-5 flex-center" v-else-if="$store.state.puzzle.isCompleted">
                <span class="description-color text-md text-shadow">You found the cipher today</span>
            </div>
            <div class="mt-4 w-full flex-center flex-column" v-else>
                <div class="w-full d-flex align-items-start gap-2">
                    <div class="flex-center gap-1">
                        <div class="flex-center">
                            <LightBulbIcon width="18px" height="18px" />
                        </div>
                        <span class="text-color text-md text-shadow">
                            Hint
                        </span>
                    </div>
                    <span class="text-sm description-color">
                        {{ $store.state.puzzle?.hint ?? "I Can Not Help It :(" }}
                    </span>
                </div>
                <div class="w-full d-flex align-items-center flex-wrap gap-2 mt-4">
                    <div class="click-animation border-light rounded-2 bg-card cipher_input flex-center"
                        v-for="(char, index) in cipherHint" :key="index">
                        <input pattern="[a-zA-Z0-9]*" :disabled="char != '_'" type="text" maxlength="1"
                            v-model="cipherInputs[index]"
                            class="text-center text-color fw-normal text-shadow fs-secondary-medium" placeholder="?" />
                    </div>
                </div>
                <div class="w-full d-flex align-items-center justify-content-between mt-4">
                    <span class="description-color text-md text-shadow">Reward</span>
                    <div class="flex-center gap-1">
                        <div class="flex-center">
                            <CoinIcon v-if="$store.state.puzzle.rewardType == RewardType.Coin" width="18px"
                                height="18px" />
                            <TonIcon v-if="$store.state.puzzle.rewardType == RewardType.Ton" width="18px"
                                height="18px" />
                        </div>
                        <span class="text-color text-md text-shadow">
                            {{ $filters.formatNumber($store.state.puzzle.reward) }}
                        </span>
                    </div>
                </div>

                <div v-if="!showWaitPuzzleTimer" @click="checkCipherRequest"
                    :class="cipherInputs.includes('') || cipherInputs.includes('_') || cipherInputs.includes(' ') ? 'fade' : ''"
                    class="click-animation w-full flex-center p-2 rounded-2 bg-theme box-shadow mt-3">
                    <LoaderButton :loading="showCheckCipherLoader">
                        <span class="text-color text-shadow text-md">
                            Check <b class="uppercase">{{ cipherInputs.map(x => x == "" ? "_" : x).join("") }}</b>
                        </span>
                    </LoaderButton>
                </div>
                <div class="w-full flex-center p-2 rounded-2 bg-theme box-shadow mt-3" v-else>
                    <span class="text-color text-shadow text-md">
                        <b>{{ `${hoursPuzzle}:${minutesPuzzle}:${secondsPuzzle}` }}</b> For Retry
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
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

.cipher_input {
    width: 35px;
    height: 35px;
}

.cipher_input input {
    width: 100%;
    height: 100%;
    text-align: center;
    text-transform: uppercase;
}

.uppercase {
    text-transform: uppercase;

}
</style>
<script lang="ts" setup>
import { inject, ref } from 'vue';
import ClockIcon from '@/components/icons/filled/ClockIcon.vue';
import CoinIcon from '@/components/icons/filled/CoinIcon.vue';
import EggIcon from '@/components/icons/filled/EggIcon.vue';
import RightIcon from '@/components/icons/monocolor/RightIcon.vue';
import { RewardType } from '@/models/rewardModel';
import GameService from '@/services/gameService';
import { useStore } from '@/store';
import TonIcon from '@/components/icons/filled/TonIcon.vue';
import GiftIcon from '@/components/icons/filled/GiftIcon.vue';
import LightBulbIcon from '@/components/icons/filled/LightBulbIcon.vue';
import LoaderButton from '@/components/buttons/LoaderButton.vue';
import PuzzleService from '@/services/puzzleService';

const store = useStore();

const cipherHint = ref<string>(store.state.puzzle?.cipherHint ?? "____");
const cipherInputs = ref<Array<string>>(cipherHint.value.split("").map(x => x == "_" ? "" : x));


const showCheckCipherLoader = ref<boolean>(false);


const hours = ref<string>("00");
const minutes = ref<string>("00");
const seconds = ref<string>("00");

const hoursPuzzle = ref<string>("00");
const minutesPuzzle = ref<string>("00");
const secondsPuzzle = ref<string>("00");

const activeBox = ref<number | null>(null);
const showWaitBoxReward = ref<boolean>(false);
const showWaitPuzzleTimer = ref<boolean>(false);

const createNotification: any = inject("notification");
const showReward: any = inject("showReward");


const checkCipherRequest = () => {
    if (showWaitPuzzleTimer.value) return;
    if (showCheckCipherLoader.value) return;

    if (cipherInputs.value.includes("") || cipherInputs.value.includes("_") || cipherInputs.value.includes(" "))
        return;

    showCheckCipherLoader.value = true;

    new PuzzleService().checkCipher(cipherInputs.value.join(""))
        .then(result => {
            store.commit("updateUser", result?.user);

            if (store.state.puzzle)
                showReward({ reward: store.state.puzzle.reward, type: store.state.puzzle.rewardType })
        })
        .catch(except => {
            if (except.responseStatus && store.state.user && except.responseStatus == 400) {
                store.commit("updateCheckPuzzleDate", new Date(new Date()));
                return createNotification("Cipher is not valid", "error")
            }
            if (except.responseStatus && store.state.user && (except.responseStatus == 400 || except.responseStatus == 429)) {
                showWaitPuzzleTimer.value = true;
                store.state.user.checkPuzzleRequestDate = new Date(new Date(store.state.user.checkPuzzleRequestDate).getTime() + (1000 * 60 * 10));
            }


        })
        .finally(() => showCheckCipherLoader.value = false)
}

const openBoxRequest = (index: number) => {
    if (activeBox.value) return;

    activeBox.value = index;

    new GameService().DailyRewardRequest()
        .then(result => {

            showReward(result?.reward ?? null)

            store.commit("updateUser", result?.user);
            setupOpenBoxWaitDate();
        })
        .catch(except => { })
        .finally(() => setTimeout(() => activeBox.value = null, 1000))
}

function convertSecondsToTime(secs: number) {
    hours.value = addZeroPadding(Math.floor(secs / 3600));
    minutes.value = addZeroPadding(Math.floor((secs % 3600) / 60));
    seconds.value = addZeroPadding(secs % 60);
}

function addZeroPadding(number) {
    number = Math.floor(number);
    return number < 0 ? "00" : (number < 10 ? "0" : "") + number;
}

const setupOpenBoxWaitDate = () => {
    var difference = store.getters.getWaitBoxRewardDelaySeconds / (60 * 60);

    if (difference <= 0)
        showWaitBoxReward.value = false;
    else {
        showWaitBoxReward.value = true;
        convertSecondsToTime(difference * (60 * 60))
    }
}
const setupPuzzleWaitDate = () => {
    var difference = store.getters.getWaitPuzzleDelaySeconds;

    if (difference <= 0)
        showWaitPuzzleTimer.value = false;
    else {
        showWaitPuzzleTimer.value = true;

        hoursPuzzle.value = addZeroPadding(Math.floor(difference / 3600));
        minutesPuzzle.value = addZeroPadding(Math.floor((difference % 3600) / 60));
        secondsPuzzle.value = addZeroPadding(difference % 60);
    }
}

const interval = setInterval(() => {
    if (!store.state.user) return;

    setupPuzzleWaitDate();
    setupOpenBoxWaitDate();
}, 1000);

setupPuzzleWaitDate();
setupOpenBoxWaitDate();
</script>