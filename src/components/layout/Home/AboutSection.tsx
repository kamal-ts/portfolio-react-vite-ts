

import { FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa'

function AboutSection() {
  return (
    <div className='container lg:px-28'>
        <h4 className='font-bold uppercase text-main mb-3 px-4'>Tentang Saya</h4>
        <div className='flex flex-col md:flex-row'>
          <div className='w-full px-4 mb-10'>
            <h2 className='font-bold text-dark text-3xl mb-2'>Lorem ipsum dolor sit amet.</h2>
            <p className='text-base font-medium text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum soluta sint, fugiat corporis consectetur esse, culpa beatae eveniet reiciendis sed illo. Magnam placeat nemo animi? Recusandae a reiciendis temporibus facere!</p>
          </div>
          <div className='w-full px-4'>
            <h3 className='font-semibold text-dark text-2xl mb-2'>Hubungi saya</h3>
            <p className='text-base font-medium text-secondary'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque numquam vel fuga tenetur illo odit ratione assumenda, impedit, similique, dolores omnis voluptates eveniet optio perferendis expedita. Dignissimos cumque totam possimus?</p>
              <div className=' flex items-center mt-4 gap-2 '>
                <a href="#" className='transition-all duration-300 text-xl rounded-full flex justify-center items-center text-slate-400 border-2 border-slate-400 p-2 hover:border-main hover:text-white hover:bg-main '>
                  <FaLinkedinIn/>
                </a>
                <a href="#" className='transition-all duration-300 text-xl rounded-full flex justify-center items-center text-slate-400 border-2 border-slate-400 p-2 hover:border-main hover:text-white hover:bg-main '>
                  <FaTwitter/>
                </a>
                <a href="#" className='transition-all duration-300 text-xl rounded-full flex justify-center items-center text-slate-400 border-2 border-slate-400 p-2 hover:border-main hover:text-white hover:bg-main '>
                  <FaInstagram/>
                </a>
                <a href="#" className='transition-all duration-300 text-xl rounded-full flex justify-center items-center text-slate-400 border-2 border-slate-400 p-2 hover:border-main hover:text-white hover:bg-main '>
                  <FaGithub/>
                </a>
              </div>          
          </div>
        </div>
    </div>
  )
}

export default AboutSection