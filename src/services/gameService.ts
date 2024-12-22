import { BASE_URL } from "@/configurations/httpConfiguration";
import UserModel from "@/models/userModel";
import { HttpService } from "./httpService";
import RewardModel from "@/models/rewardModel";

export interface DailyRewardResponse {
    user: UserModel;
    reward: RewardModel | null;
}

export default class GameService extends HttpService {
    constructor() {
        const token = localStorage.getItem('token');

        super(BASE_URL + "/game", token ?? "");
    };

    public async DailyRewardRequest(): Promise<DailyRewardResponse | undefined> {
        const response = await this.post(`/dailyReward`, {});

        if (response.isOk() && response.value) {
            const result = (response.value as any).result as DailyRewardResponse;

            return result
        }

        if (response.isErr()) throw response.error
    }
    public async UpgradeRequest(): Promise<UserModel | undefined> {
        const response = await this.post(`/upgrade`, {});

        if (response.isOk() && response.value) {

            const result = (response.value as any).result.user as UserModel;

            return result
        }

        if (response.isErr()) throw response.error
    }
    public async CollectRequest(): Promise<UserModel | undefined> {
        const response = await this.post(`/collect`, {});

        if (response.isOk() && response.value) {

            const result = (response.value as any).result.user as UserModel;

            return result
        }

        if (response.isErr()) throw response.error
    }
    public async ReceiveRequest(): Promise<UserModel | undefined> {
        const response = await this.post(`/receive`, {});

        if (response.isOk() && response.value) {

            const result = (response.value as any).result.user as UserModel;

            return result
        }

        if (response.isErr()) throw response.error
    }

}