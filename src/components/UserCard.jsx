import React from "react";

const UserCard = ({ user }) => {
  if (!user) {
    return <p className="text-red-500 text-center">User data is not available.</p>;
  }

  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="flex justify-center">
      <div className="relative bg-white shadow-md rounded-lg w-80 md:w-96 overflow-hidden">
        
        {/* Image with text overlay */}
        <div className="relative">
          <img
            src={photoUrl}
            alt="User"
            className="w-full h-96 object-cover"
          />
          {/* Overlay with text and buttons */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
            <h2 className="text-xl font-bold">{firstName} {lastName}</h2>
            {age && gender && <p className="text-sm">{age}, {gender}</p>}
            <p className="text-sm mt-1">{about}</p>
            
            {/* Buttons Overlay */}
            <div className="flex justify-between mt-4">
              <button className="btn btn-primary w-1/2 mx-1 bg-white/20 hover:bg-white/30 text-white border-white">
                Ignore
              </button>
              <button className="btn btn-secondary w-1/2 mx-1">
                Interested
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserCard;
