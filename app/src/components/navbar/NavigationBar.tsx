/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { sidebarStructure } from "./structure";
import { Link } from "react-router-dom";

interface NavigationBarProps {
  setExpand: (value: boolean) => void;
}

export const NavigationBar = (props: NavigationBarProps) => {
  const { setExpand } = props;
  const username = "Manh";
  const company = "FPT";
  const profilePic = " ";
  const link = "/";
  const [activeName, setActiveName] = useState("");
  const activeLink = window.location.pathname;
  const [isExpand, setIsExpand] = useState(true);
  const isExpandOnHover = false;

  const generateMenu = (item: any, index: number, recursive: number = 0) => {
    if (activeName === "" && activeLink.includes(item.link)) {
      setActiveName(item.name);
    }
    const classesActive = activeName === item.name ? "active" : "";

    return (
      <li key={index}>
        <Link
          onClick={() => {
            setActiveName(item.name);
          }}
          to={item.link}
          role="button"
          tabIndex={0}
          id={item.id}
          className={[
            "group m-0 flex cursor-pointer rounded-lg items-center justify-between h-12 py-0 pr-3 mb-1 focus:outline-none",
            recursive === 0 ? "pl-4" : recursive === 1 ? "pl-11" : "pl-16",
            activeName === item.name || activeName.split(".")[0] === item.name
              ? `text-blue-600 font-semibold ${
                  item.parent ? "bg-blue-200/20 " : "bg-transparent"
                }`
              : `text-slate-50 ${item.parent && ""}`,
            "hover:bg-slate-300/20",
            classesActive,
          ].join(" ")}
        >
          <div className="flex items-center gap-3">
            {item.icon ? (
              item.icon === "dot" ? (
                <div className="h-3 w-3 flex items-center justify-center">
                  <div
                    className={[
                      `${classesActive ? "h-2 w-2" : "h-1 w-1"}`,
                      "bg-current rounded-full duration-200",
                    ].join(" ")}
                  ></div>
                </div>
              ) : null
            ) : null}
            <div
              className={`truncate ${
                isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
              }`}
            >
              {item.title}
            </div>
          </div>
        </Link>
      </li>
    );
  };

  return (
    <nav
      role="navigation"
      className={[
        "bg-fuchsia-950 border-r border-slate-100 shadow-sm absolute inset-y-0 left-0",
        "duration-300 ease-in-out md:fixed md:translate-x-0",
        `${isExpand ? "w-64" : "w-20"}`,
      ].join(" ")}
    >
      <button
        className="absolute z-50 top-16 -right-3 bg-white hover:bg-slate-100 text-slate-500 p-0.5 rounded-full border border-slate-200"
        onClick={() => {
          setIsExpand(!isExpand);
          setExpand(!isExpand);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            isExpand ? "rotate-0" : "rotate-180"
          } transform duration-500 h-4 w-4`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className={`relative h-screen overflow-hidden`}>
        <SimpleBar style={{ height: "100%" }} autoHide>
          <div className="text-slate-500">
            <div className="my-8 flex flex-col items-center h-44 overflow-x-hidden">
              <a
                href={link}
                className={`text-center flex flex-col items-center justify-center`}
              >
                <div
                  className={`rounded-full border-4 border-white overflow-hidden duration-300 ${
                    isExpand
                      ? "h-28 w-28"
                      : isExpandOnHover
                      ? "h-28 w-28"
                      : "h-12 w-12"
                  }`}
                >
                  <img src={profilePic} className="block" alt="" />
                </div>
                <div
                  className={`text-base font-semibold text-slate-700 mt-3 truncate duration-300 ${
                    isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                  }`}
                >
                  {username}
                </div>
                <div
                  className={`duration-300 text-sm text-slate-500 truncate ${
                    isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                  }`}
                >
                  {company}
                </div>
              </a>
            </div>

            <div className="mt-3 mb-10 p-0">
              <nav>
                <ul className="list-none text-sm font-normal px-3">
                  {sidebarStructure.map((item, index) =>
                    generateMenu(item, index)
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </SimpleBar>
      </div>
    </nav>
  );
};
