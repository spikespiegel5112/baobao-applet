<template>
  <div>
    <i-panel title="登录">
      <i-input :value="userName" title="用户名" autofocus/>
      <i-input :value="password" type="password" title="密码"/>
    </i-panel>
    <i-button type="primary" @click="">登录</i-button>
  </div>
</template>

<script>
  export default {
    name: "User",
    data() {
      return {
        userName: '',
        password: '',
        value3: 0,
        value4: 0
      }
    }
  }
</script>

<style scoped>

</style>
