import { HttpService } from "./httpService";

import { BASE_URL } from "@/configurations/httpConfiguration";
import UserModel from "@/models/userModel";

export interface CheckCipherResponse {
    user: UserModel;
}


export default class PuzzleService extends HttpService {
    constructor() {
        const token = localStorage.getItem('token');

        super(BASE_URL + "/puzzle", token ?? "");
    };

    public async checkCipher(cipher: string): Promise<CheckCipherResponse | undefined> {
        const response = await this.post(`/check`, { cipher });

        if (response.isOk() && response.value) {
            return (response.value as any).result as CheckCipherResponse;
        }
        if (response.isErr()) throw response.error
    }

}