import React from 'react'
import classNames from 'classnames';
import Dropdown from 'react-bootstrap/Dropdown';
const Header = (props) => {
    return ( 
        <div className="app__header">
        <div className="header__title">GORĄCE OFERTY</div>
        <div className="header__sort">
          <span style={{marginRight:"10px"}}>SORTUJ: </span>
          <span>
          <Dropdown className="sort-select">
            <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
              {props.sortCarsByPrice==="asc" ? 
              <span>CENA <i className={classNames("fas","fa-caret-up")}></i></span> : 
              <span>CENA <i className={classNames("fas","fa-caret-down")}></i></span>}
            </Dropdown.Toggle>
            <Dropdown.Menu >
              <Dropdown.Item onClick={props.handleChangeSortToAscending} ><span>CENA <i className={classNames("fas","fa-caret-up")}></i></span></Dropdown.Item>
              <Dropdown.Item onClick={props.handleChangeSortToDescending} ><span>CENA <i className={classNames("fas","fa-caret-down")}></i></span></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </span>
        </div>
        </div>
     );
}
 
export default Header;