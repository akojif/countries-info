<template>
  <fragment>
    <nav>
      <div class="header-text">
        <router-link :to="'/'">
          <h3>Country Info.</h3>
        </router-link>
      </div>
      <div class="toggle-btn">
        <i class="material-icons-round">
          {{ toggle ? "wb_sunny" : "brightness_2" }}
        </i>
        <p>{{ toggle ? toDark() : toLight() }}</p>
        <!-- Toggle Switch -->
        <label class="switch">
          <input type="checkbox" v-model="toggle" />
          <span class="slider round"></span>
        </label>
      </div>
    </nav>
  </fragment>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      toggle: false,
      showSkeleton: true
    };
  },
  methods: {
    toDark() {
      window.localStorage.setItem("site-theme", "dark");
      let theme = window.localStorage.getItem("site-theme");
      let htmlTag = document.getElementsByTagName("html")[0];
      htmlTag.setAttribute("data-theme", theme);
    },
    toLight() {
      window.localStorage.setItem("site-theme", "light");
      let theme = window.localStorage.getItem("site-theme");
      let htmlTag = document.getElementsByTagName("html")[0];
      htmlTag.setAttribute("data-theme", theme);
    }
  },
  created() {
    if (window.localStorage.getItem("site-theme") == "dark") {
      this.toggle = true;
    } else {
      this.toggle = false;
    }
  }
};
</script>

<style lang="scss" scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-left: 8px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

nav {
  background: var(--primary);
  padding: 2em 4em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 9999;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    padding: 1.5em;
  }
  .header-text {
    a {
      text-decoration: none;
      color: var(--text-color);
      h3 {
        font-weight: 800;
      }
    }
  }
  .toggle-btn {
    color: var(--text-color);
    display: flex;
    align-items: center;
    cursor: pointer;
    p {
      margin-left: 1px;
    }
  }
}
</style>
