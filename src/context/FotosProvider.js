import React from 'react'

export const FotosContext = React.createContext()

const FotosProvider = (props) => {
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
    const cCams = ['Todas','fhaz', 'rhaz', 'mast', 'chemcam', 'mahli', 'mardi','navcam']
	const oCams = ['Todas','fhaz', 'rhaz','navcam', 'pancam', 'minites']

    //Estados y Contexto
    const [fotos,setFotos] = React.useState([])
    const [page, setPage] = React.useState(1)
    const [date,setDate] = React.useState(hoy)
    const [rover,setRover] = React.useState('curiosity')
    const [camera,setCamera] = React.useState('Todas')
    const [tipodate,setTipoDate] = React.useState('earth_date')
    const [url,setUrl] = React.useState(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?${tipodate}=${date}&page=${page}&api_key=${apikey}`)
    
    
    //Funcion que se ejecuta al iniciar
    React.useEffect(()=>{
        console.log(`fotosProvider dice: ${url}`)
        obtenerFotos()
    }, [url])

    //Funciones
     const setParams = (rov, cam, tdate, date) => {
        const pp = 1
        setPage(pp)
        setRover(rov)
        setCamera(cam)
        setTipoDate(tdate)
        setDate(date)

        if (cam!== 'Todas') {
            setUrl(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rov}/photos?${tdate}=${date}&page=${pp}&camera=${cam}&api_key=${apikey}`)
            
        } else {
            setUrl(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rov}/photos?${tdate}=${date}&page=${pp}&api_key=${apikey}`)  
        } 
    }

    const obtenerFotos = async() => { 
        if (localStorage.getItem(url)) {
            setFotos(JSON.parse(localStorage.getItem(url)))
            console.log('fuente: local storage')
            return
        }

        //si los datos no estan ya en el local storage hace la llamada a la API
            try {
                console.log('Llamando API')
                const res = await fetch(`${url}`)
                const data = await res.json()
                console.log(data)
                setFotos(data.photos)
                console.log('Llamada Exitosa')
                localStorage.setItem(url,JSON.stringify(data.photos))
                //console.log('consulta guardada en localStorage')
            } catch (error) {

                console.log(`Error al llamar a la api ${error}`)
            } 
    
    }

     const obtenerSigFotos = () => {
         const n = page + 1;
         console.log(n)
         const nextp = (`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?${tipodate}=${date}&page=${n}&api_key=${apikey}`)
         console.log(`la siguiente url es: ${nextp}`)
         
         if (localStorage.getItem(nextp)) {
            setFotos(JSON.parse(localStorage.getItem(nextp)))
            console.log('siguientes obtenidos, fuente: local storage')
            setPage(n)
            return
         }
         setUrl(nextp)
         setPage(n)
         console.log(n)
    }

    const obtenerAntFotos = () => {
        if (page>1) {
            const p = page - 1
            const prevp = (`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?${tipodate}=${date}&page=${p}&api_key=${apikey}`)
            console.log(`la URL previa es: ${prevp}`)
            if (localStorage.getItem(prevp)) {
                setFotos(JSON.parse(localStorage.getItem(prevp)))
                console.log('previos obtenidos, fuente: local storage')
                setPage(p)
                return
            }else{
                setUrl(prevp)
                setPage(p)
            } 
        } else {
            return
        }
    }
    
    return (
        <FotosContext.Provider value={{date, rover, camera, tipodate, url, fotos, cCams, oCams, page, 
                                        setParams,obtenerSigFotos, obtenerAntFotos}}>
            {props.children}
        </FotosContext.Provider>
    )
}

export default FotosProvider
