<template>
<div>
  <div class="header-img">
    <div class="header-img-copyright">
      <a href="https://www.pixiv.net/artworks/88666068">"夕"</a>
      &copy; 2021
      <a href="https://www.pixiv.net/users/17796967/artworks">PZY</a>.
    </div>
  </div>
  <div class="spacer"></div>
</div>
</template>

<style scoped>
.header-img {
  position: absolute;
  top: var(--vp-nav-height);
  width: 100%;
  height: 100vh;
  filter: brightness(50%);
  background-image: url('/header.jpg');
  background-size: cover;
  background-position: left;
}

.header-img-copyright {
  position: absolute;
  bottom: 10px;
  right: 10px;
  opacity: 0.5;
  color: white;
  font-size: 10px;
}

.spacer {
  position: relative;
  top: 0;
  left: 0;
}
</style>