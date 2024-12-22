import { BASE_URL } from "@/configurations/httpConfiguration";
import UserModel from "@/models/userModel";
import PaginationModel from "@/models/paginationModel";
import { HttpService } from "./httpService";

export default class LeagueService extends HttpService {
    constructor() {
        const token = localStorage.getItem('token');

        super(BASE_URL + "/league", token ?? "");
    };
    
    public async getMembers(id: string, query: string = "", size: number = 50, page: number = 1): Promise<PaginationModel<UserModel> | undefined> {
        const response = await this.get(`/members/${id}?query=${query}&size=${size}&page=${page}`);

        if (response.isOk() && response.value) {
            return response.value as PaginationModel<UserModel>;
        }

        if (response.isErr()) throw response.error
    }

}