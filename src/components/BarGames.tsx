import '../styles/bar.css';

const BarGames = ({ guessGameProgress, starsAmount }: any) => {
    var stars = [];

    const barProgress = (guessGameProgress * 100) / 16

    for (var index = 1; index <= 3; index++) {
        if (index <= starsAmount) {
            stars.push(true);
        } else {
            stars.push(false)
        }
    }

    function retrieveMarkerClass(index: any, accomplish: any) {
        switch (index) {
            case 0:
                return accomplish ? "marker-5-accomplish" : "marker-5-missing";
            case 1:
                return accomplish ? "marker-10-accomplish" : "marker-10-missing";
            case 2:
                return accomplish ? "marker-16-accomplish" : "marker-16-missing";
            default:
                return "";
        }
    }

    function retrieveMarkerContainerClass(index: any) {
        switch (index) {
            case 0:
                return "marker-container-5";
            case 1:
                return "marker-container-10";
            default:
                return "";
        }
    }

    return (
        <aside className='bar-aside'>
            <h1 className='title'>Progress</h1>
            <div className="bar-container">
                <div className='progressbar-background'>
                    <div className="progressbar-container">
                        <div className="progressbar-complete" style={{ width: barProgress + '%' }}>
                            <div className="progressbar-liquid"></div>
                        </div>
                    </div>
                </div>
                <div className='stars-container'>
                    {stars.map((accomplish, index) => {
                        return <div key={index} className={`marker-container ${retrieveMarkerContainerClass(index)}`}>
                            <div className={`marker ${retrieveMarkerClass(index, accomplish)}`}></div>
                            <div className={`star-container ${index == 0 ? "first-star" : ""}`}>
                                <div className={accomplish ? "star-accomplish" : "star-missing"}></div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className='correct-answers-count-container'>
                <span className="progress">{guessGameProgress} / 16</span>
            </div>
        </aside>
    )
}

export default BarGames;