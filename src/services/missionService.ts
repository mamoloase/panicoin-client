import { HttpService } from "./httpService";

import { BASE_URL } from "@/configurations/httpConfiguration";
import UserModel from "@/models/userModel";
import PaginationModel from "@/models/paginationModel";
import MissionModel from "@/models/missionModel";

export default class MissionService extends HttpService {
    constructor() {
        const token = localStorage.getItem('token');

        super(BASE_URL + "/mission", token ?? "");
    };

    public async CheckMission(id: string): Promise<UserModel | undefined> {
        const response = await this.post(`/check?missionId=${id}`, {});

        if (response.isOk() && response.value) {
            return (response.value as any).result.user as UserModel;

        }
        if (response.isErr()) throw response.error
    }
    public async getHistory(size: number = 50, page: number = 1): Promise<PaginationModel<MissionModel> | undefined> {
        const response = await this.get(`/history?size=${size}&page=${page}`);

        if (response.isOk() && response.value) {
            return response.value as PaginationModel<MissionModel>;
        }

        if (response.isErr()) throw response.error
    }
}