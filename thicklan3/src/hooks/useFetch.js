import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error(`HTTP Fail! status: ${response.status}`)
                }
                const result = await response.json()
                setData(url)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            } 
        }

        if (url) {
            fetchData()
        }
    }, [url])
    
    return { data, loading, error }
}

export default useFetch