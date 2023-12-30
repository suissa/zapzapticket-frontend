// import React from 'react';
// import Link from "next/link";

// const Menu: React.FC = () => {
//   return (
//     <nav className="bg-gradient-to-r from-purple-500 to-purple-800 p-4">
//       <ul className="flex space-x-4 text-white">
//         <li>
//           <Link href="/">Dashboard</Link>
//         </li>
//         <li>
//           <Link href="/users">Usuários</Link>
//         </li>
//         <li>
//           <Link href="/connections">Conexões</Link>
//         </li>
//         <li>
//           <Link href="/contacts">Contatos</Link>
//         </li>
//         <li>
//           <Link href="/groups">Grupos</Link>
//         </li>
//         <li>
//           <Link href="/messages">Mensagens</Link>
//         </li>
//         <li>
//           <Link href="/schedulemessages">Campanhas</Link>
//         </li>
//         <li>
//           <Link href="/kanban">Kanban</Link>
//         </li>
//         <li>
//           <Link href="/send">Enviar</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Menu;

// import React, { useState } from 'react';
// import Link from "next/link";
// import { IconDashboardMenu, IconUsersMenu } from './Icons';

// const Menu = ({ onToggle }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const handleMouseEnter = () => {
//     setIsExpanded(true);
//     if (onToggle) onToggle(true);
//   };

//   const handleMouseLeave = () => {
//     setIsExpanded(false);
//     if (onToggle) onToggle(false);
//   };

//   const renderIcon = (iconName) => {
//     switch (iconName) {
//       case "dashboard":
//         return <IconDashboardMenu className="text-white" />;
//       case "users":
//         return <IconUsersMenu className="text-white" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="fixed inset-y-0 left-0 z-20 flex">
//       {/* Barra lateral mínima (sempre visível) */}
//       <div className="w-10 bg-gradient-to-r from-purple-500 to-purple-800 h-full flex flex-col items-center justify-start">
//         <div className="py-3">{renderIcon("dashboard")}</div>
//         <div className="py-2">{renderIcon("users")}</div>
//         {/* ... outros ícones ... */}
//       </div>

//       {/* Barra lateral expandida */}
//       <nav className={`w-64 bg-gradient-to-r from-purple-500 to-purple-800 p-4 absolute inset-y-0 left-0 transform ${isExpanded ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
//         <ul className="flex flex-col space-y-4 text-white">
//           <li>
//             <Link href="/">
//               <span className="flex items-center">
//                 {isExpanded && <>
//                   {renderIcon("dashboard")}
//                   <span className="ml-2">Dashboard</span>
//                 </>}
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link href="/users">
//               <span className="flex items-center">
//                 {isExpanded && <>
//                   {renderIcon("users")}
//                   <span className="ml-2">Usuários</span>
//                 </>}
//               </span>
//             </Link>
//           </li>
//           {/* ... outros itens do menu ... */}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Menu;

// import React, { useState } from 'react';
// import Link from "next/link";
// import { IconDashboardMenu, IconUsersMenu } from './Icons';

// const Menu = ({ onToggle }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const handleMouseEnter = () => {
//     setIsExpanded(true);
//     if (onToggle) onToggle(true);
//   };

//   const handleMouseLeave = () => {
//     setIsExpanded(false);
//     if (onToggle) onToggle(false);
//   };

//   const renderIcon = (iconName) => {
//     switch (iconName) {
//       case "dashboard":
//         return <IconDashboardMenu className="text-white" />;
//       case "users":
//         return <IconUsersMenu className="text-white" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="fixed inset-y-0 left-0 z-20 flex">
//       {/* Barra lateral combinada */}
//       <nav className={`bg-gradient-to-r from-purple-500 to-purple-800 p-4 absolute inset-y-0 left-0 transform transition-transform duration-600 ease-in-out ${isExpanded ? "w-64" : "w-15"}`}>
//         <ul className="flex flex-col space-y-4 text-white">
//           <li>
//             <Link href="/">
//               <span className="flex items-center">
//                 {renderIcon("dashboard")}
//                 {isExpanded && <span className="ml-2">Dashboard</span>}
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link href="/users">
//               <span className="flex items-center">
//                 {renderIcon("users")}
//                 {isExpanded && <span className="ml-2">Usuários</span>}
//               </span>
//             </Link>
//           </li>
//           {/* ... outros itens do menu ... */}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Menu;

// import React, { useState } from 'react';
// import Link from "next/link";
// import { IconDashboardMenu, IconUsersMenu } from './Icons';

