import React from 'react';
const Content = (props) => {
    return ( 

    <div className="app__content">
        <div className="app__models">
            <div className="models__header">WYBIERZ MODEL</div>
            <div className="models__list">
            {props.models}
            </div>
        </div>
        <div className="app__offers">
            {props.offers}
        </div>
    </div>
     );
}
 
export default Content;