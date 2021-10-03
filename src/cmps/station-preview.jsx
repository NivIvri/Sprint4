import stationImg from '../assets/img/stationImg.jpg'
import { toggleIsPlaying } from '../store/station.actions.js';
import { setCurrTrack, setQueue } from '../store/station.actions.js';
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router";

class _StationPreview extends React.Component {

    playRandTrack = () => {
        const { station, currStation } = this.props
        if (station._id !== currStation) {
            const songs = [...station.songs];
            const idx = Math.floor(Math.random() * (songs.length))
            const track = songs[idx]
            this.props.setCurrTrack(track, idx);
            this.props.setQueue([...songs], station._id);
        }
        this.props.toggleIsPlaying()
    }

    navigateToStation = (stationId) => {
        this.props.history.push(`/station/${stationId}`)
    }

    render() {
        const { station, currStation, isPlaying } = this.props

        return (
            <div className="station-preview">
                <div className="img-card" onClick={() => this.navigateToStation(station._id)}>
                    <div className="square-ratio station-img-container">
                        {station.songs.length > 0 && station.songs[0]?.imgUrl &&
                            <img src={`${station.songs[0].imgUrl}`} />
                        }
                        {!station.songs.length &&
                            <img src={stationImg} />
                        }

                        <div className="play-icon-container" onClick={(e) => {
                            e.stopPropagation()
                            this.playRandTrack()
                        }}>
                            <i class={`play-icon ${isPlaying && (station._id === currStation) ? "fas fa-pause" : "fas fa-play"}`}></i>
                        </div>
                    </div>
                    <div className="station-name-header">
                        {station.name.length < 25 ? station.name : station.name.slice(0, 25) + '...'}
                    </div>
                    <p className="station-desc">
                        {!station.songs.length ? '' :
                            station.songs.reduce((songStr, song) => {
                                songStr += ',' + song.title
                                return songStr;
                            }, '').slice(0, 30) + '...'}
                    </p>
                </div>
            </div >
        )


    }


}

function mapStateToProps(state) {
    return {
        stations: state.stationMoudle.stations,
        isPlaying: state.stationMoudle.isPlaying,
        queue: state.stationMoudle.queue,
        currTrack: state.stationMoudle.currTrack,
        currStation: state.stationMoudle.currStation,
        user: state.userMoudle.user,

    }
}
const mapDispatchToProps = {
    setCurrTrack,
    setQueue,
    toggleIsPlaying
}


const __StationPreview = connect(mapStateToProps, mapDispatchToProps)(_StationPreview)
export const StationPreview = withRouter(__StationPreview);