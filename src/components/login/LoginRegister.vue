<template>
    <div class="box">
        <div class="title-box">
            <div class="title">青春不散场</div>
            <div class="info">二十年岁月一瞬间，往事翩翩映眼前</div>
        </div>

        <el-card class="main-box">
            <div class="img-box">
                <img src="https://virtualpiano.net/wp-content/uploads/img/logo-orange.svg" alt="">
            </div>
            <div class="input-box">
                <el-input placeholder="Username" v-model="query.username" :prefix-icon="Avatar" />
                <el-input placeholder="Password" type="password" v-model="query.password" :prefix-icon="Lock" />
                <el-input placeholder="Comfirm Password" type="password" v-model="confirmPassword" :prefix-icon="Lock"
                    v-show="!isLogin" />
                <!-- <div class="remember" v-show="isLogin">
                    <input type="checkbox" v-model="isCheck">
                    <span>Remenber Me</span>
                </div> -->
            </div>
            <div class="btn-box" @click="submit">
                <div class="btn">{{ isLogin === true ? '登录' : '注册' }}</div>
            </div>

            <div class="switch">
                <span>{{ isLogin === true ? `还没有账号?` : '已有账号? ' }}</span>
                <span class="orange" @click="isLogin = !isLogin">{{ isLogin === true ? '注册' : '登录' }}</span>
            </div>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { Avatar, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue';
import { register, login } from '@/apis/user'
import { ElMessage } from 'element-plus';
import router from '@/router';
import { useUserStore } from '@/stores/modules/user';
const query = ref({
    username: "admin",
    password: "123456"
})
// const isCheck = ref(false)
const confirmPassword = ref('123456')
const isLogin = ref(true)
const userStore = useUserStore()
const submit = async () => {
    if (isLogin.value) {
        if (query.value.username === '' || query.value.password === '') {
            ElMessage.error('请输入用户名或者密码')
            return
        } else {
            await login(query.value)
            await userStore.doGetUserinfo()
            ElMessage.success('登录成功！')
            setTimeout(() => {
                router.push('/home')
            }, 1000)
        }

    } else {
        if (query.value.username === '' || query.value.password === '') {
            ElMessage.error('请输入用户名或者密码')
            return
        }
        //校验密码和确认密码是否一致
        if (query.value.password === confirmPassword.value) {

            await register(query.value)

            ElMessage.success('注册成功！')

        } else {
            ElMessage.error('两次密码不一致')
        }

    }
}
</script>

<style lang='scss' scoped>
.box {
    width: 100%;
}

.title-box {
    width: 600px;
    margin-top: 120px;
    background-color: rgba($color: #000000, $alpha: .5);
    color: #fff;
    text-align: center;
    height: 100px;

    .title {
        font-size: 40px;
        font-weight: bold;
    }

    .info {
        font-size: 20px;
        font-style: italic;
    }
}

.main-box {
    margin-top: 20px;
    padding: 40px 0;
    width: 360px;
    height: 500px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;

    .img-box {
        margin: 0 auto;
        width: 180px;
        height: 80px;

        img {
            width: 100%;
        }
    }

    .input-box {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .el-input {
            width: 90%;
            margin-bottom: 20px;
            border: 2px solid #000;
            border-radius: 10px;
        }

        :deep(.el-input__wrapper:focus) {
            background-color: pink;

        }

        .el-input__wrapper:focus {
            border-color: pink
        }

        .remember {
            width: 90%;
            margin-bottom: 20px;
            text-align: left;

            input {
                border: 1px solid #000;
                width: 20px;
            }
        }
    }

    .btn-box {
        margin: 10px auto 20px;
        width: 90%;
        background-color: #000;
        color: #ff8300;
        border: 2px solid #ff8300;
        padding: 10px 0;
        border-radius: 30px;
        cursor: pointer;

        .btn {
            font-weight: bold;

        }
    }

    .orange {
        margin-left: 10px;
        color: #ff8300;
        cursor: pointer;
    }


}
</style>