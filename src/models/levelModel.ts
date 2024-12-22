import type BaseModel from "./baseModel";

export default interface LevelModel extends BaseModel {
    level: number;
    rewardPerSecond: number;
    durationInSeconds: number;
    availableCoin: number;
    animation: string;
    availableFriends: number;
}
