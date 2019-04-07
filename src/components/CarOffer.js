import React from 'react';

const CarOffer = (props) => {
    console.log(props);
    return ( 
        <div className="offer__container">
            <div className="offer__image-container">
            
                <img src={`https://www.ssangyong.pl/konfigurator-images/images/${props.offer.params.model.toLowerCase()}/${props.offer.params.my}/colors/cars/${props.offer.params.color.replace(' ','_').toLowerCase()}.png`} alt="Photo of the car"></img>
            </div>
            <div className="offer__info-container">
                <div className="offer__info__header">{`${props.offer.params.engine_capacity}
                 ${props.offer.params.fuel_type} 
                 ${props.offer.params.transmission} 
                 ${props.offer.params.fuel_type} | ${props.offer.params.color}` }</div>
                <div className="offer__info__desc">
                    <span className="desc__name">Wersja:</span>
                    <span>{props.offer.params.trim}</span>
                </div>                                
                <div className="offer__info__desc">
                    <span className="desc__name">Rok produkcji:</span>
                    <span>{props.offer. params.year}</span>
                </div>                                
                <div className="offer__info__desc">
                    <span className="desc__name">Rok modelowy:</span>
                    <span>{props.offer.params.my}</span>
                </div>                                
                <div className="offer__info__desc">
                    <span className="desc__name">Wyposażenie:</span>
                    <span>{props.offer.params.option}</span>
                </div>                                                          
            </div>
            <div className="offer__prices-container"></div>
        </div>
     );
}
 
export default CarOffer;