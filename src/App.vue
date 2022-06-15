<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
// Fonts Styles
@font-face {
  font-family: "Kumbh Sans";
  src: local("Kumbh Sans"), url(./fonts/Nunito_Sans/NunitoSans-Regular.ttf);
}
@font-face {
  font-family: "Kumbh Sans Xbold";
  src: local("Kumbh Sans"), url(./fonts/Nunito_Sans/NunitoSans-ExtraBold.ttf);
}
@font-face {
  font-family: "Roboto";
  src: local("Roboto Mono"),
    url(./fonts/Roboto_Mono/RobotoMono-VariableFont_wght.ttf);
}
@font-face {
  font-family: "DM Sans Bold";
  src: local("DM Sans Bold"), url(./fonts/DM_Sans/DMSans-Bold.ttf);
}
@font-face {
  font-family: "DM Sans Regular";
  src: local("DM Sans Regular"), url(./fonts/DM_Sans/DMSans-Regular.ttf);
}

// Custom Styles
@import "./assets/scss/styles.scss";
</style>