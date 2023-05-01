<template>
    <div class="content-box">
        <div class="title-box">
            留言板
        </div>
        <div class="message-box">
            <div class="message" v-for="item in messageList">
                <div class="avatar-box">
                    <img :src="item.user.avatarUrl" alt="">
                </div>
                <div class="right-box">
                    <div class="name">{{ item.user.username }}</div>
                    <div class="content">{{ item?.message }}</div>
                    <div class="time">{{ new Date(item?.createTime).toLocaleString() }}</div>

                </div>
                <el-icon class="delete" v-if="userStore.userinfo.role || !myMessage.findIndex(i=>i.id===item.id)" @click="deleteMessage(item.id)">
                    <Delete />
                </el-icon>
            </div>
            <div class="btn-box">
                <el-button type="primary" size="default" @click="dialogFormVisible = !dialogFormVisible">写留言</el-button>

            </div>
        </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="写留言">
        <el-form :model="form">
            <el-form-item>
                <el-input v-model="form.message" :rows="3" type="textarea" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="doAddMessage">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { addMessage, getAllMessages, delMessage,getOwnMessages } from '@/apis/message'
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/modules/user'
import { Delete } from '@element-plus/icons-vue'
const myMessage=ref([])
const userStore = useUserStore()
const dialogFormVisible = ref(false)
const form = ref({
    message: ''
})
const messageList = ref([])
const doAddMessage = async () => {
    dialogFormVisible.value = false
    await addMessage(form.value)
    ElMessage.success('留言成功！')
    goGetAllMessages()
}
const goGetAllMessages = async () => {
    const res = await getAllMessages()
    messageList.value = res.data
}
const deleteMessage = async (id: number) => {
    await delMessage({ id })
    ElMessage.success('删除成功！')
    goGetAllMessages()
}
const doGetOwnMessages = async () => {
    const res=await getOwnMessages()
myMessage.value=res.data
}
goGetAllMessages()
doGetOwnMessages()
</script>

<style lang='scss' scoped>
.content-box {
    @include container;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 0 2px #9b9b9b;
}

.title-box {
    padding: 10px;
    color: #4383a7;
    border-bottom: 2px solid #ededed;
}

.message-box {
    padding: 10px;

    .message {
        padding: 20px 0;
        display: flex;
        border-bottom: 2px solid #ededed;
        position: relative;

        .avatar-box {
            width: 80px;
            height: 80px;
            margin-right: 30px;

            img {
                width: 100%;
            }
        }

        .right-box {

            .name {
                color: #4383a7;
            }

            .content {
                margin-top: 10px;
                color: #000;
            }

            .time {
                margin-top: 100px;
                color: #9b9b9b;
            }


        }

        .delete {
            cursor: pointer;
            color: red;
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }

    .btn-box {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
    }
}
</style>