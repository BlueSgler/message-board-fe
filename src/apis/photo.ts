import { $http } from '@/http';

/**
 * 新用户注册
 * @param data 
 * @returns 
 */
export const register = (data: { username: string; password: string }) => {
    return $http({
        method: 'POST',
        url: '/user/register',
        data,
    });
};

/**
 * 用户登录
 * @param data 
 * @returns 
 */
export const addPhoto = (data: { url: string }) => {
    return $http({
        method: 'POST',
        url: '/photo/addPhoto',
        data,
    });
};

/**
 * 获取用户信息
 * @returns 
 */
export const getAllPhotoes = () => {
    return $http({
        method: 'POST',
        url: '/photo/getAllPhotoes'
    });
};

/**
 * 更新用户信息
 * @param data 
 * @returns 
 */
export const updateUserinfo = (data: { username?: string; avatarUrl?: string }) => {
    return $http({
        method: 'POST',
        url: '/user/editUser',
        data
    });
};

export const delPhoto = (data:{id?:number}) => {
    return $http({
        method: 'POST',
        url: '/photo/delPhoto',
        data
    });
}

