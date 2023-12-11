import React from 'react';
import { Button, Grid} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import './Schwazi.css';

function Welcome() {
    const navigate = useNavigate();

    //Navigate to start page
    const startBTN = () => {
        navigate('/start');
    }

    return (
        <Grid className='welcomeContainer'>
            <h1 className='welcomeTitle'>C<span>h</span>wazi</h1>
            <Grid className='circleContainer'>
                <Grid className='circleDif'></Grid>
                <Grid className='circle'></Grid>
            </Grid>
            <Grid className='circleContainer'>
                <Grid className='circle'></Grid>
                <Grid className='circle'></Grid>
            </Grid>
            <Grid className='welcomeBTN'>
                <Button onClick={() => startBTN()}>Start</Button>
            </Grid>
        </Grid>
    );
}

export default Welcome;
