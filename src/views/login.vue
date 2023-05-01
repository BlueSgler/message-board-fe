<template>
    <div class="box">
        <LoginRegister></LoginRegister>
    </div>
</template>

<script setup lang='ts'>
import LoginRegister from '@/components/login/LoginRegister.vue'
</script>

<style lang='scss' scoped>
.box {
    height: 100vh;
    background: url('../assets/login_bg1.jpg') no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;

}
</style>