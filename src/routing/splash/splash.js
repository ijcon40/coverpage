import React, {useRef, useEffect} from 'react';
import Torus from './figures/torus'
import {makeStyles} from '@material-ui/styles'
import {Typography, Button, ThemeProvider, createMuiTheme} from '@material-ui/core'

const HEADER_COLOR = '#FC766A';
const TEXT_COLOR = '#FC766A';
const BACKGROUND_COLOR = '#000';

// const BACKGROUND_COLOR = '#4B84B1';

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: HEADER_COLOR,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        }
    }
});


function Splash() {
    const parentRef = useRef(null);
    const [dimensions, setDimensions] = React.useState({width: window.innerWidth, height: window.innerHeight})
    const updateDimensions = () => setDimensions({height: window.innerHeight, width: window.innerWidth})
    useEffect(() => {
        window.addEventListener('resize', updateDimensions)
        return () => window.removeEventListener('resize', updateDimensions)
    }, []);

    const useClasses = makeStyles(theme => ({
        App: {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            overflowY: 'hidden'
        },
        root: {
            ...theme.typography.button,
            backgroundColor: BACKGROUND_COLOR,
            color: TEXT_COLOR,
            padding: theme.spacing(1),
        },
    }));

    const classes = useClasses()
    // return (
    //   <div className={classes.App} ref={parentRef}>
    //     <Wrapper height={dimensions.height} width={dimensions.width}/>
    //   </div>
    // );
    return (
        <div className={classes.App} ref={parentRef}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: dimensions.height,
                minWidth: dimensions.width,
                backgroundColor: BACKGROUND_COLOR,
                justifyContent: 'center'
            }}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography variant={'h3'} style={{
                        fontWeight:600,
                        color: HEADER_COLOR, '-webkit-font-smoothing': 'antialiased',
                        '-moz-osx-font-smoothing': 'grayscale'
                    }}>WORK SHOULD BE ART</Typography>
                    <Torus background={BACKGROUND_COLOR} text={TEXT_COLOR}/>
                    <ThemeProvider theme={theme}>
                        <Button variant={'outlined'} color={'primary'}>See My Work</Button>
                    </ThemeProvider>

                </div>
            </div>
        </div>
    );
}

export default Splash;
