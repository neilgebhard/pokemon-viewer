<template>
  <div>
    <NuxtRouteAnnouncer />
    <div v-if="pending">Loading Pokémon...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <h1>Pokémon Viewer</h1>
      <p>Found {{ pokemon?.length }} Pokémon</p>
      <div v-if="pokemon && pokemon.length > 0">
        <h2>First 5 Pokémon:</h2>
        <ul>
          <li v-for="p in pokemon.slice(0, 5)" :key="p.id">
            {{ p.name }} - ID: {{ p.id }}
            <img :src="p.thumbnailImage" :alt="p.name" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetchPokemonList } = usePokemon()

const { data: pokemon, pending, error } = await useAsyncData(
  'pokemon-list',
  () => fetchPokemonList(60)
)
</script>
