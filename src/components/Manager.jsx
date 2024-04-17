import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    toast("🦄 Copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/hidden.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 && form.username.length > 3 && form.password.length > 3 ) {
      await fetch("http://localhost:3000/",{method: "DELETE",headers:{"content-Type":"application/json"},body: JSON.stringify({ id:form.id })})

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/",{method: "POST",headers:{"content-Type":"application/json"},body: JSON.stringify({...form, id:uuidv4() })})
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      // );
      // console.log([...passwordArray, form]);
      setForm({ site: "", username: "", password: "" });
      toast("Password saved !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error : Password not saved !");
    }
  };

  const deletePassword =async (id) => {
    console.log("Deleting password with id ", id);
    let c = confirm("Do you really want to delete this");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // );
    await fetch("http://localhost:3000/",{method: "DELETE",headers:{"content-Type":"application/json"},body: JSON.stringify({ id })})

      toast("Password deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id ", id);
    setForm({...passwordArray.filter((i) => i.id === id)[0],id: id});

  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-3 md:mycontainer min-h-[84.6vh]">
        <h1 className="text-4xl text text-center font-bold">
          <span className="text-green-500"> &lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-700 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="text-white flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1 text-black"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col  md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter User name"
              className="rounded-full border border-green-500 w-full p-4 py-1 text-black"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1 text-black"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer "
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={28}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-8">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border border-white text-center ">
                        <div className=" flex justify-center items-center">
                          <a href="{item.site}" target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-6 cursor-pointer mx-1"
                            onClick={() => copyText(item.site)}
                          >
                            <img src="icons/copy2.gif" alt="" trigger="hover" />
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center w-32">
                        <div className=" flex justify-center items-center">
                          {item.username}
                          <div
                            className="lordiconcopy size-6 cursor-pointer mx-1"
                            onClick={() => copyText(item.username)}
                          >
                            <img src="icons/copy2.gif" alt="" trigger="hover" />
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center w-32">
                        <div className=" flex justify-center items-center">
                          {"*".repeat(item.password.length)}
                          <div
                            className="lordiconcopy size-6 cursor-pointer mx-1"
                            onClick={() => copyText(item.password)}
                          >
                            <img src="icons/copy2.gif" alt="" trigger="hover" />
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center w-32">
                        <span className=" cursor-pointer flex mx-10">
                          <img
                            onClick={() => {
                              editPassword(item.id);
                            }}
                            src="/icons/edit.png"
                            alt="Edit"
                            style={{ width: "20px", height: "20px" }}
                          />
                          <img
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                            className="mx-11"
                            src="/icons/delete.png"
                            alt="Edit"
                            style={{
                              width: "20px",
                              height: "20px",
                              "margin-right": "10px",
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
