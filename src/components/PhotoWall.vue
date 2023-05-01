<template>
    <div id="wall">
            <div class="img-box" v-for="item in list">
                <el-image  class="img" :src="item?.url" fit="fill" :lazy="true">
                </el-image>
                <el-icon class="delete" v-if="userStore.userinfo.role" @click="deletePhote(item.id)">
                        <Delete />
                    </el-icon>
            </div>
            <el-upload multiple class="upload" @change="onSelectFile" :show-file-list="false" :auto-upload="false">
                <el-icon class="icon">
                    <Plus />
                </el-icon>
            </el-upload>
        

    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import { addPhoto, getAllPhotoes, delPhoto } from '@/apis/photo'
import { uploadApi } from '@/apis/upload'
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()

const list = ref([])
/**
 * 上传文件
 * @param param0 文件
 */
const onSelectFile = async ({ raw }: { raw: File }) => {
    const file = raw
    const res = await uploadApi(file)
    await addPhoto({ url: res.data })
    ElMessage.success('上传成功！')
    doGetImgList()
}

const doGetImgList = async () => {
    const res = await getAllPhotoes()
    list.value = res.data
}

const deletePhote = async (id:number) => {
    await delPhoto({ id })
    ElMessage.success('删除成功！')
    doGetImgList()
}
doGetImgList()
</script>

<style lang='scss' scoped>
#wall {
    margin: 20px 100px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

      .img-box {
        position: relative;
        .delete {
            cursor: pointer;
            color: #fff;
            position: absolute;
            top: 5px;
            right: 10px;
        }
      }  

    .upload {

        .icon {
            width: 150px;
            height: 150px;
            text-align: center;
            line-height: 150px;
            border: 1px solid #dcdfe6;
        }
    }

    .img {
        width: 200px;
        height: 150px;
        margin-right: 7px;
        margin-bottom: 4px;
    }

.btn-box {
    text-align: center;
    padding-bottom: 20px;
}
</style>