// const Menu = ({ onToggle }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [menuWidth, setMenuWidth] = useState('60px'); // Largura fechada

//   const handleMouseEnter = () => {
//     setIsExpanded(true);
//     setMenuWidth('200px'); // Largura expandida

//     if (onToggle) onToggle(true);
//   };

//   const handleMouseLeave = () => {
//     setIsExpanded(false);
//     setMenuWidth('60px'); // Largura fechada

//     if (onToggle) onToggle(false);
//   };

  // const renderIcon = (iconName) => {
  //   switch (iconName) {
  //     case "dashboard":
  //       return <IconDashboardMenu className="text-white" />;
  //     case "users":
  //       return <IconUsersMenu className="text-white" />;
  //     default:
  //       return null;
  //   }
  // };

//   return (
//     <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="fixed inset-y-0 left-0 z-20 flex">
//       {/* Barra lateral combinada com transição */}
//       <nav className={`menu-nav bg-gradient-to-r from-purple-500 to-purple-800 p-4 absolute inset-y-0 left-0 ${isExpanded ? "w-64" : "w-16"}`}>
//         <ul className="flex flex-col space-y-4 text-white">
//           <li>
//             <Link href="/">
//               <span className="flex items-center">
//                 {renderIcon("dashboard")}
//                 {isExpanded && <span className="ml-2">Dashboard</span>}
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link href="/users">
//               <span className="flex items-center">
//                 {renderIcon("users")}
//                 {isExpanded && <span className="ml-2">Usuários</span>}
//               </span>
//             </Link>
//           </li>
//           {/* ... outros itens do menu ... */}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Menu;

// components/Menu.js
// import React, { useState, memo } from 'react';
// import Link from 'next/link';
// import { IconDashboardMenu, IconUsersMenu } from './Icons';

// const DashboardIcon = memo(() => <IconDashboardMenu className="text-white" />);
// const UsersIcon = memo(() => <IconUsersMenu className="text-white" />);

// const Menu = memo(({ onToggle }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleExpansion = () => {
//     setIsExpanded(!isExpanded);
//     onToggle(!isExpanded); // Chama a função onToggle passada via props
//   };

//   const renderIcon = (iconName) => {
//     switch (iconName) {
//       case "dashboard":
//         return <DashboardIcon />;
//       case "users":
//         return <UsersIcon />;
//       default:
//         return null;
//     }
//   };
//   return (
//     <div className={`menu ${isExpanded ? 'expanded' : ''}`} onMouseEnter={toggleExpansion} onMouseLeave={toggleExpansion}>
//       <div className="menu-content">
//         <ul className="flex flex-col space-y-4 text-white">
//             <li>
//               <Link href="/">
//                 <span className="flex items-center" key="dashboard">
//                   {renderIcon("dashboard")}
//                   {isExpanded && <span className="ml-2">Dashboard</span>}
//                 </span>
//               </Link>
//             </li>
//             <li>
//               <Link href="/users">
//                 <span className="flex items-center" key="users">
//                   {renderIcon("users")}
//                   {isExpanded && <span className="ml-2">Usuários</span>}
//                 </span>
//               </Link>
//             </li>
//             {/* ... outros itens do menu ... */}
//           </ul>
//       </div>
//     </div>
//   );
// });

// export default Menu;


import React, { useState, memo } from 'react';
import Link from 'next/link';
import { IconDashboardMenu, IconUsersMenu } from './Icons';

const Menu = memo(({ onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
    if (onToggle) {
      onToggle(!isExpanded);
    }
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "dashboard":
        return <IconDashboardMenu className="text-white" />;
      case "users":
        return <IconUsersMenu className="text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className={`menu ${isExpanded ? 'expanded' : ''}`} onMouseEnter={toggleExpansion} onMouseLeave={toggleExpansion}>
      <div className="menu-content">
        <ul className="flex flex-col space-y-4 text-white">
          <li>
            <Link href="/">
              <span className="flex items-center">
                {renderIcon("dashboard")}
                {isExpanded && <span className="ml-2">Dashboard</span>}
              </span>
            </Link>
          </li>
          <li>
            <Link href="/users">
              <span className="flex items-center">
                {renderIcon("users")}
                {isExpanded && <span className="ml-2">Usuários</span>}
              </span>
            </Link>
          </li>
          {/* ... outros itens do menu ... */}
        </ul>
      </div>
    </div>
  );
});

export default Menu;
