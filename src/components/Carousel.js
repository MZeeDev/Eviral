import React, {useState, useEffect} from 'react';
import './Carousel.css';

const Carousel = (props) => {
    const {children, show, loop} = props

    const [currentIndex, setCurrentIndex] = useState(0);
    const [length, setLength] = useState(children.length);

    const [isRepeating, setIsRepeating] = useState(loop && children.length > show)
    const [transitionEnabled, setTransitionEnabled] = useState(true)

    const next = () => {
        if (isRepeating || currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const prev = () => {
        if (isRepeating || currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    const handleTransitionEnd = () => {
        if (isRepeating) {
            if (currentIndex === 0) {
                setTransitionEnabled(false)
                setCurrentIndex(length)
            } else if (currentIndex === length + show) {
                setTransitionEnabled(false)
                setCurrentIndex(show)
            }
        }
    }

    const renderExtraPrev = () => {
        let output = []
        for (let index = 0; index < show; index++) {
            output.push(children[length - 1 - index])
        }
        output.reverse()
        return output
    }

    const renderExtraNext = () => {
        let output = []
        for (let index = 0; index < show; index++) {
            output.push(children[index])
        }
        return output
    }

    useEffect(() => {
        setLength(children.length)
        setIsRepeating( loop && children.length > show)
    }, [children, loop, show])

    useEffect(() =>{
        if (isRepeating){
            if (currentIndex === show || currentIndex === length) {
                setTransitionEnabled(true)
            }
        }
    }, [currentIndex, isRepeating, show, length])

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
            <button className="left-arrow" onClick={prev}>
            <i class="fas fa-arrow-alt-circle-left"></i>
            </button>
                <div className="carousel-content-wrapper">
                    <div className={`carousel-content show-${show}`} style={{ transform: `translateX(-${currentIndex * (100/ show)}%)`, 
                        transition: !transitionEnabled ? 'none' : undefined, }}
                        onTransitionEnd={() => handleTransitionEnd()}
                        >
                        {(length > show && isRepeating) && 
                        renderExtraPrev()
                        }
                        {children}
                        {(length > show && isRepeating) &&
                            renderExtraNext()
                        }                    
                    </div>
                </div>               
                    <button onClick={next} className="right-arrow">
                    <i class="fas fa-arrow-alt-circle-right"></i>
                    </button>
            </div>
        </div>
    )
}

export default Carousel;
