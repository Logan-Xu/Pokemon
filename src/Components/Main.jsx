import React, { useEffect, useState } from 'react'
import Card from './Card'
import PokeInfo from './PokeInfo'
import axios from 'axios'

const Main = () => {
    let isFirstTimeLoadingData = true

    const [pokeData, setPokeDate] = useState([])
    const [loading, setLoading] = useState(true)
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon")
    const [nextUrl, setNextUrl] = useState()
    const [prevUrl, setPrevUrl] = useState()
    const [pokeInfo, setPokeInfo] = useState()

    // console.log("there!!!")

    const pokeFun = async () => {
        setLoading(true)
        await axios.get(url).then(res => {
            // console.log(res.data.results)
            setPrevUrl(res.data.previous)
            setNextUrl(res.data.next)
            // console.log(isFirstTimeLoadingData)
            if (isFirstTimeLoadingData) {
                // console.log("here!!!!!")
                getPokemon(res.data.results)
                // console.log(pokeData)
                isFirstTimeLoadingData = false
            }
        })
        setLoading(false)
    }


    async function getPokemon(res) {
        res.map(async (item) => {
            const result = await axios.get(item.url)
            // console.log(result.data)
            setPokeDate(pokeData => {
                pokeData = [...pokeData, result.data]
                pokeData.sort((a, b) => a.id > b.id ? 1 : -1)
                // console.log(pokeData)
                return pokeData
            })
        })
    }

    useEffect(() => {
        // console.log("here !!!")
        pokeFun()
    }, [url])

    // if (loading) return "Loading..."

    return (
        <>
            <div className="container">
                <div className="left-content">
                    <Card pokemons={pokeData} loading={loading} pokemonInfo={poke => setPokeInfo(poke)} />
                    <div className="btn-group">
                        { prevUrl && <button onClick={() => {
                            setPokeDate([])
                            setUrl(prevUrl)
                        }}>Previous</button>}
                        { nextUrl && <button onClick={() => {
                            setPokeDate([])
                            setUrl(nextUrl)
                        }}>Next</button>}
                    </div>
                </div>
                <div className="right-content">
                    <PokeInfo data={pokeInfo} />
                </div>
            </div>
        </>
    )
}

export default Main
