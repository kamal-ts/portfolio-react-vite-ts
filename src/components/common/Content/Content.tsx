import React from 'react';

const Content: React.FC<{ children: JSX.Element }> = ({children}) => {
  return (

    <section className='w-full h-screen flex pt-16'>
        <div className='max-w-60 lg:max-w-72 w-full hidden lg:block'></div>
        <div className='w-full m-4 '>
            {children}
        </div>
    </section>
  )
}

export default Content
