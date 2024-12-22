import type BaseModel from "./baseModel";
import RewardModel, { RewardType } from "./rewardModel";

export default interface MissionModel extends BaseModel {
    title: string;
    path: string;
    image: string;
    reward: number;
    rewardType: RewardType;
    isViewd: boolean;
    dateView: Date;
    loading: boolean;
}
