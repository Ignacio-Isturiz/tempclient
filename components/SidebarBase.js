import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/app/context/AuthContext";

const SidebarContext = createContext();

export default function Sidebar({ children, isOpen }) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const { user } = useAuthUser();

  useEffect(() => {
    isOpen(expanded);
  }, [expanded]);

  return (
    <aside
      className={`fixed h-screen transition-all duration-300 ${expanded ? "w-64" : "w-16"} left-0 top-0 z-50`}
    >
      <button
        onClick={() => setExpanded((curr) => !curr)}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
      >
        {expanded ? (
          <ChevronFirst style={{ color: "black" }} />
        ) : (
          <ChevronLast style={{ color: "black" }} />
        )}
      </button>
      <nav className="h-full flex flex-col justify-between gap-5 bg-white border-r shadow-sm py-4">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/338.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.fullName}&background=0D8ABC&color=fff`}
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4" onClick={() => router.push("/profile")}>
              <h4 className="font-semibold" style={{ color: "black" }}>
                {user?.fullName}
              </h4>
              <span className="text-xs text-gray-600">{user?.email}</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
      onClick={onClick}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
