<template>
  <fragment>
    <Navbar />

    <main>
      <div class="action-bar">
        <div class="search-wrapper">
          <i class="material-icons-round">search</i>
          <input
            type="text"
            aria-label="Search Field"
            placeholder="Search for a country..."
            @keyup.prevent="searchCountry"
            v-model="search_text"
          />
        </div>
        <p>
          <strong class="search-err">{{ search_error_message }}</strong>
        </p>

        <div class="filter-wrapper">
          <button class="filter-btn" @click="show = !show">
            <strong>Filter By Region</strong>
            <i class="material-icons-round">{{
              show ? "expand_less" : "expand_more"
            }}</i>
          </button>

          <div class="filter-content" v-show="show">
            <ul>
              <li @click="filter('Africa')">Africa</li>
              <li @click="filter('Americas')">Americas</li>
              <li @click="filter('Asia')">Asia</li>
              <li @click="filter('Europe')">Europe</li>
              <li @click="filter('Oceania')">Oceania</li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="loading">
        <Loader />
      </div>

      <div v-if="!loading">
        <div class="content">
          <div
            class="card-content"
            v-for="country in countries"
            :key="country.name"
            @click="goToPage(`${country.name}`)"
          >
            <CountryCard
              :image="country.flag"
              :countryName="country.name"
              :population="country.population || 'not documented'"
              :region="country.region || 'not documented'"
              :capital="country.capital || 'none'"
            />
          </div>
        </div>
      </div>
    </main>
  </fragment>
</template>

<script>
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      countries: null,
      search_text: "",
      filter_text: "",
      show: false,
      showDetails: true,
      search_error_message: "",
      loading: true
    };
  },
  methods: {
    searchCountry() {
      this.loading = true;
      this.search_error_message = "";
      axios
        .get(`https://restcountries.eu/rest/v2/name/${this.search_text}`)
        .then(response => {
          this.loading = false;
          this.countries = response.data;
        })
        .catch(error => {
          this.loading = false;
          this.search_error_message = "Country Is Not Found, Try Again.";
          error;
        });
    },
    filter(param) {
      this.loading = true;
      axios
        .get(`https://restcountries.eu/rest/v2/region/${param}`)
        .then(response => {
          this.loading = false;
          this.countries = response.data;
        });
      this.show = !this.show;
    },
    goToPage(param) {
      this.$router.push("/about/" + param);
    }
  },
  beforeCreate() {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      this.loading = false;
      this.countries = response.data;
    });
  },
  watch: {
    search_text(field) {
      if (field == "") {
        this.loading = true;
        axios
          .get("https://restcountries.eu/rest/v2/all")
          .then(response => {
            this.loading = false;
            this.countries = response.data;
          })
          .catch(error => error);
      }
    }
  },
  metaInfo() {
    return {
      title: "All Countries"
    };
  }
};
</script>

<style lang="scss" scoped>
// Utilities
.skeleton {
  @media (max-width: 768px) {
    margin: 0 20px;
  }
}
.search-err {
  color: var(--text-color);
}
main {
  background: var(--primary);
  min-height: 100vh;
}
main .action-bar {
  padding: 4em 4em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Search Bar */
main .action-bar .search-wrapper {
  display: flex;
  align-items: center;
  background: var(--secondary);
  position: relative;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 30%;
}
main .action-bar .search-wrapper i {
  color: var(--text-color);
  font-size: 2em;
  margin-left: 8px;
}

main .action-bar .search-wrapper input {
  border: none;
  padding: 1.2em;
  width: 100%;
  margin-left: 8px;
  background: transparent;
  outline: none;
  color: var(--text-color);
}

/* Filter */

main .action-bar .filter-wrapper {
  width: 20%;
  .filter-btn {
    padding: 1em;
    border: none;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
    width: 100%;
    border-radius: 5px;
    justify-content: space-between;
    outline: none;
    cursor: pointer;
    background: var(--secondary);
    color: var(--text-color);
  }

  .filter-content {
    background: var(--secondary);
    box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
    padding: 16px;
    position: absolute;
    margin: 2% auto;
    width: inherit;
    border-radius: 5px;
    z-index: 9999;
    color: var(--text-color);
    ul {
      list-style: none;
      li {
        padding: 16px;
        cursor: pointer;
        &:hover {
          font-weight: bold;
        }
      }
    }
  }
}
main .action-bar .filter-wrapper select {
  appearance: none;
  padding: 1.2em;
  border: none;
  width: 60%;
  outline: none;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
  background: var(--primary);
  border-radius: 5px;
}

main .content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 60px;
  padding: 0 4em;
}

@media (max-width: 900px) {
  main .content {
    grid-template-columns: repeat(2, 1fr);
    padding: 16px;
  }
  main .action-bar {
    padding: 16px;
    flex-direction: column;
  }
  main .action-bar .search-wrapper,
  main .action-bar .filter-wrapper {
    width: 90%;
    margin: 16px 0;
  }
}

@media (max-width: 768px) {
  main .content {
    grid-template-columns: 100%;
    padding: 16px;
  }
}
</style>
