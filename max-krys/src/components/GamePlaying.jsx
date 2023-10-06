function GamePlaying(props) {

    return (
        <div>
            <p>{props.title}</p>
            <img src={props.image} style={{ height: "100px" }} />
        </div>
    )
}

export default GamePlaying;