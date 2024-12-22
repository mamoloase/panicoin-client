import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import UserModel from './models/userModel';
import LeagueModel from './models/leagueModel';
import LevelModel from './models/levelModel';
import MissionModel from './models/missionModel';
import createPersistedState from "vuex-persistedstate";
import PuzzleModel from './models/puzzleModel';

export interface State {
    user: UserModel | null;
    puzzle: PuzzleModel | null;

    leagues: Array<LeagueModel>;
    levels: Array<LevelModel>;
    missions: Array<MissionModel>;
    currentDate: Date;
    pageLoading: boolean;
    siteLoading: boolean;
    referralLink: string;
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        user: null,
        puzzle: null,

        levels: [],
        leagues: [],
        missions: [],
        currentDate: new Date(),
        pageLoading: false,
        siteLoading: false,
        referralLink: "NULL",
    },
    mutations: {
        updateUser(state, user: UserModel) {
            state.user = user;
        },
        updateLevels(state, levels: Array<LevelModel>) {
            state.levels = levels;
        },
        updateReferralLink(state, link: string) {
            state.referralLink = link;
        },
        updatePuzzle(state, puzzle: PuzzleModel | null) {
            state.puzzle = puzzle;
        },
        updateCurrentDate(state, date: Date) {
            state.currentDate = date;
        },
        updateMissions(state, missions: Array<MissionModel>) {
            state.missions = missions;
        },
        updateLeagues(state, leagues: Array<LeagueModel>) {
            state.leagues = leagues;
        },
        updatePageLoading(state, status: boolean) {
            state.pageLoading = status;
        },
        updateSiteLoading(state, status: boolean) {
            state.siteLoading = status;
        },
        updateCheckPuzzleDate(state, date: Date) {
            if (state.user)
                state.user.checkPuzzleRequestDate = date;
        }
    },
    getters: {
        getLevel(state): LevelModel | null {
            return state.levels
                .find(x => state.user && x.level == state.user.level) ?? null;
        },
        getTargetLevel(state): LevelModel | null {
            return state.levels
                .find(x => state.user && x.level == state.user.level + 1) ?? null;
        },
        getLeague(state): LeagueModel | null {
            const balance = state.user?.balanceCoin ?? 0;

            const leagues = state.leagues
                .sort(function (a, b) { return a.availableCoin - b.availableCoin; })
                .filter(x => x.availableCoin <= balance);

            if (leagues)
                return leagues[leagues.length - 1]

            return null;
        },
        getTargetLeague(state, getters): LeagueModel | null {
            const currentLeague = getters.getLeague;
            if (!currentLeague)
                return null;

            return state.leagues
                .sort(function (a, b) { return a.availableCoin - b.availableCoin; })
                .find(x => x.availableCoin > (currentLeague.availableCoin ?? 0)) ?? null
        },
        getUserBalance(state): number {
            const balance = state.user?.balanceCoin ?? 0;

            return balance
        },
        getUserCountReferral(state): number {
            return state.user?.referralCount ?? 0;
        },
        getUserTonBalance(state): number {
            const balance = state.user?.balanceTonCoin ?? 0;

            return balance
        },
        getMissions(state) {
            return state.missions;
        },
        getLeagues(state) {
            return state.leagues;
        },

        getWaitBoxRewardDelaySeconds(state): number {
            if (!state.user) return 0;

            const currentTime = new Date().getTime();
            const requestInterval = 24 * 60 * 60 * 1000;
            const lastRequestDate = new Date(state.user.dailyRewardRequestDate).getTime();

            const elapsedTime = currentTime - lastRequestDate;
            const remainingTime = requestInterval - elapsedTime;

            return Math.max(Math.floor(remainingTime / 1000), 0);
        },
        getWaitPuzzleDelaySeconds(state): number {
            if (!state.user) return 0;

            const currentTime = new Date().getTime();
            const requestInterval = 10 * 60 * 1000;
            const lastRequestDate = new Date(state.user.checkPuzzleRequestDate).getTime();

            const elapsedTime = currentTime - lastRequestDate;
            const remainingTime = requestInterval - elapsedTime;

            return Math.max(Math.floor(remainingTime / 1000), 0);
        },
        getWaitFarmingDelaySeconds(state): number {
            if (!state.user) return 0;

            var difference =
                new Date().getTime() -
                new Date(store.state.user?.collectionRequestDate ?? new Date()).getTime();

            var max = Math.max((store.state.user?.durationInSeconds ?? difference) - difference / 1000, 0);
            return Math.min(max, store.state.user?.durationInSeconds ?? 0)
        },
    },
    plugins: [createPersistedState()]
})

export function useStore() {
    return baseUseStore(key)
}