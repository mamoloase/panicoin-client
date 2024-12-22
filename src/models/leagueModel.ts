import BaseModel from "./baseModel";
import RewardModel from "./rewardModel";

export default interface LeagueModel extends BaseModel {
    name: string;
    image: string;
    referralReward: number;
    availableCoin: number;
    rewards: Array<RewardModel>;
}