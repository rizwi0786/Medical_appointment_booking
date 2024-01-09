/* eslint-disable react/prop-types */
import { seperate } from "../../utils/seperateslot";

const SidePanel = ({ doctor }) => {
  console.log(doctor);
  const slots = doctor.timeSlots || [];

  return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
          {doctor.ticketPrice} INR
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available Time slot
        </p>
        <ul className="mt-3">
          {slots.map((slot, index) => {
            const [str,day, time] = seperate (slot);
            return (
              <li key={index} className="flex items-center justify-between mb-2">
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {day}
                </p>
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {time}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <button className="btn px-2 w-full rounded-md">Book Appointment</button>
    </div>
  );
};

export default SidePanel;
