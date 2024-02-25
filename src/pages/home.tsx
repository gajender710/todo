// Home.tsx
import { useAppContext } from "@/context/app-context";
import { userService } from "@/service/users";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { setSelectedUser } = useAppContext();
  const navigate = useNavigate();
  const selectedOption = useRef<any>(null);
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [dropDownSize, setDropDownSize] = useState(1);

  const getAllUsers = async () => {
    setLoading(true);
    const { data, error, success } = await userService.getUsers();
    if (!success || !data?.length) {
      return;
    }
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const onGetStarted = () => {
    const user =
      selectedOption.current.value !== "default"
        ? users.find((user) => (user.id = selectedOption.current.value))
        : null;
    if (!user) {
      alert("Please select a user");
      return;
    }
    navigate("todo");
    setSelectedUser(user);
  };

  const toggleDropdown = () => {
    if (dropDownSize === 1) {
      setDropDownSize(10);
      return;
    }
    selectedOption.current?.blur();
    setDropDownSize(1);
  };

  return (
    <div className="flex h-screen flex-col justify-center items-center bg-gray-50 px-8">
      {loading ? (
        <div className="flex h-full w-full justify-center items-center">
          <h2 className="text-4xl">Loading...</h2>
        </div>
      ) : (
        <div className="flex flex-col w-full sm:max-w-lg  items-start justify-center py-12 px-6 lg:px-8 space-y-8 bg-white rounded-lg shadow-lg">
          <h2 className=" text-center text-3xl font-extrabold text-gray-900 ">
            Login
          </h2>

          <div className="flex flex-col w-full space-y-4">
            <div className="relative mb-10">
              <select
                ref={selectedOption}
                title="User"
                name="user"
                onFocus={toggleDropdown}
                onBlur={toggleDropdown}
                onChange={toggleDropdown}
                size={dropDownSize}
                className="absolute w-full text-sm border border-black py-2 text-gray-900 rounded-md focus:outline-none  "
              >
                <option value={"default"} className="">
                  Select User
                </option>
                {users.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={onGetStarted}
              className="flex w-full justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-500 "
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
