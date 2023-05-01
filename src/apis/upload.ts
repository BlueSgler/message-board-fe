import { $http } from '@/http'

/**
 * 上传文件
 * @param file 
 * @returns 
 */
export const uploadApi = (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return $http({
        method: 'POST',
        url: '/upload',
        data: formData
    })
}