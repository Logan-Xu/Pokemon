import React from 'react'

export default function PokeSkillsInfo({ skills }) {
    console.log(skills)
  return (
    !(skills) ? "" : (
        skills.map((skill) => {
            return(
                <div>{skill.effect}</div>
            )
        })
    )
  )
}
