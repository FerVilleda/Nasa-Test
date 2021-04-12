import React from 'react'
import Control from './components/Control';
import FotosGrid from './components/FotosGrid';
import Navbar from './components/Navbar';
//import {FotosContext} from './context/FotosProvider'


function App() {
  //Estados del contexto
  //const {fotos} = React.useContext(FotosContext)



  return (
    <div>
      <Navbar></Navbar>
      <div className='row'>
        <div className='col-md-2'>
          <Control></Control>
        </div>
        <div className='col-md-10'>
          <FotosGrid ></FotosGrid>
        </div>
        
        
      </div>
      
    </div>
  );
}

export default App;
