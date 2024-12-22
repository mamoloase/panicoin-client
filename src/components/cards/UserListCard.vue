<template>
    <div class="d-flex align-items-center justify-content-between w-full">
        <div class="flex-center gap-2">
            <div class="mw-content flex-center rounded-circle overflow-hidden">
                <img :src="$filters.serverLink($props.user.image)" width="50px" height="50px" alt="">
            </div>
            <div class="d-flex flex-column gap-1">
                <span class="text-color text-md text-shadow">{{ user.name }}</span>
                <div class="d-flex align-items-center gap-2">
                    <div class="d-flex align-items-center gap-1">
                        <CoinIcon width="18px" height="18px" />
                        <span class="description-color text-sm text-shadow">
                            {{ $filters.formatNumber(user.balanceCoin) }}
                        </span>
                    </div>
                    <div class="d-flex align-items-center gap-1">
                        <UserIcon width="18px" height="18px" />
                        <span class="description-color text-sm text-shadow">
                            {{ $filters.formatNumber(user.referralCount) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!props.publicView" class="flex-center gap-1">
            <CoinIcon width="18px" height="18px" />
            <span class="description-color text-md text-shadow">
                + {{ $filters.formatNumber($props.user.parentReward) }}
            </span>
        </div>
    </div>
    <Line class="my-3" width="100%" height="1px" />
</template>

<script setup lang="ts">
import Line from "@/components/utilities/Line.vue";
import UserModel from "@/models/userModel";
import CoinIcon from "../icons/filled/CoinIcon.vue";
import UserIcon from "../icons/filled/UserIcon.vue";

interface Property {
    user: UserModel;
    publicView: boolean;
}
const props = defineProps<Property>();
</script>

<style scoped></style>
