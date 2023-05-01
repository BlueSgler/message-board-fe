import router from '@/router';
import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
const httpInstance = axios.create();

export type NestResponse = {
    data: any; // 出错时这一项将没有
    statusCode: number;
    message: string;
    success: boolean;
    error?: string;
};

httpInstance.defaults.baseURL = '/api';

export const $http = async (config: AxiosRequestConfig) => {
    try {
        const axiosResponse = await httpInstance<NestResponse>(config);
        const nestResponse = axiosResponse.data;
        if (!nestResponse.success) {
            try {
                if (nestResponse.statusCode === 401) {
                    router.push({ path: '/login' });
                    throw new Error('未授权');
                }
                if (nestResponse.statusCode === 406) {
                    throw new Error(nestResponse.message);
                }
                if (nestResponse.statusCode === 500) {
                    throw new Error('服务器错误');
                }
            } catch (errKnown) {
                if (errKnown instanceof Error) {
                    ElMessage.error(errKnown.message);
                }
            } finally {
                throw new Error(nestResponse.message);
            }
        }
        return nestResponse;
    } catch (err) {
        if (err instanceof Error) {
            if (err instanceof AxiosError) {
                ElMessage.error('网络错误');
            }
        }
        throw err;
    }
};
