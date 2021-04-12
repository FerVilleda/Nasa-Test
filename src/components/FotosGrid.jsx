import React from 'react'
import {FotosContext} from '../context/FotosProvider'
import FotoI from './FotoI'

const FotosGrid = () => {
    //Estados del contexto
    const {fotos, obtenerSigFotos, page, obtenerAntFotos} = React.useContext(FotosContext)

    return (
        <div className='row m-2'>
            {
                fotos.map( (item) => (
                    <FotoI 
                        key={item.id} 
                        imgSrc={item.img_src}
                        cam={item.camera.name}
                        rov={item.rover.name}></FotoI>
                ))
            }

            <div className='d-flex justify-content-center m-3'>
                {
                    page > 1 ? (
                            <button 
                                className='btn btn-outline-dark me-5'
                                onClick={() => obtenerAntFotos()}    
                            > 
                                Anterior 
                            </button>
                    ) : (
                        null
                    )
                }

                {
                    fotos.length === 25 ? (
                        <button 
                            className='btn btn-outline-dark'
                            onClick={() => obtenerSigFotos()}    
                        > 
                            Siguiente 
                        </button>
                    ):(
                        null
                    )
                }
                
            </div>
        </div>
    )
}

export default FotosGrid
