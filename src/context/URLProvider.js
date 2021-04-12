import React from 'react'

export const URLContext = React.createContext()

const URLProvider = (props) => {
    //obtener la fecha inicial para la primera consulta
    const getFecha = () => {
        const hoy = new Date(Date.now())
        const año = hoy.getFullYear()
        const mes = hoy.getMonth() + 1
        const dia = hoy.getDate() -2
        const h =  `${año}-${mes}-${dia}`
        return(h)
    }

    //Constantes
    const hoy = getFecha()
    const apikey = 'BJZrtZVsvzwt4PKXv5brLhCA74dtOwtdDyThuaYG'

    //Estados
    const [date,setDate] = React.useState(hoy)
    const [rover,setRover] = React.useState('curiosity')
    const [camera,setCamera] = React.useState('fhaz')
    const [tipodate,setTipoDate] = React.useState('earth_date')
    const [page, setPage] = React.useState(1)
    const [url,setUrl] = React.useState(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?${tipodate}=${date}&page=${page}&camera=${camera}&api_key=${apikey}`)
    

    //Funciones
    const setParams = (rov, cam, tdate, date) => {
        setRover(rov)
        setCamera(cam)
        setTipoDate(tdate)
        setDate(date)

        setUrl(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?${tipodate}=${date}&page=${page}&camera=${camera}&api_key=${apikey}`)
    }

    

    return (
        <URLContext.Provider value={{date, rover, camera, tipodate, url, setParams}}>
            {props.children}
        </URLContext.Provider>
    )
}

export default URLProvider
