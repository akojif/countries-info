<template>
  <fragment>
    <Navbar />

    <main>
      <div class="back-button-wrapper">
        <button class="back-button" @click="goBack">
          <i class="material-icons-round">arrow_back</i>
          <strong>Back</strong>
        </button>
      </div>

      <!-- Country Details -->
      <div v-if="loading">
        <Loader />
      </div>
      <div v-if="!loading">
        <div class="country" v-for="item in country" :key="item.name">
          <div class="country-flag">
            <img :src="item.flag" :alt="item.name" />
          </div>

          <div class="country-content">
            <div class="country-name">
              <h1>{{ item.name }}</h1>
            </div>

            <div class="country-details">
              <ul>
                <li>
                  <h4>
                    Native Name:
                    <span class="light-text">{{ item.nativeName }}</span>
                  </h4>
                </li>

                <li>
                  <h4>
                    Population:
                    <span class="light-text">{{ population }}</span>
                  </h4>
                </li>

                <li>
                  <h4>
                    Region:
                    <span class="light-text">{{ item.region }}</span>
                  </h4>
                </li>

                <li>
                  <h4>
                    Sub Region:
                    <span class="light-text">{{ item.subregion }}</span>
                  </h4>
                </li>

                <li>
                  <h4>
                    Capital:
                    <span class="light-text">{{ item.capital }}</span>
                  </h4>
                </li>
              </ul>
            </div>

            <div class="country-details">
              <ul>
                <li>
                  <h4>
                    Top Level Domain:
                    <span class="light-text">
                      {{ item.topLevelDomain.toString() }}
                    </span>
                  </h4>
                </li>

                <li>
                  <h4>
                    Currency:
                    <span class="light-text">
                      {{ item.currencies[0].name }}(
                      {{ item.currencies[0].code }})
                    </span>
                  </h4>
                </li>

                <!-- <li>
                <h4>
                  Languages:
                  <span
                    class="light-text"
                  >{{ showLanguage(item.languages) }} {{languages}}</span>
                </h4>
                </li>-->

                <li>
                  <h4>
                    Languages:
                    <span class="light-text">{{ languages }}</span>
                  </h4>
                </li>

                <li>
                  <h4>
                    Time Zone:
                    <span class="light-text time-zone-wrapper">
                      {{ item.timezones.toString() }}
                    </span>
                  </h4>
                </li>

                <li>
                  <h4>
                    Calling Code:
                    <span class="light-text">
                      {{ item.callingCodes.toString() }}
                    </span>
                  </h4>
                </li>

                <li>
                  <h4>
                    Alpha Code:
                    <span class="light-text">
                      {{ item.alpha3Code.toString() }}
                    </span>
                  </h4>
                </li>
              </ul>
            </div>

            <div class="country-details">
              <h4>Border Countries</h4>

              <div class="border-country-wrapper">
                <div
                  class="border"
                  v-for="(borders, index) in borderCountries"
                  :key="index"
                >
                  {{ borders }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="details">
        <code>
          Developed with ❤️ by
          <a href="https://github.com/akojif" target="_blank">Akoji Francis</a>
        </code>
      </div>
    </main>
  </fragment>
</template>

<script>
import axios from "axios";

export default {
  name: "about",
  data() {
    return {
      country: Object,
      loading: true
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    showLanguage(param) {
      param.forEach(element => {
        return (this.languages = element.name);
      });
    }
  },
  mounted() {
    let countryName = this.$route.params.query;

    axios
      .get(`https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`)
      .then(response => {
        this.loading = false;
        this.country = response.data;
      });
  },
  computed: {
    languages() {
      let langArr = this.country[0].languages;
      let emptyArr = [];
      langArr.forEach(data => {
        emptyArr.push(data.name);
      });

      return emptyArr.toString();
    },
    borderCountries() {
      let borderCountry = this.country[0].borders;
      return borderCountry;
    },
    population() {
      var format = new Intl.NumberFormat();
      let populationArr = this.country[0].population;
      return format.format(populationArr);
    }
  },
  metaInfo() {
    return {
      title: this.$route.params.query
        ? this.$route.params.query
        : "Country Name"
    };
  }
};
</script>

<style lang="scss" scoped>
.border-country-wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .border {
    background: var(--secondary);
    color: var(--text-color);
    font-weight: bold;
    margin: 8px 0;
    padding: 8px;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:not(:first-child) {
      margin-left: 8px;
    }
  }
}

.details {
  text-align: center;
  background: var(--secondary);
  color: var(--text-color);
  padding: 1em;

  a {
    color: var(--text-color);
    font-weight: bold;
  }
}
main {
  padding: 16px;
  background: var(--primary);
  color: var(--text-color);
}
.back-button-wrapper {
  .back-button {
    display: flex;
    align-items: center;
    padding: 1em;
    box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background: var(--secondary);
    border: none;
    color: var(--text-color);
    cursor: pointer;
    outline: none;
    strong {
      margin-left: 8px;
    }
  }
}

.country,
.country-content,
.country-details {
  margin: 24px 0;
}

.country-content {
  @media (min-width: 900px) {
    margin: 0;
  }
}

.country {
  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
  }
}
.country-flag {
  width: 100%;
  img {
    max-width: 100%;
    height: auto;
  }
}

.country-content {
  .country-details {
    ul {
      list-style: none;
      li {
        margin-bottom: 8px;
      }
    }
  }
}
.time-zone-wrapper {
  word-wrap: break-word;
}
</style>
