import axios, { AxiosError, type AxiosPromise, type AxiosResponse } from "axios";
import { ENV } from "../../environment/env.local";
import type { ApiResult } from "../interfaces/api-response.interface";

/**
 * Récupère les infos essentielles d'une réponse Axios.
 * @param response - AxiosResponse | error
 */
function parseApiResponse<T = any>(
    responseOrError: AxiosResponse | AxiosError
): ApiResult<T> {
    try {
        // Si c'est une erreur Axios
        if ((responseOrError as AxiosError).isAxiosError) {
            const error = responseOrError as AxiosError;
            if (error.response) {
                const respData: any = error.response.data;
                return {
                    success: false,
                    message: respData?.message ?? error.message ?? "Erreur inconnue",
                    data: respData?.data,
                    statusCode: respData?.statusCode ?? error.response.status,
                };
            }
            // Pas de réponse du serveur (network, timeout...)
            return {
                success: false,
                message: error.message || "Erreur réseau inconnue",
                statusCode: undefined,
            };
        }

        // Réponse normale
        const resp = responseOrError as AxiosResponse;
        const respData: any = resp.data;
        return {
            success: resp.status < 400,
            message: respData?.message ?? "",
            data: respData?.data,
            statusCode: respData?.statusCode ?? resp.status,
        };
    } catch (e: any) {
        return {
            success: false,
            message: e?.message || "Erreur inattendue",
        };
    }
}

/**
 * Appel Axios “safe” : renvoie toujours un ApiResult, même en cas d'erreur HTTP
 */
export async function safeApiCall<T = any>(
    promise: AxiosPromise
): Promise<ApiResult<T>> {
    try {
        const response = await promise;
        return parseApiResponse<T>(response);
    } catch (err: any) {
        return parseApiResponse<T>(err);
    }
}



const API = axios.create(
    {
        baseURL: ENV.API_URL,
        withCredentials: true
    }
);

export default API; 
