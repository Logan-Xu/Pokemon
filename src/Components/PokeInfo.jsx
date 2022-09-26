import axios from 'axios'
import React, { useState } from 'react'
import PokeSkillsInfo from './PokeSkillsInfo'

export default function Pokeinfo({ data, showEffects }) {
    // console.log(data)

    const [pokeSkills, setPokeSkills] = useState()

    async function showSkillInfo (url) {
        const result = await axios.get(url)
        // console.log(result.data.effect_entries)

        const skills = result.data.effect_entries.filter((entry) => entry.language.name === 'en')
        // console.log(skills)

        setPokeSkills(skills)
    }


    return (
        <>
            {
                (!data) ? "" : (
                    <>
                        <h1>{data.name}</h1>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt="" />
                        <div className="abilities">
                            {
                                data.abilities.map(poke => {
                                    return (
                                        <div className="group"
                                            key={poke.slot}
                                            onClick={() => {
                                                showSkillInfo(poke.ability.url)
                                            }}>
                                            <h2>{poke.ability.name}</h2>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='skill_detials'>
                            <PokeSkillsInfo skills={pokeSkills} />
                        </div>
                        <div className="base-stat">
                            {
                                data.stats.map(poke => {
                                    return (
                                        <div key={poke.stat.name}>
                                            <h3>{poke.stat.name} : {poke.base_stat}</h3>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                )
            }
        </>
    )
}
