<template>
    <section class="mt-4">
        <div class="flex-center flex-column gap-2">
            <span class="description-color text-sm text-shadow">Invite Friends</span>

            <div class="flex-center gap-2">
                <div class="flex-center">
                    <UserIcon width="45px" height="45px" />
                </div>
                <span class="fs-large fw-bold text-color text-shadow">Profile</span>
            </div>
        </div>
    </section>

    <section class="mt-4">
        <div class="d-flex align-items-center">
            <div class="d-flex flex-column">
                <span class="text-md text-color text-shadow">Invite Friends</span>
            </div>
        </div>
        <div class="mt-3 d-flex flex-column bg-card box-shadow p-3 rounded-2">

            <div class="flex-center">
                <div class="d-flex align-items-center grow-1 gap-3">
                    <div class="flex-center mw-content">
                        <InviteIcon width="50px" height="50px" />
                    </div>
                    <div class="d-flex flex-column gap-2 overflow-hidden">
                        <span class="text-md text-color text-shadow">Invite a Friend</span>
                        <div class="d-flex align-items-center gap-1">
                            <span class="text-sm description-color">
                                You’ll get Many Rewards for every invite .
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Line width="100%" height="1px" class="my-3" />
            <div class="flex-center gap-2">
                <div class="d-flex align-items-center grow-1 shrink-0 basis-0 gap-3">
                    <div class="flex-center">
                        <CoinIcon width="35px" height="35px" />
                    </div>
                    <div class="d-flex flex-column gap-1">
                        <span class="text-sm text-color text-shadow">
                            {{ $filters.formatNumber($store.state.user?.referralReward ?? 0) }}
                        </span>
                        <span class="text-sm text-color text-shadow">Reward</span>
                    </div>
                </div>
                <Line width="1px" height="40px" />

                <div class="d-flex align-items-center grow-1 shrink-0 basis-0 gap-3">
                    <div class="flex-center">
                        <UserIcon width="35px" height="35px" />
                    </div>
                    <div class="d-flex flex-column gap-1">
                        <span class="text-sm text-color text-shadow">
                            {{ $filters.formatNumber($store.state.user?.referralCount ?? 0) }}
                        </span>

                        <span class="text-sm text-color text-shadow">Referrals</span>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column gap-2 mt-4">

                <div class="w-full flex-center gap-2">
                    <div @click="copyLink" class="click-animation flex-center w-full box-shadow p-2 rounded-2">
                        <span class="text-sm text-color text-shadow">Copy Link</span>
                    </div>
                    <div @click="shareLink"
                        class="click-animation flex-center w-full bg-theme box-shadow p-2 rounded-2">
                        <span class="text-sm text-color text-shadow">Share Link</span>
                    </div>
                </div>
            </div>

            <Line width="100%" height="1px" class="my-3" />
            <div class="flex-center flex-column gap-2">
                <div class="w-full flex-center mb-3">
                    <div class="d-flex align-items-center grow-1">
                        <span class="text-color text-md text-shadow">League</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="text-color text-md text-shadow">
                            Reward
                        </span>
                    </div>
                </div>
                <div class="w-full flex-center" v-for="league in $store.getters.getLeagues" :key="league">
                    <div class="d-flex align-items-center gap-2 grow-1">
                        <div class="flex-center mw-content border-light box-shadow p-2 rounded-circle">
                            <img width="30px" :src="$filters.serverLink(league.image)" alt="">
                        </div>
                        <span class="text-color text-md text-shadow">{{ league.name }}</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="description-color text-sm text-shadow">
                            + {{ $filters.formatNumber(league.referralReward) }}
                        </span>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <section class="mt-3">
        <div class="box-shadow bg-card p-3 rounded-2">
            <SearchBox @change="changeQueryData" title="Referrals" />

            <div class="flex-center flex-column mt-3">
                <div v-if="members && members.length == 0" class="flex-center py-3">
                    <span class="text-color text-md text-shadow">Can not found frens</span>
                </div>

                <UserListCard v-if="members" v-for="(   user, index   ) in members   " :key="index" :user="user" />
                <div v-else v-for="(x, y) in [0, 0, 0]" :key="y"
                    class="w-full d-flex align-items-center justify-content-between my-2">
                    <div class="flex-center gap-2">
                        <SkeletonLoader width="40px" height="40px" />
                        <div class="d-flex flex-column gap-2">
                            <SkeletonLoader width="40px" height="15px" />
                            <SkeletonLoader width="70px" height="15px" />
                        </div>
                    </div>
                    <SkeletonLoader width="50px" height="15px" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import UserListCard from '@/components/cards/UserListCard.vue';
import CoinIcon from '@/components/icons/filled/CoinIcon.vue';
import InviteIcon from '@/components/icons/filled/InviteIcon.vue';
import UserIcon from '@/components/icons/filled/UserIcon.vue';
import SearchBox from '@/components/inputs/SearchBox.vue';
import Line from '@/components/utilities/Line.vue';
import SkeletonLoader from '@/components/utilities/SkeletonLoader.vue';
import UserModel from '@/models/userModel';
import UserService from '@/services/userService';
import { useStore } from '@/store';
import { ref, inject } from 'vue';

const store = useStore()
const createNotification: any = inject("notification");


const referral_link = ref<string>(store.state.referralLink);
const query = ref<string>("");
const members = ref<Array<UserModel> | null>(null);

const preventWrite = (e: any) => referral_link.value = store.state.referralLink;
const copyLink = () => {
    try {
        if (navigator && navigator.clipboard) {
            navigator.clipboard.writeText(referral_link.value);
        }
        else fallbackCopyTextToClipboard(referral_link.value)
    } catch {
        fallbackCopyTextToClipboard(referral_link.value)
    }
    createNotification("Referral Link Is Copied !", "success")
}

const shareLink = () => {
    if (!referral_link.value)
        return createNotification("PLease copy link !", "error")
    const text = "❕ Join Airdio Now";
    window.open(`https://telegram.me/share/url?url=${referral_link.value}&text=${text}`, '_blank');
}

function fallbackCopyTextToClipboard(r) {
    const f = document.createElement("textarea");
    f.value = r, f.style.top = "0", f.style.left = "0", f.style.position = "fixed", document.body.appendChild(f),
        f.focus(), f.select(); try { document.execCommand("copy") } finally { document.body.removeChild(f) }
}

const getReferrals = () => {
    new UserService().getMembers(query.value)
        .then(result => {
            members.value = result?.result ?? []

        })
        .catch(except => { createNotification("can not fetch referrals. Try Again", "error") })
}
const changeQueryData = (q: string) => {
    query.value = q;
    const currentValue = query.value;

    if (q.length == 0) {
        members.value = new Array<UserModel>();
        return;
    }
    if (q.length < 3) return;

    members.value = null;

    setTimeout(() => {
        if (query.value == currentValue) {
            members.value = null;
            getReferrals();
        }
    }, 3000);
};
getReferrals()
</script>