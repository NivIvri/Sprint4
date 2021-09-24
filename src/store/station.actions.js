import { stationService } from "../services/async-storage.service.js";

export function loadStations() {
    return async (dispatch) => {
        try {
            const stations = await stationService.query()
            console.log('stations from DB:', stations)
            dispatch({
                type: 'SET_STATIONS',
                stations
            })
        }
        catch (err) {
            console.log(`Had Issues ${err}`)
            throw err
        }
    }
}

export function setCurrTrack(track, idx) {
    return async (dispatch) => {
        dispatch({
            type: 'SET_CURR_TRACK',
            track,
            idx
        })
    }
}

export function addToQueue(station) {
    return async (dispatch) => {
        dispatch({
            type: 'ADD_TO_QUEUE',
            queue: station
        })
    }
}

export function playNextTrack() {
    return async (dispatch) => {
        dispatch({
            type: 'NEXT_TRACK',
        })
    }
}

export function playPrevTrack() {
    return async (dispatch) => {
        dispatch({
            type: 'PREV_TRACK',
        })
    }
}

export function shuffleQueue(queue) {
    for (let i = queue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = queue[i];
        queue[i] = queue[j];
        queue[j] = temp;
    }
    return async (dispatch) => {
        dispatch({
            type: 'SHUFFLE_QUEUE',
            queue
        })
    }
}


