import storageService from '../services/storage.service'
import { utilService } from './util.service.js'
import { gPlaylists } from "./data";
import axios from 'axios'
import { stationServiceNew } from './station.service';
export const stationService = {
    query,
    saveStation,
    deleteStation,
    getStationById,
    searchSong,
    addToStation,
    removeFromStation,
    getStationByTag,
    searchStation
}
const KEY = 'stations';
var gStations;
let songCache = []

function query(filterBy) {
    return Promise.resolve(gStations)
}

function deleteStation(stationId) {
    var stationIdx = gStations.findIndex(function (station) {
        return stationId === station.id
    })
    gStations.splice(stationIdx, 1)
    _saveStationsToStorage();
    return Promise.resolve()
}

function saveStation(stationToEdit) {
    return stationToEdit._id ? _updateStation(stationToEdit) : _addStation(stationToEdit)
}


function _addStation(stationToEdit) {
    var station = _createStation(stationToEdit)
    gStations.unshift(station)
    _saveStationsToStorage();
    return Promise.resolve(station)
}

function _updateStation(stationToEdit) {
    var stationIdx = gStations.findIndex(function (station) {
        return station.id === stationToEdit.id;
    })
    gStations[stationIdx] = stationToEdit
    _saveStationsToStorage();
    return Promise.resolve()
}

function getStationById(stationId) {
    var station = gStations.find(function (station) {
        return stationId === station._id
    })
    console.log('station by id', station);
    return Promise.resolve(station)
}



function _createStation(stationToEdit) {
    stationToEdit._id = utilService.makeId()
    return stationToEdit
}



function _saveStationsToStorage() {
    storageService.saveToStorage(KEY, gStations)
}



//api 
async function searchSong(keySerch) {
    if (!keySerch) return []
    console.log('service:', keySerch)
    //keySerch = keySerch.trim()
    songCache = storageService.loadFromStorage([keySerch])
    if (songCache) {
        console.log('No need to fetch, retrieving from Cache');
        return (songCache)
    }
    try {
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${keySerch}&type=video&videoCategoryId=10&key=AIzaSyBM9DnPair7lsEiaBpo0qeE55Ok8ncDkks`)
        let idxs = res.data.items.map(track => track.id.videoId)
        idxs = idxs.join()

        let duration = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${idxs}&key=AIzaSyBM9DnPair7lsEiaBpo0qeE55Ok8ncDkks`)
        duration = duration.data.items.map(track => track.contentDetails.duration)
        songCache = res.data
        if (!res.data?.items.length) return []
        const trackResult = res.data.items.map((track, idx) => {
            return {
                id: track.id.videoId,
                title: track.snippet.title,
                imgUrl: track.snippet.thumbnails.high.url,
                duration: duration[idx]
            }
        })

        await storageService.saveToStorage([keySerch], trackResult)
        console.log(trackResult, 'trackResult');
        return trackResult
    }
    catch (err) {
        console.log('Cannot reach server:', err);
    }
}

async function addToStation(track, stationId) {
    const currStation = gStations.find((station) => station._id === stationId)
    currStation.songs.push(track)
    _saveStationsToStorage()
}

async function removeFromStation(track, stationId) {
    const currStation = gStations.find((station) => station._id === stationId)
    const idx = currStation.songs.findIndex(currTrack => track.id === currTrack.id)
    currStation.songs.splice(idx, 1)
    _saveStationsToStorage()
}

async function getStationByTag(tagName) {
    let songCache = gStations.find(station => station.ganer === tagName)
    if (songCache) {
        console.log('No need to fetch, retrieving from Cache', songCache);
        return [songCache]
    }
    //songCache = storageService.loadFromStorage(tagName + "playlist")
    //if (songCache) {
    //    console.log('No need to fetch, retrieving from Cache');
    //    return (songCache)
    //}
    try {
        const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${tagName}&type=playlist&key=AIzaSyBM9DnPair7lsEiaBpo0qeE55Ok8ncDkks`)
        let stations = await res.data.items.map(async (station) => {
            const songs = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${station.id.playlistId}&key=AIzaSyBM9DnPair7lsEiaBpo0qeE55Ok8ncDkks`)
            return {
                genre: tagName,
                name: station.snippet.title,
                tags: [tagName],
                createdBy: {
                    _id: "u101",
                    fullname: "app",
                    imgUrl: "http://some-photo"
                },
                songs: songs.data.items.map((track) => ({
                    id: track.snippet.resourceId.videoId,
                    title: track.snippet.title,
                    imgUrl: track.snippet.thumbnails.high.url,
                    duration: "PT4M26S"
                }))
            }
        })
        stations = await Promise.all(stations)
        //await storageService.saveToStorage(tagName + 'playlist', stations)
        //saveStation(stations[0])
        stationServiceNew.add(stations[0])
        return stations
    }
    catch (err) {
        console.log('Cannot reach server:', err);
    }
}


function searchStation(keySerch) {
    return gStations.filter((station) => {
        if (station.name.includes(keySerch) || station.tags.includes(keySerch)) {
            return station
        }
    })

}





