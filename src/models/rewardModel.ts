export default interface RewardModel {
    reward: number;
    type: RewardType
}

export enum RewardType {
    Coin = 0,
    Ton = 1,
    Null = 2
}