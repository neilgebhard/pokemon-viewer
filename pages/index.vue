<template>
  <div class="container">
    <header class="header">
      <h1>Pokémon Viewer</h1>
    </header>

    <div v-if="pending" class="loading">Loading Pokémon...</div>
    <div v-else-if="error" class="error">Error: {{ error }}</div>

    <div v-else class="content">
      <div class="search-container">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search Pokémon by name..."
          class="search-input"
        />
        <p class="results-count">
          Showing {{ filteredPokemon.length }} of {{ pokemon?.length }} Pokémon
        </p>
      </div>

      <div class="pokemon-grid">
        <NuxtLink
          v-for="p in filteredPokemon"
          :key="p.id"
          :to="`/${p.id}`"
          class="pokemon-card"
        >
          <img :src="p.thumbnailImage" :alt="p.name" class="pokemon-image" />
          <h3 class="pokemon-name">{{ capitalizeFirstLetter(p.name) }}</h3>
          <div class="type-badges">
            <span
              v-for="type in p.types"
              :key="type"
              class="type-badge"
              :style="{ backgroundColor: getTypeColor(type) }"
            >
              {{ type }}
            </span>
          </div>
        </NuxtLink>
      </div>

      <div v-if="filteredPokemon.length === 0" class="no-results">
        No Pokémon found matching "{{ searchQuery }}"
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetchPokemonList } = usePokemon()
const { getTypeColor } = usePokemonTypes()

const {
  data: pokemon,
  pending,
  error,
} = await useAsyncData('pokemon-list', () => fetchPokemonList(60))

const searchQuery = ref('')

const filteredPokemon = computed(() => {
  if (!pokemon.value) return []
  if (!searchQuery.value.trim()) return pokemon.value

  const query = searchQuery.value.toLowerCase().trim()
  return pokemon.value.filter(p => p.name.toLowerCase().includes(query))
})

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2.5rem;
  color: #333;
  margin: 0;
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

.content {
  width: 100%;
}

.search-container {
  margin-bottom: 30px;
  text-align: center;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 12px 20px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 25px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #4caf50;
}

.results-count {
  margin-top: 10px;
  color: #666;
  font-size: 0.9rem;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.pokemon-card {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: block;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-color: #4caf50;
}

.pokemon-image {
  width: 96px;
  height: 96px;
  image-rendering: pixelated;
  margin-bottom: 10px;
}

.pokemon-name {
  font-size: 1rem;
  color: #333;
  margin: 0 0 8px 0;
  text-transform: capitalize;
}

.type-badges {
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
}

.type-badge {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .pokemon-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 15px;
  }

  .pokemon-card {
    padding: 10px;
  }

  .pokemon-image {
    width: 80px;
    height: 80px;
  }
}
</style>
