import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-orange-500 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {/* Destination */}
      <div className="flex items-center bg-white p-3 rounded-lg shadow-md">
        <MdTravelExplore size={25} className="mr-2 text-orange-500" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none p-2 rounded-md"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      {/* Adults and Children */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md">
          <label htmlFor="adults" className="text-sm font-semibold text-gray-600">Adults</label>
          <input
            id="adults"
            className="w-full p-2 text-center rounded-md focus:outline-none"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </div>
        <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md">
          <label htmlFor="children" className="text-sm font-semibold text-gray-600">Children</label>
          <input
            id="children"
            className="w-full p-2 text-center rounded-md focus:outline-none"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </div>
      </div>

      {/* Check-in Date */}
      <div className="bg-white p-3 rounded-lg shadow-md">
        <label htmlFor="checkin" className="text-sm font-semibold text-gray-600">Check-in</label>
        <DatePicker
          id="checkin"
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="w-full bg-white p-2 rounded-md focus:outline-none shadow-md"
          wrapperClassName="w-full"
        />
      </div>

      {/* Check-out Date */}
      <div className="bg-white p-3 rounded-lg shadow-md">
        <label htmlFor="checkout" className="text-sm font-semibold text-gray-600">Check-out</label>
        <DatePicker
          id="checkout"
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsEnd
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="w-full bg-white p-2 rounded-md focus:outline-none shadow-md"
          wrapperClassName="w-full"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 col-span-2 sm:col-span-3 xl:col-span-4 justify-center">
        <button className="w-1/2 bg-blue-600 text-white p-3 font-bold text-xl rounded-md hover:bg-blue-500 transition duration-200">
          Search
        </button>
        <button type="reset" className="w-1/2 bg-red-600 text-white p-3 font-bold text-xl rounded-md hover:bg-red-500 transition duration-200">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
