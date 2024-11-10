import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setEmail,
  setPhone,
  setAdults,
  setChildren,
  setRooms,
  setPrice,
  setCheckInDate,
  setCheckOutDate,
} from "../utils/bookNowSlice";
import Header from "./Header";
import AboutUs from "./AboutUs";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const BookNow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, phone, adults, children, rooms, price } = useSelector(
    (state) => state.bookNow
  );

  const handleCheckinDate = (e) => {
    dispatch(setCheckInDate(e.target.value));
  };

  const handleCheckOutDate = (e) => {
    dispatch(setCheckOutDate(e.target.value));
  };
  const handleNameChange = (e) => {
    dispatch(setName(e.target.value));
  };

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePhoneChange = (e) => {
    dispatch(setPhone(e.target.value));
  };

  const handleAdultsChange = (e) => {
    dispatch(setAdults(parseInt(e.target.value)));
  };

  const handleChildrenChange = (e) => {
    dispatch(setChildren(parseInt(e.target.value)));
  };

  const handleRoomsChange = (delta) => {
    dispatch(setRooms(rooms + delta));
  };

  const handleBookNow = () => {
    console.log("Booking details:", {
      name,
      email,
      phone,
      adults,
      children,
      rooms,
      price,
    });
    // navigate to  the Bookconfirmed component
    navigate("/bookingconfirmed");
  };

  const calculatePrice = () => {
    const basePrice = 2000; // Base price per room
    const adultPrice = 750; // Additional price per adult
    const childPrice = 200; // Additional price per child

    const totalAdultPrice = adultPrice * adults;
    const totalChildPrice = childPrice * children;
    const totalRoomPrice = basePrice * rooms;

    const totalPrice = totalRoomPrice + totalAdultPrice + totalChildPrice;
    dispatch(setPrice(totalPrice));
  };

  useEffect(() => {
    calculatePrice(); // Calculate price on component mount and on room changes
  });

  return (
    <>
      <Header />
      <div className="bg-white p-4 rounded shadow-md">
        <div className="md:flex md:flex-wrap md:justify-between md:ml-4">
          <div className="md:flex md:flex-row md:mb-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
              className="w-full md:w-1/2 border rounded px-2 py-1 mb-2 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="w-full md:w-1/2 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="md:flex md:ml-4">
          <div className="md:flex md:flex-col md:mb-4">
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full border rounded px-2 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:flex">
            <div className="md:flex md:justify-between md:mb-4">
              <div className="md:flex md:items-center">
                <label className="md:mr-2 md:ml-8">Adults:</label>
                <input
                  type="number"
                  min="1"
                  value={adults}
                  onChange={handleAdultsChange}
                  className="w-full md:w-1/2 border rounded px-2 py-1 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:flex md:items-center">
                <label className="mr-2">Children:</label>
                <input
                  type="number"
                  min="0"
                  value={children}
                  onChange={handleChildrenChange}
                  className="w-full md:w-1/2 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between w-full md:w-[1200px] border border-gray-300">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="flex flex-col">
              <label htmlFor="checkin">CHECK-IN</label>
              <input
                type="date"
                id="checkin"
                className="border border-gray-300 p-2 rounded"
                onChange={handleCheckinDate}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="checkout">CHECK-OUT</label>
              <input
                type="date"
                id="checkout"
                className="border border-gray-300 p-2 rounded"
                onChange={handleCheckOutDate}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
            <div className="flex flex-col ">
              <h1 className="text-lg font-bold ">ROOMS</h1>
              <div className="flex">
                <button
                  className="bg-white-500 hover:bg-white-700 text-black font-bold py-2 px-4 rounded-lg ml-2"
                  disabled={rooms <= 1}
                  onClick={() => handleRoomsChange(-1)}
                >
                  -
                </button>
                <span className="text-lg font-bold">{rooms}</span>
                <button
                  className="bg-white-500 hover:bg-white-700 text-black font-bold py-2 px-4 rounded-lg ml-2"
                  onClick={() => handleRoomsChange(1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex  justify-center items-center relative sm:pl-0 sm:pr-[500px] ">
              <div className="flex">
                <button
                  className="bg-blue-900 hover:bg-blue-900 text-white font-bold py-2 px-4 sm:w-[150px]  rounded"
                  fdprocessedid="wwq2e"
                >
                  ₹ {price}
                  <FaArrowRight
                    className="bg-blue-950 h-10 rounded text-white md:absolute md:top-0 size-11  left-36"
                    onClick={handleBookNow}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <AboutUs />
      </div>
    </>
  );
};

export default BookNow;
