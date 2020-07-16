<template>
  <fragment>
    <div class="card">
      <div class="card__image">
        <img :src="image" alt />
      </div>
      <div class="card__content">
        <div class="card__content-title">
          <h2>{{ countryName }}</h2>
        </div>
        <div class="card__content-info">
          <h4>
            Population :
            <span class="light-text">{{ populations }}</span>
          </h4>
          <h4>
            Region :
            <span class="light-text">{{ region }}</span>
          </h4>
          <h4>
            Capital:
            <span class="light-text">{{ capital }}</span>
          </h4>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
export default {
  name: "CountryCard",
  props: ["image", "countryName", "population", "region", "capital"],

  computed: {
    populations() {
      let format = new Intl.NumberFormat();
      let populationArr = this.population;
      return format.format(populationArr);
    }
  }
};
</script>

<style lang="scss" scoped>
// Utilities

.light-text {
  font-weight: 300;
}
.card {
  width: 100%;
  margin: auto;
  height: 400px;
  border-radius: 5px;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: var(--secondary);
  cursor: pointer;
  color: var(--text-color);

  &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  @media (max-width: 768px) {
    width: 80%;
  }

  .card__image {
    height: 200px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px 5px 0 0;
    }
  }
  .card__content {
    height: 200px;
    transform: scale(0.9);
    padding: 16px;

    .card__content-info {
      padding: 16px 0;
      h4 {
        line-height: 30px;
      }
    }
  }
}
</style>
