import React from 'react';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames';
const CarOffer = (props) => {
    return ( 
        
        <div className={"offer__container"+ (props.offer.status=="sold" ? " offer--sold1" : " offer--available")}>
            <div className="offer__image-container">
            
                <img src={`https://www.ssangyong.pl/konfigurator-images/images/${props.offer.params.model.toLowerCase()}/${props.offer.params.my}/colors/cars/${props.offer.params.color.replace(' ','_').toLowerCase()}.png`} alt="Photo of the car"></img>
            </div>
            <div className="offer__info-container">
                <div className="offer__info__header">
                 <span style={{fontWeight:600}}>{`${props.offer.params.engine_capacity} ${props.offer.params.fuel_type} `}</span>
                 <span>{`${props.offer.params.transmission} ${props.offer.params.gearbox} | ${props.offer.params.color}` }</span>
                 </div>
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
            <div className="offer__prices-container">
                <div className="price"><span className="price__desc">CENA BAZOWA: </span><span className="price__amount">{props.offer.params.price.srp.replace("&nbsp;"," ")} <sup>PLN</sup></span></div>
                <div className="price"><span className="price__desc">RABAT: </span><span className="price__amount">-{props.offer.params.price.discount.replace("&nbsp;"," ")} <sup>PLN</sup></span></div>
                <div className="price--hot"><span className="price__desc--hot">GORĄCA CENA: </span><span className="price__amount--hot">{props.offer.params.price.hot_price.replace("&nbsp;"," ")} <sup>PLN</sup></span></div>
                <div><Button className="price__button">ZAPYTAJ</Button></div>
            </div>
        {props.offer.status=="sold" ? <div className="offer--sold"><span>SPRZEDANY</span></div> : null}
        </div>
     );
}
 
export default CarOffer;