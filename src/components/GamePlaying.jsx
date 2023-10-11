function GamePlaying(props) {

    return (
        <div className='gameContainer'>
            <p className='gameNameList'>{props.title}</p>
            <img src={props.image} className='gameImage' />
        </div>
    )
}

export default GamePlaying;