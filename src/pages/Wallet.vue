<template>
    <section class="mt-4">
        <div class="flex-center flex-column gap-2">
            <span class="description-color text-sm text-shadow">Receive Airdrop</span>

            <div class="flex-center gap-2">
                <div class="flex-center">
                    <WalletIcon width="40px" height="40px" />
                </div>
                <span class="text-lg text-color text-shadow">Wallet</span>
            </div>
        </div>
    </section>
    <section class="mt-5 fade">
        <div class="d-flex flex-column gap-1">
            <span class="text-color text-md text-shadow">Connect Wallet</span>
            <span class="description-color text-sm ">
                Please note that your deposits and withdrawals will be made through this wallet !
            </span>
        </div>
        <div class="click-animation flex-center mt-4 bg-theme p-2 rounded-2 box-shadow">
            <span class="text-color text-md text-shadow">Connect Wallet</span>
        </div>
    </section>
    <section class="mt-4 fade">
        <div class="w-full d-flex  flex-column bg-card box-shadow rounded-1 p-3">
            <span class="description-color text-md text-shadow">Your Token Balance</span>
            <Line width="100%" height="1px" class="my-3" />
            <div class="d-flex align-items-center gap-2">
                <div class="d-flex align-items-center grow-1 gap-3">
                    <div class="flex-center">
                        <CoinIcon width="40px" height="40px" />
                    </div>
                    <div class="d-flex flex-column gap-1">
                        <span class="text-color text-md text-shadow">
                            {{ $filters.formatNumber($store.getters.getUserBalance) }}
                        </span>
                        <span class="description-color text-sm text-shadow">Panic Coin</span>
                    </div>
                </div>
                <Line width="1px" height="40px" />
                <div class="d-flex align-items-center grow-1 gap-3">
                    <div class="flex-center">
                        <TonIcon width="40px" height="40px" />
                    </div>
                    <div class="d-flex flex-column gap-1">
                        <span class="text-color text-md text-shadow">
                            {{ $filters.formatNumber($store.getters.getUserTonBalance) }}
                        </span>
                        <span class="description-color text-sm text-shadow">Ton Coin</span>
                    </div>
                </div>
            </div>

            <div class="flex-center gap-2 mt-4">
                <div class="click-animation flex-center grow-1 p-2 rounded-2 box-shadow basis-0 shrink-0">
                    <span class="text-color text-md text-shadow">Swap</span>
                </div>
                <div class="click-animation flex-center bg-theme grow-1 p-2 rounded-2 box-shadow basis-0 shrink-0">
                    <span class="text-color text-md text-shadow">Withdrawl</span>
                </div>
            </div>
        </div>
    </section>

</template>

<style></style>
<script setup lang="ts">
import CoinIcon from '@/components/icons/filled/CoinIcon.vue';
import TonIcon from '@/components/icons/filled/TonIcon.vue';
import WalletIcon from '@/components/icons/filled/WalletIcon.vue';
import DepositIcon from '@/components/icons/monocolor/DepositIcon.vue';
import RightIcon from '@/components/icons/monocolor/RightIcon.vue';
import Line from '@/components/utilities/Line.vue';


</script>