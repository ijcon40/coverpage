import React, {useRef, useEffect} from 'react';
import {Wrapper} from "./underlay";
import Torus from './torus'
import {makeStyles} from '@material-ui/styles'

const useClasses = makeStyles(theme => ({
    App:{
        width:'100%',
        height:'100%',
        overflow:'hidden',
        overflowY:'hidden'
    }
}))

function Splash() {
    const parentRef   = useRef(null);
    const [dimensions, setDimensions] = React.useState({width:window.innerWidth, height:window.innerHeight})
    const updateDimensions=()=>setDimensions({height:window.innerHeight, width:window.innerWidth})
    useEffect ( () => {
        window.addEventListener('resize', updateDimensions)
        return ()=>window.removeEventListener('resize', updateDimensions)
    }, []);
    const classes = useClasses()
  // return (
  //   <div className={classes.App} ref={parentRef}>
  //     <Wrapper height={dimensions.height} width={dimensions.width}/>
  //   </div>
  // );
      return (
    <div className={classes.App} ref={parentRef}>
     <Torus/>
    </div>
  );
}

export default Splash;
