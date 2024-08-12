import { IHttp, HttpStatusCode } from "@rocket.chat/apps-engine/definition/accessors";
import { IGitHubIssue } from "../definition/githubIssue";
import { IAuthData } from "@rocket.chat/apps-engine/definition/oauth2/IOAuth2";

const BaseHost = "https://github.com/";
const BaseApiHost = "https://api.github.com/";
const BaseRepoApiHost = "https://api.github.com/repos/";

async function postRequest(
    http: IHttp,
    accessToken: String,
    url: string,
    data: any
): Promise<any> {
    const response = await http.post(url, {
        headers: {
            Authorization: `token ${accessToken}`,
            "Content-Type": "application/json",
            "User-Agent": "Rocket.Chat-Apps-Engine",
        },
        data,
    });

    // If it isn't a 2xx code, something wrong happened
    if (!response.statusCode.toString().startsWith("2")) {
        throw response;
    }

    return JSON.parse(response.content || "{}");
}

async function getRequest(
    http: IHttp,
    accessToken: String,
    url: string
): Promise<any> {
    const response = await http.get(url, {
        headers: {
            Authorization: `token ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    // If it isn't a 2xx code, something wrong happened
    if (!response.statusCode.toString().startsWith("2")) {
        throw response;
    }

    return JSON.parse(response.content || "{}");
}

async function deleteRequest(
    http: IHttp,
    accessToken: String,
    url: string
): Promise<any> {
    const response = await http.del(url, {
        headers: {
            Authorization: `token ${accessToken}`,
            "Content-Type": "application/json",
            "User-Agent": "Rocket.Chat-Apps-Engine",
        },
    });

    // If it isn't a 2xx code, something wrong happened
    if (!response.statusCode.toString().startsWith("2")) {
        throw response;
    }

    return JSON.parse(response.content || "{}");
}

async function patchRequest(
    http: IHttp,
    accessToken: String,
    url: string,
    data: any
): Promise<any> {
    const response = await http.patch(url, {
        headers: {
            Authorization: `token ${accessToken}`,
            "Content-Type": "application/json",
            "User-Agent": "Rocket.Chat-Apps-Engine",
        },
        data,
    });

    // If it isn't a 2xx code, something wrong happened
    if (!response.statusCode.toString().startsWith("2")) {
        throw response;
    }

    return JSON.parse(response.content || "{}");
}

export async function getNewCode(
    http: IHttp,
    repoName: string,
    filePath: string,
    content: string,
    commitMessage: string,
    access_token: string,
    branch?: string,
) {
    const base64Content = Buffer.from(content).toString('base64');
    const payload = {
        message: commitMessage,
        content: base64Content,
        branch: branch
      };
    const response = await http.get(
        `https://api.github.com/repos/${repoName}/contents/${filePath}`,
        {
            headers: {
                Authorization: `token ${access_token}`,
                "Content-Type": "application/json",
            },
            data: payload,
            
        }
    );
    // If it isn't a 2xx code, something wrong happened
    console.log("response statuscode: "+ response.statusCode)
    let JSONResponse = JSON.parse(response.content || "{}");
    if (!response.statusCode.toString().startsWith("2")) {
        JSONResponse["serverError"] = true;
    } else {
        JSONResponse["serverError"] = false;
    }
    console.log("Response after get:"+JSON.stringify(JSONResponse));
    return JSONResponse;
}
export async function uploadNewCode(
    http: IHttp,
    repoName: string,
    filePath: string,
    content: string,
    commitMessage: string,
    access_token: string,
    branch?: string,
    sha?: string
) {
    const base64Content = Buffer.from(content).toString('base64');
    const payload = {
        message: commitMessage,
        content: base64Content,
        branch: branch
      };
    if (sha) payload["sha"] = sha;
    console.log("The json to put: "+JSON.stringify(payload));
    const response = await http.put(
        `https://api.github.com/repos/${repoName}/contents/${filePath}`,
        {
            headers: {
                Authorization: `token ${access_token}`,
                "Content-Type": "application/json",
            },
            data: payload,
            
        }
    );
    // If it isn't a 2xx code, something wrong happened
    console.log("response statuscode: "+ response.statusCode)
    let JSONResponse = JSON.parse(response.content || "{}");
    if (!response.statusCode.toString().startsWith("2")) {
        JSONResponse["serverError"] = true;
    } else {
        JSONResponse["serverError"] = false;
    }
    console.log("Response after put:"+JSON.stringify(JSONResponse));
    return JSONResponse;
}

export async function getBasicUserInfo(
    http: IHttp,
    access_token: String,
) {
    try {
        const response = await getRequest(
            http,
            access_token,
            BaseApiHost + 'user'
        );
        return {
            username: response.login,
            name: response.name,
            email: response.email,
            bio: response.bio,
            followers: response.followers,
            following: response.following,
            avatar: response.avatar_url
        }
    } catch (e) {
        return {
            name: "",
            email: "",
            bio: "",
            followers: "",
            following: "",
            avatar: ""
        };
    }
}

