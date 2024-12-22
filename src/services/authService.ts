import { BASE_URL } from "@/configurations/httpConfiguration";
import { HttpService } from "./httpService";
import AuthModel from "@/models/authModel";

export default class AuthService extends HttpService {
    constructor() {
        super(BASE_URL + "/auth");
    };

    public IsAuthentication(): boolean {
        const token = localStorage.getItem('token');
        return token ? true : false;
    }

    public async SignIn(initData: string): Promise<AuthModel | undefined> {
        const response = await this.post(`/signIn`, { initData });

        if (response.isOk() && response.value) {
            return (response.value as any).result as AuthModel;
        }

        if (response.isErr()) throw response.error
    }

}