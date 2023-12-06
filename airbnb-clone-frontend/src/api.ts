import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    withCredentials: true, // API 요청 시, Cookie를 전달하겠다는 의미.
});

// const BASE_URL = "http://127.0.0.1:8000/api/v1";

export async function getRooms() {
    // const response = await fetch(`${BASE_URL}/rooms/`);
    // const json = await response.json();
    // return json;

    const response = await instance.get(`rooms/`);

    return response.data;
}

// http://127.0.0.1:8000/api/v1/rooms/${roomPk}
export const getRoom = ({ queryKey }: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}`).then((response) => response.data);
};

// http://127.0.0.1:8000/api/v1/rooms/${roomPk}/reviews
export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance
        .get(`rooms/${roomPk}/reviews`)
        .then((response) => response.data);
};

// http://127.0.0.1:8000/api/v1/users/me
export const getMe = ({ queryKey }: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`users/me`).then((response) => response.data);
};

// http://127.0.0.1:8000/api/v1/log-out
export const logOut = () => {
    return instance
        .post("users/log-out", null, {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        })
        .then((response) => response.data);
};

// http://127.0.0.1:8000/api/v1/users/github
export const githubLogIn = (code: string) => {
    return instance
        .post(
            `/users/github`,
            { code },
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.status);
};
