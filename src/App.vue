<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  metaInfo() {
    return {
      titleTemplate: "%s - Information",
      title: "Home"
    };
  }
};
</script>

<style lang="scss">
/* Default variable colours */
:root {
  --primary: hsl(0, 0%, 98%); /* Light Mode Background */
  --secondary: hsl(0, 0%, 100%); /* Light Mode Elements */
  --text-color: hsl(200, 15%, 8%); /* Light Mode Text */
}

[data-theme="dark"] {
  --primary: hsl(207, 26%, 17%); /* Dark Mode Background */
  --secondary: hsl(209, 23%, 22%); /* Dark Mode Elements */
  --text-color: hsl(0, 0%, 100%); /* Dark Mode Text & Light Mode Elements  */
}

/* Global reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Nunito Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.light-text {
  font-weight: 300;
}
</style>
