<template>
    <div class="container">
        <div class="bg-box">
        </div>
        <div class="header-box">
            <el-row :gutter="20" class="header">
                <el-col :span="8" :offset="0" class="left">
                    <div class="userinfo">
                        <el-upload class="avatar-uploader" @change="onSelectFile" :show-file-list="false"
                            :auto-upload="false">
                            <div class="avatar">
                                <img v-if="userStore.userinfo.avatarUrl" :src="userStore.userinfo.avatarUrl" />
                                <span v-else>+</span>
                            </div>

                        </el-upload>
                        <div class="name">{{ userStore.userinfo.username }}</div>
                    </div>
                </el-col>
                <el-col :span="6" :offset="2">
                    <ul class="nav">
                        <li @click="goto('messageBoard')">留言板</li>
                        <li @click="goto('photowall')">照片墙</li>
                    </ul>
                </el-col>
            </el-row>

        </div>
        <main>
            <RouterView></RouterView>
        </main>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { updateUserinfo } from '@/apis/user'
import { uploadApi } from '@/apis/upload'
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
const goto = (path: string) => {
    router.push(`/home/${path}`)
}
/**
 * 上传文件
 * @param param0 文件
 */
const onSelectFile = async ({ raw }: { raw: File }) => {
    const file = raw
    // const buffer = await file.arrayBuffer()
    // imageUrl.value = URL.createObjectURL(new Blob([buffer], { type: file.type }))
    const res = await uploadApi(file)
    console.log(res);

    userStore.userinfo.avatarUrl = res.data
    await updateUserinfo(userStore.userinfo)
}
</script>

<style scoped lang="scss">
.container {
    background-color: #f2f2f2;
    min-width: 820px;
    overflow-x: hidden;
}

.bg-box {
    width: 100%;
    height: 18vw;
    // background: url('@/assets/bg.png') no-repeat;
    // background-size: cover;
    background-color: #fff;
}

.header-box {
    @include container;
}

.header {
    background-color: #fff;

    .left {
        position: relative;

        .userinfo {
            position: absolute;
            top: -100px;
            left: 0;
            display: flex;

            .name {
                // color: #fff;
                font-size: 30px;
                margin-left: 1.25rem;
            }
        }

        .avatar {


            width: 120px;
            height: 120px;
            background-color: #fff;
            border-radius: 5px;
            overflow: hidden;
            border: 1px solid #cac9c9;

            img {
                width: 100%;
            }
        }
    }


    .nav {
        display: flex;
        padding: 10px 0;

        li {
            margin-right: 30px;
            font-size: 18px;

            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
}

main {

    margin-top: 20px;

}
</style>
