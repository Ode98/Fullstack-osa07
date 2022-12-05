import { useState, useEffect } from "react"
import axios from "axios"

const useCountry = (name) => {
  const [country, setCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/name/{name}?fullText=true')
      .then(response => {setCountry(response.data)})
  }, [name])

  return country
}

export default useCountry