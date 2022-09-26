import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Pokeeffect({ effect }) {
    console.log(effect)

    const [skills, setSkills] = useState([])
    const [pokeEffect, setPokeEffect] = useState()

    const pokeSkill = async () => {
        await axios.get(effect).then(res => {
            console.log(res.data)
            const result = res.data.effect_entries.filter((entry) => {
                if (entry.language.name === 'en') return entry.effect
            })
            console.log(result)
            setSkills(result)
            skills.map(skill => console.log(skill.effect))
        })
    }

    useEffect(() => {
        pokeSkill()
    }, [effect])

    return (
        <>
            <h1>Okay?</h1>
            {
                !(effect) ? "" : (
                    skills.map((skill) => {
                        return (
                            <div key={skill.effect} className="skill">
                                <h5>{skill.effect}</h5>
                            </div>
                        )
                    })
                )
            }
        </>
    )
}
