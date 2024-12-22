import BaseModel from "./baseModel";

export default interface UserModel extends BaseModel {
    name: string;
    telegramId: number;
    balanceCoin: number;
    availableEnergy: number;
    image: string;
    level: number;
    referralReward: number;
    referralCount: number;
    parentReward: number;
    collectedReward: number;
    balanceTonCoin: number;
    rewardPerSecond: number;
    durationInSeconds: number;
    countReferral: number;
    collectionStatus: boolean;
    collectionRequestDate: Date;
    dailyRewardRequestDate: Date;
    checkPuzzleRequestDate: Date;
}