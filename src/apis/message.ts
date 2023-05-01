import { $http } from '@/http';


/**
 * 用户登录
 * @param data 
 * @returns 
 */
export const addMessage = (data: { message: string }) => {
    return $http({
        method: 'POST',
        url: '/message/addMessage',
        data,
    });
};

/**
 * 获取用户信息
 * @returns 
 */
export const getAllMessages = () => {
    return $http({
        method: 'POST',
        url: '/message/getAllMessages'
    });
};

/**
 * 更新用户信息
 * @param data 
 * @returns 
 */
export const delMessage = (data: { id?: number }) => {
    return $http({
        method: 'POST',
        url: '/message/delMessage',
        data
    });
};

/**
 * 更新用户信息
 * @param data 
 * @returns 
 */
export const getOwnMessages = () => {
    return $http({
        method: 'POST',
        url: '/message/getOwnMessages',
    });
};

