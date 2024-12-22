import LeagueModel from "./leagueModel";
import LevelModel from "./levelModel";
import MissionModel from "./missionModel";
import PuzzleModel from "./puzzleModel";
import UserModel from "./userModel";

export default interface AuthModel {
    user: UserModel;
    puzzle: PuzzleModel;
    accessToken: string;
    accessTokenExpirationAt: Date;

    leagues: Array<LeagueModel>;
    levels: Array<LevelModel>;
    missions: Array<MissionModel>;

    currentDate: Date;
    referralLink: string;

}