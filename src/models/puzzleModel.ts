import type BaseModel from "./baseModel";
import RewardModel, { RewardType } from "./rewardModel";

export default interface PuzzleModel extends BaseModel {
    hint: string;
    cipherHint: string;
    reward: number;
    rewardType: RewardType;
}
