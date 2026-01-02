<template>
  <div class="container">
    <NuxtLink to="/" class="back-link">← Back to List</NuxtLink>

    <div v-if="pending" class="loading">Loading Pokémon...</div>
    <div v-else-if="error" class="error">Error: {{ error }}</div>

    <div v-else-if="pokemon" class="profile">
      <div class="profile-header">
        <h1 class="pokemon-name">{{ capitalizeFirstLetter(pokemon.name) }}</h1>
        <div class="type-badges">
          <span
            v-for="type in pokemon.types"
            :key="type"
            class="type-badge"
            :style="{ backgroundColor: getTypeColor(type) }"
          >
            {{ type }}
          </span>
        </div>
      </div>

      <div class="profile-content">
        <div class="image-container">
          <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
        </div>

        <div class="details-container">
          <div class="detail-item">
            <span class="detail-label">Height:</span>
            <span class="detail-value">{{ formatHeight(pokemon.height) }}</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Weight:</span>
            <span class="detail-value">{{ formatWeight(pokemon.weight) }}</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Abilities:</span>
            <span class="detail-value">{{
              formatAbilities(pokemon.abilities)
            }}</span>
          </div>
        </div>

        <div class="stats-container">
          <h2 class="stats-title">Base Stats</h2>
          <div v-for="stat in pokemon.stats" :key="stat.name" class="stat-item">
            <div class="stat-header">
              <span class="stat-name">{{ formatStatName(stat.name) }}</span>
              <span class="stat-value">{{ stat.value }}</span>
            </div>
            <div class="stat-bar-background">
              <div
                class="stat-bar"
                :style="{
                  width: `${(stat.value / 255) * 100}%`,
                  backgroundColor: getStatColor(stat.value),
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { fetchPokemonById } = usePokemon()
const { getTypeColor } = usePokemonTypes()

const pokemonId = computed(() => Number(route.params.id))

const {
  data: pokemon,
  pending,
  error,
} = await useAsyncData(`pokemon-${pokemonId.value}`, () =>
  fetchPokemonById(pokemonId.value)
)

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const formatHeight = (height: number) => {
  // Height is in decimeters, convert to meters
  return `${(height / 10).toFixed(1)} m`
}

const formatWeight = (weight: number) => {
  // Weight is in hectograms, convert to kilograms
  return `${(weight / 10).toFixed(1)} kg`
}

const formatAbilities = (abilities: string[]) => {
  return abilities
    .map(ability =>
      ability
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    )
    .join(', ')
}

const formatStatName = (statName: string) => {
  const statMap: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Attack',
    'special-defense': 'Sp. Defense',
    speed: 'Speed',
  }
  return statMap[statName] || statName
}

const getStatColor = (value: number) => {
  if (value >= 150) return '#22c55e'
  if (value >= 100) return '#3b82f6'
  if (value >= 75) return '#f59e0b'
  if (value >= 50) return '#eab308'
  return '#ef4444'
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, sans-serif;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  color: #4caf50;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
}

.back-link:hover {
  color: #45a049;
  text-decoration: underline;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
}

.error {
  color: #d32f2f;
}

.profile {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-header {
  text-align: center;
  margin-bottom: 30px;
}

.pokemon-name {
  font-size: 2.5rem;
  color: #333;
  margin: 0 0 15px 0;
  text-transform: capitalize;
}

.type-badges {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.type-badge {
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.image-container {
  text-align: center;
}

.pokemon-image {
  width: 300px;
  height: 300px;
  object-fit: contain;
}

.details-container {
  width: 100%;
  max-width: 500px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background: #f5f5f5;
  border-radius: 8px;
}

.detail-label {
  font-weight: 600;
  color: #555;
  font-size: 1.1rem;
}

.detail-value {
  color: #333;
  font-size: 1.1rem;
}

.stats-container {
  width: 100%;
  max-width: 500px;
  margin-top: 10px;
}

.stats-title {
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 20px 0;
  text-align: center;
}

.stat-item {
  margin-bottom: 15px;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.stat-name {
  font-weight: 600;
  color: #555;
  font-size: 0.95rem;
}

.stat-value {
  font-weight: 700;
  color: #333;
  font-size: 0.95rem;
}

.stat-bar-background {
  width: 100%;
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
}

.stat-bar {
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease;
  min-width: 2%;
}

@media (max-width: 768px) {
  .pokemon-name {
    font-size: 2rem;
  }

  .pokemon-image {
    width: 200px;
    height: 200px;
  }

  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .profile {
    padding: 20px;
  }
}
</style>
