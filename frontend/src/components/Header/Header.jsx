import './Header.css'
import { useState,useRef} from 'react';
import Bookshelf from './backgroundBookshelf.png';
import Laptop from './laptop.png';
import WorkingTable from './working table.png';
import WritingHand from './left-hand-writing.png';
import CoffeeCup from './coffee cup.png';
import Sofa from './sofa.png';
import Notebook from './notebooks.png'

const Header = (title)=> {

    return (
       <section className = "parallax" >
        <img src={Bookshelf} id="bookshelf"/>
        <img src={Laptop}  id="laptop"/>
        <img src={WorkingTable} id="table"/> 
        <img src={WritingHand} id="hand"/>
        <img src={CoffeeCup} id="coffeeCup"/>
        <img src={Notebook}  id="notebook"/>
        <img src={Sofa} id="sofa"/> 
        <h2 id="text" >Welcome!</h2>
       </section>
    );
  
   

};

export default Header;

