import './Header.css'
import { useState } from 'react';
import Bookshelf from './backgroundBookshelf.png';
import Laptop from './laptop.png';
import WorkingTable from './working table.png';
import WritingHand from './left-hand-writing.png';
import CoffeeCup from './coffee cup.png';
import Sofa from './sofa.png';
import Notebook from './notebooks.png'

const Header = (title)=> {

    const [scrollTop, setScrollTop] = useState(0);
    let text = document.getElementById('text');
    let bookshelf = document.getElementById('bookshelf');
    let hand = document.getElementById('hand');
    let coffeeCup = document.getElementById('coffeeCup');

    const handleScroll = event => {
      setScrollTop(event.currentTarget.scrollTop);
      console.log('I am scrolling');
      text.style.marginTop = `${value * 2.5}px`;
      coffeeCup.style.left = `${value * 1.5}px`;
      hand.style.left = `${value * -1.5}px`;
      bookshelf.style.top = `${value * 1}px`;
    };


    return (
       <section className = "parallax" onScroll={handleScroll}>
        <img src={Bookshelf} id="bookshelf"/>
        <img src={Laptop} id="laptop"/>
        <img src={WorkingTable} id="table"/> 
        <img src={WritingHand} id="hand"/>
        <img src={CoffeeCup} id="coffeeCup"/>
        <img src={Notebook} id="tree"/>
        <img src={Sofa} id="sofa"/> 
        <h2 id="text">Welcome!</h2>
       </section>
    );
  
   

};

export default Header;

