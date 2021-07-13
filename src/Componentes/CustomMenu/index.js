/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import { Navigation } from "react-minimal-side-navigation";
import { useHistory, useLocation } from "react-router-dom";
import Icon from "awesome-react-icons";
import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai"
import { IoBusinessOutline, IoBookmarkOutline, IoAlbumsOutline } from "react-icons/io5"
import { RiTeamLine, RiMedalLine } from "react-icons/ri";
import { FaUserGraduate, FaTasks } from "react-icons/fa"
import { BsGraphUp } from "react-icons/bs";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import "./styles.css";

export const CustomMenu = () => {
   const history = useHistory();
   const location = useLocation();
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   return (
      <React.Fragment>
         {/* Sidebar Overlay */}
         <div
            onClick={() => setIsSidebarOpen(false)}
            className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${isSidebarOpen ? "block" : "hidden"
               }`}
         />
         <div className="btn-position">
            <button
               className="btn-menu"
               onClick={() => setIsSidebarOpen(true)}
               type="button"
            >
               <Icon name="burger" className="w-8 h-8" />
            </button>
         </div>

         {/* Sidebar */}
         <div
            className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-black border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
               }`}
         >
            {/* https://github.com/abhijithvijayan/react-minimal-side-navigation */}
            <Navigation
               activeItemId={location.pathname}
               onSelect={({ itemId }) => {
                  history.push(itemId)
               }}
               items={[
                  {
                     title: "Empresas",
                     itemId: "/companhia",
                     elemBefore: () => <IoBusinessOutline size={23} color="#ffb509" />,
                  },
                  {
                     title: "Jornadas",
                     itemId: "/jornadas",
                     elemBefore: () => <BsGraphUp size={23} color="#ffb509" />,
                  },
                  {
                     title: "Tipo de Demanda",
                     itemId: "/tipodemanda",
                     elemBefore: () => <IoAlbumsOutline size={23} color="#ffb509" />
                  },
                  {
                     title: "Usuarios",
                     itemId: "/usuarios",
                     elemBefore: () => <AiOutlineUser size={23} color="#ffb509" />,
                  },
                  {
                     title: "Badges",
                     itemId: "/badges",
                     elemBefore: () => <RiMedalLine size={23} color="#ffb509" />
                  },
                  {
                     title: "Time",
                     itemId: "#4",
                     elemBefore: () => <RiTeamLine size={23} color="#ffb509" />
                  },
                  {
                     title: "Demandas",
                     itemId: "#6",
                     elemBefore: () => <FaTasks size={23} color="#ffb509" />
                  },
                  {
                     title: "Conquistas",
                     itemId: "#2",
                     elemBefore: () => <IoBookmarkOutline size={23} color="#ffb509" />
                  },
                  {
                     title: "Mentores",
                     itemId: "#3",
                     elemBefore: () => <FaUserGraduate size={23} color="#ffb509" />
                  },
               ]}
            />

            {/* <div className="absolute bottom-0 w-full my-8">
               <Navigation
                  activeItemId={location.pathname}
                  items={[
                     {
                        title: "Settings",
                        itemId: "/settings",
                        elemBefore: () => <Icon name="activity" />
                     }
                  ]}
                  onSelect={({ itemId }) => {
                     history.push(itemId);
                  }}
               />
            </div> */}
         </div>
      </React.Fragment>
   );
};
