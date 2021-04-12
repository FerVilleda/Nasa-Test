import React from 'react'


const FotoI = (props) => {
    //Estados del contexto 

    return (
        <div className='col-md-2'>
            <div className='card mt-4 text-center'>
                <div className='card-body'>
                    <img src={props.imgSrc} className='img-fluid' alt=''></img>
                    <p className='card-text'> Rover: {props.rov}</p>
                    <p className='card-text'> Camara: {props.cam}</p>
                </div>
            </div>
        </div>
    )
}

export default FotoI
