import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import Skills from './Skills';
import Portfolio from './Portfolio';
import Clients from './Clients';
import Blog from './Blog';
import Contact from './Contact';
import Footer from './Footer';

const Home: React.FC = () => {
  return (
    <div className='bg-white'>
      <Header/>
      <section id='home' className='pt-5 md:pt-14'>
        <HeroSection/>
      </section>
      <section id='about' className='pt-36 pb-32'>
        <AboutSection/>
      </section>
      <section id='skills' className='pt-36 pb-32'>
        <Skills/>
      </section>
      <section id='portfolio' className='pt-36 pb-16 bg-slate-100'>
        <Portfolio/>
      </section>
      <section id='clients' className='pt-36 pb-32 bg-dark'>
        <Clients/>
      </section>
      <section id='blog' className='pt-36 pb-32 bg-slate-100'>
        <Blog/>
      </section>
      <section id='contact' className='pt-36 pb-32'>
        <Contact/>
      </section>
      <footer id='footer' className='pt-24 pb-12 bg-dark'>
        <Footer/>
      </footer> 
      
    </div>
  );
};

export default Home;
