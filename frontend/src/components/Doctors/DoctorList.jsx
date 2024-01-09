
import { doctors } from './../../assets/data/doctors'
import DoctorCard from './DoctorCard'

import { BASE_URL } from '../../config'
import useFetchData from '../../hooks/useFetchData'
import Loading from '../Loader/Loading'
import Error from '../Error/Error'

// console.log(doctors)
const DoctorList = () => {

  const {data:all_doc, loading, error} = useFetchData(`${BASE_URL}/doctors`);
  const top_docs = all_doc.sort((a, b) => b.averageRating - a.averageRating) ||[]; 
  console.log(top_docs)

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
        {top_docs.slice(0, 6).map(doctor=><DoctorCard key = {doctor._id} doctor = {doctor}/>)}
        {/* Hello Peter */}
    </div>
  )
}

export default DoctorList