<template>
    <div class="fullpage full-login-bg">
      <header class="head">
        <img class="img" src="/uploads/images/logo.png">
        <button class="button">Login</button>
      </header>
    </div>
</template>

<script>

export default {
  name: "section-one",
};
</script>
<style>
.fullpage{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: blue;
}
.full-login-bg{
  background: url(/uploads/images/couplebg.png);
  background-repeat: no-repeat;
    background-size: 100% 100%;
}
.img{
  margin-top: 1%;
  margin-left: 1%;
}
.button {
  background-color: rgb(43, 216, 251);
  border-radius: 10px;
  color: white;
  padding: 10px;
  text-decoration: none;
  cursor: pointer;
  margin-left: 95%;
}
</style>