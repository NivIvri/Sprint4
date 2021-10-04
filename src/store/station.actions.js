import { stationServiceNew } from "../services/station.service.js";
export function loadStations() {
    return async (dispatch) => {
        try {
            const stations = await stationServiceNew.query()
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

export function addStation(newStation) {
    return async (dispatch) => {
        debugger
        newStation = await stationServiceNew.saveStation(newStation)
        dispatch({
            type: 'ADD_STATION',
            newStation
        })
    }
}

export function unshuffleQueue(playedStationId) {
    return async (dispatch) => {
        let queue = await stationServiceNew.getStationById(playedStationId)
        queue = queue.songs
        dispatch({
            type: 'SET_QUEUE',
            queue,
            stationId: playedStationId
        })
    }
}


//without service
export function setCurrTrack(track, idx) {
    return async (dispatch) => {
        dispatch({
            type: 'SET_CURR_TRACK',
            track,
            idx,
        })
    }
}

export function setQueue(queue, stationId = 0) {
    queue = queue.filter(track => !track.nextQueue)
    return async (dispatch) => {
        dispatch({
            type: 'SET_QUEUE',
            queue,
            stationId
        })
    }
}

export function addToNextQueue(track) {
    return async (dispatch) => {
        let newTrack = { ...track }
        newTrack.nextQueue = true
        dispatch({
            type: 'ADD_TO_NEXT_QUEUE',
            track: newTrack
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

export function toggleIsPlaying() {
    return async (dispatch) => {
        dispatch({
            type: 'TOGGLE_ISPLAYING',
        })
    }
}

export function setPlay() {
    return async (dispatch) => {
        dispatch({
            type: 'SET_PLAY',
        })
    }
}

export function setCurrStation(station) {
    return async (dispatch) => {
        dispatch(
            {
                type: 'SET_CURR_STATION',
                station
            }
        )

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




//function deleteStation(stationId) {
//    var stationIdx = gStations.findIndex(function (station) {
//        return stationId === station.id
//    })
//    gStations.splice(stationIdx, 1)
//    _saveStationsToStorage();
//    return Promise.resolve()
//}
