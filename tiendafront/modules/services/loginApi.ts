import { enviroments } from "../entity/enviroments";
import { credentialsLogin, paramLogin } from "./authorization/authorization";

const API_LOGIN = enviroments.token_url;

export const loginToken = async (code: string): Promise<Response | undefined> => {
    try {
        let response: Response = await fetch(API_LOGIN, {
            method: "POST",
            body: paramLogin(code),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + credentialsLogin()
            }
        })

        return response;

    } catch (error) {

    }
}
export const logoutToken = async (): Promise<Response | undefined> => {
    try {
        let response: Response = await fetch("http://localhost:9001/logout", {
            method: "POST"
        })

        return response;

    } catch (error) {

    }
}