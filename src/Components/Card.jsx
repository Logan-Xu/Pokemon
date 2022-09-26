import React from 'react'

export default function Card({ pokemons, loading, pokemonInfo }) {
    // console.log(pokemons)
    console.log(pokemonInfo)
    return (
        <>
            {
                loading ? <h1>Loading...</h1> :
                    pokemons.map((pokemon) => {
                        return (
                            <div className="card" key={pokemon.id} onClick={()=>pokemonInfo(pokemon)}>
                                <h2>{pokemon.id}</h2>
                                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                                <h2>{pokemon.name}</h2>
                            </div>
                        )
                    })
            }
        </>
    )
}
