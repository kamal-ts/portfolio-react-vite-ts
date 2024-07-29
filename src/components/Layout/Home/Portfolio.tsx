/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from 'react'
import { ProjectType } from '../Admin/Project/interface';
import axios from 'axios';
import { API_MYPROJECT_ENDPOINTS } from '../../../util/apiConfig';
import { useNavigate } from 'react-router-dom';
import RegularLoading from '../../common/Loading/RegularLoading';

function Portfolio() {

  const navigate = useNavigate();


  const [project, setProject] = useState<[ProjectType] | undefined>()
  const [error, setError] = useState("")
  // const [queryParams, setQueryParams] = useState<QueryParams | null>(null);

  const getProject = async () => {
    try {
      const result = await axios.get(API_MYPROJECT_ENDPOINTS, {
        params: {
          status: 2,
        }
      });
      setProject(result.data.data);
    } catch (error) {
      setError("Data is undifined")
    }
  } 

  useEffect(() => {
    getProject()
  }, [])
  
  return (
    <div className='container lg:px-28'>
      <div className='w-full px-4'>
        <div className='max-w-xl mx-auto text-center mb-16'>
          <h4 className='font-semibold text-lg text-main mb-2 uppercase'>Portfolio</h4>
          <h2 className='font-bold text-dark text-3xl mb-4'>Project Terbaru</h2>
          <p className='font-medium text-sm md:text-lg'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil asperiores dolore magnam! Autem soluta tenetur ipsa sint eum reprehenderit placeat.</p>
        </div>
      </div>
      <div className='w-full flex flex-wrap justify-center xl:w-10/12 xl:mx-auto '>
      {error && (
        <h1>{error}</h1>
      )}
      
        {project && project.map<JSX.Element>((p: ProjectType , i: number) => (

          <div className='p-4 md:w-1/2 w-full' key={i}>
            <div onClick={() => {navigate('/'+p.id)}} className='overflow-hidden bg-white shadow-lg border-2 rounded-2xl hover:border-sky-400 transition duration-300 hover:cursor-pointer'>
              <img src={`${p.image[0].secure_url}`} alt="portfolio" className={"w-full h-56 lg:h-60 object-cover"} />
              <div className='px-4 pb-4'>
                <h3 className='font-semibold text-lg text-dark mt-5 mb-2 truncate'>{p.title}</h3>
                {/* <h4 className='text-main'>{p.category}</h4> */}
                <div className='flex gap-1 flex-wrap'>
                {p.tag.split(',').map((t: string, i2: number) => (

                <span className='text-main py-0.5 px-2 rounded-lg bg-mddark text-xs' key={i2}>{t}</span>
                ))}
                </div>
              </div>
            </div>
          </div>
        )) || (
          <RegularLoading/>
        )}

        

      </div>
    </div>
  )
}

export default Portfolio