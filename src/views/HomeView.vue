<template>
  <div class="home">
    <div class="home-info text-center">
      <div class="text-h3 text-center font-weight-black mb-12">
        <span class="text-gradient">
          Solution For Planning <br />
          Your Day
        </span>
      </div>
      <router-link to="tasks">
        <div class="text-subtitle-1 text-uppercase">
          <span class="underline">Get Started</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  &-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
