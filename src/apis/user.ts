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
export const login = (data: { username: string; password: string }) => {
    return $http({
        method: 'POST',
        url: '/user/login',
        data,
    });
};

/**
 * 获取用户信息
 * @returns 
 */
export const getUserinfo = () => {
    return $http({
        method: 'POST',
        url: '/user/getUserInfo'
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

export const logout = () => {
    return $http({
        method: 'POST',
        url: '/user/logout',
    });
}

/**
 * 获取登录状态
 */
export const getStatus = () => {
    return $http({
        method: 'GET',
        url: '/user/getLoginStatus'
    })
}