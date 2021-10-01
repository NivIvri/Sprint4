import { Link } from 'react-router-dom';
import stationImg from '../assets/img/stationImg.jpg';

export function FavoriteArtists({ artists }) {
    return (
        <div className="favorite-artists">
            {artists.map((artist, idx) => {
                return (<Link to={`/searchs/${artist.artist}`} className="station-container" key={idx}>
                    <img src={artist.img} />
                    <h3>{artist.artist}</h3>
                </Link >
                )
            })}
        </div >
    )
}