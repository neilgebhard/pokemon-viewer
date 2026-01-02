export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonSprites {
  front_default: string
  other: {
    'official-artwork': {
      front_default: string
    }
  }
}

export interface PokemonAbility {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonDetail {
  id: number
  name: string
  height: number
  weight: number
  sprites: PokemonSprites
  abilities: PokemonAbility[]
  types: PokemonType[]
  stats: PokemonStat[]
}

export interface Stat {
  name: string
  value: number
}

export interface Pokemon {
  id: number
  name: string
  image: string
  thumbnailImage: string
  height: number
  weight: number
  abilities: string[]
  types: string[]
  stats: Stat[]
}

export const usePokemon = () => {
  const fetchPokemonList = async (limit: number = 60): Promise<Pokemon[]> => {
    try {
      // Fetch the list of Pokémon
      const listResponse = await $fetch<PokemonListResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
      )

      // Fetch detailed information for each Pokémon in parallel
      const pokemonDetailsPromises = listResponse.results.map(async pokemon => {
        const detail = await $fetch<PokemonDetail>(pokemon.url)

        return {
          id: detail.id,
          name: detail.name,
          image: detail.sprites.other['official-artwork'].front_default,
          thumbnailImage: detail.sprites.front_default,
          height: detail.height,
          weight: detail.weight,
          abilities: detail.abilities.map(a => a.ability.name),
          types: detail.types.map(t => t.type.name),
          stats: detail.stats.map(s => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
        }
      })

      const pokemonList = await Promise.all(pokemonDetailsPromises)
      return pokemonList
    } catch (error) {
      console.error('Error fetching Pokémon:', error)
      throw error
    }
  }

  const fetchPokemonById = async (id: number): Promise<Pokemon> => {
    try {
      const detail = await $fetch<PokemonDetail>(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      )

      return {
        id: detail.id,
        name: detail.name,
        image: detail.sprites.other['official-artwork'].front_default,
        thumbnailImage: detail.sprites.front_default,
        height: detail.height,
        weight: detail.weight,
        abilities: detail.abilities.map(a => a.ability.name),
        types: detail.types.map(t => t.type.name),
        stats: detail.stats.map(s => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
      }
    } catch (error) {
      console.error(`Error fetching Pokémon ${id}:`, error)
      throw error
    }
  }

  return {
    fetchPokemonList,
    fetchPokemonById,
  }
}
