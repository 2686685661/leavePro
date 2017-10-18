<template>
	    <div>
        <el-menu  class="el-menu-demo" :router="true" mode="horizontal">
            <el-menu-item index="/" class="my_menu">我要请假</el-menu-item>
            <el-menu-item index="/history" class="my_menu">查看历史</el-menu-item>
        </el-menu>
    </div>
</template>
<style>
	    .my_menu{
        width: 50%;
        text-align: center;
        font-size: 18px;
    }
</style>