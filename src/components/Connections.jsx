import React, { useEffect } from "react";
import { BASE_URL } from "../constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0)
    return (
      <div className="flex justify-center items-center h-[80vh] text-2xl font-bold">
        No Connections Found
      </div>
    );
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>
      {connections.map((connection) => {
        const {_id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div key={_id} className="flex m-4 p-4 rounded-lg bg-gray-700 w-1/2 mx-auto">
            <div>
              <img
                alt="Photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                    {firstName+" "+lastName}
                </h2>
                {age && gender && <p>{age+" , "+gender}</p>}
                <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
