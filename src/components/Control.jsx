import React from 'react'
import {FotosContext} from '../context/FotosProvider'

const Control = () => {
    //Contexto de url
    const {date, camera, rover,tipodate, setParams, cCams, oCams} = React.useContext(FotosContext)
    
    //Estados
    const [explorador,setExplorador] = React.useState(rover)
    const [camara,setCamara] = React.useState(camera)
    const [tipofecha,setTipoFecha] = React.useState(tipodate)
    const [fecha,setFecha] = React.useState(date)
    const [error,setError] = React.useState(null)

    const enviarDatos = (e) =>{
        e.preventDefault()
        console.log(`has elegido ${explorador}, ${camara}, ${fecha}, ${tipofecha}`)
        //validar formato de fecha con el tipo elegido?
        setParams(explorador, camara, tipofecha, fecha)

        //Hacer la llamada para construir la URL
    }

    return (
        <div className="m-3">
            <div className='text-center m-3'>
                <img 
                    alt='' 
                    src='https://api.nasa.gov/assets/img/favicons/favicon-192.png' 
                    className='img-fluid m-3 text-center'></img>
            </div>
             <form onSubmit={enviarDatos}>
                <label>Explorador:</label>
                <select 
                    className="form-select form-select m-3"
                    value={explorador}
                    onChange={e => setExplorador(e.target.value)}>
                    <option value="curiosity">Curiosity</option>
                    <option value="opportunity">Opportunity </option>
                    <option value="spirit">Spirit</option>
                </select>

                <label>Camara:</label> 
                 {
                     explorador==='curiosity' ? (
                        <>                            
                        <select 
                            className="form-select form-select m-3"
                            value={camara}
                            onChange={e => setCamara(e.target.value)} 
                        >
                            {
                                cCams.map(cam => (
                                    <option value={cam} key={cam}>{cam}</option>
                                ))
                            }
                        </select>
                        </>
                     ) : (
                        <>                            
                        <select 
                            className="form-select form-select m-3"
                            value={camara}
                            onChange={e => setCamara(e.target.value)} 
                        >
                            {
                                oCams.map(cam => (
                                    <option value={cam} key={cam}>{cam}</option>
                                ))
                            }
                        </select>
                        </>
                     )
                 }

                

                <label>Fecha:</label>
                <input 
                    type='text' 
                    placeholder='2021-4-7 o 988'
                    className='form-control m-3'
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}>
                </input>

                <div className="form-check mt-3">
                    <input 
                        className="form-check-input" 
                        type="radio"
                        value={tipofecha}
                        onChange={e => setTipoFecha(e.target.value)}
                        checked={tipofecha === 'earth_date'}/>
                    <label className="form-check-label">
                        Eart date
                    </label>
                </div>
                <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="radio"
                        value='sol'
                        onChange={e => setTipoFecha(e.target.value)} 
                        checked={tipofecha === 'sol'}/>
                    <label className="form-check-label">
                        Sol date
                    </label>
                </div>

                <div className='mt-3 d-grid gap-2'>
                    <button 
                        className="btn btn-dark text-center"
                        type='submit'>
                            Aplicar Filtros
                    </button>
                </div>
                
            </form>
        </div>
    )
}

export default Control
