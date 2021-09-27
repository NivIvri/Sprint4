import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

export function TrackPreview({ track, idx, playTrack, onAddToNextQueue }) {
    return (
        <tr className="song-container" onClick={() => playTrack(track, idx)}>
            <td className='song-num'>{idx + 1}</td>
            <td><img src={track.imgUrl} alt="" /></td>
            <td>{track.title}</td>
            <td>{getTimeFromDuration(track.duration)}</td>
            <td className="button-cell" onClick={(ev) => { ev.stopPropagation() }}>
                <Menu menuButton={<MenuButton><i className="fas fa-ellipsis-h"></i></MenuButton>}>
                    <MenuItem onClick={() => onAddToNextQueue(track)}>Add To queue</MenuItem>
                </Menu>
            </td>
        </tr>
    )
}


function getTimeFromDuration(duration) {
    // let time = '';
    // for (var i = 0; i < duration.length; i++) {
    //     switch (duration[i]) {
    //         case 'M':
    //         case 'H':
    //             time += ':'
    //             break;
    //         case 'S':
    //         case 'T':
    //         case 'P':
    //             break;
    //         default:
    //             time += duration[i]
    //     }
    // }
    var hours = 0;
    var minutes = 0;
    var seconds = 0;

    duration = duration.replace('PT', '');
    if (duration.indexOf('H') > -1) {
        var hours_split = duration.split('H');
        hours = parseInt(hours_split[0]);
        duration = hours_split[1];
    }
    if (duration.indexOf('M') > -1) {
        var minutes_split = duration.split('M');
        minutes = parseInt(minutes_split[0]);
        duration = minutes_split[1];
    }
    if (duration.indexOf('S') > -1) {
        var seconds_split = duration.split('S');
        seconds = parseInt(seconds_split[0]);
    }
    var str = "";
    if (hours != 0) { str += hours + ":"; }
    if (minutes == 0) { str += "00" + ":"; }
    else if (minutes < 10) { str += "0" + minutes + ":"; }
    else if (minutes > 10) { str += minutes + ":"; }
    else if (minutes == 0) { str += "00:" }
    if (seconds > 0 && seconds < 10) { str += "0" + seconds; }
    else if (seconds < 10) { str += "0" + seconds; }
    else if (seconds > 10) { str += seconds; }
    else if (seconds == 0) { str += "00" }

    return str;
    // return time;
}