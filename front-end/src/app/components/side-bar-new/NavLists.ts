import { SideBar } from "src/app/types/common.type";

export const dashboardElement: SideBar = 
    {
        id: "home", // To be filled in when generating the dashboard component
        pageTitle: "Dashboard",
        icon: "	fa fa-cubes",
        category: "dashboard",
    };

// export const aboutElement: SideBar = {
//     id: "about-app", // To be filled in when generating the dashboard component
//     pageTitle: "About",
//     icon: "fas fa-columns",
//     category: "about",
// };

export const payNavList: SideBar[] = [
    {
        id: "personal_expenses", // To be filled in when generating the dashboard component
        pageTitle: "Personal Expenses",
        icon: "fa fa-money",
        category: "dashboard",
    },
    {
        id: "shared_expenses", // To be filled in when generating the dashboard component
        pageTitle: "Shared Expenses",
        icon: "	fa fa-share-alt",
        category: "dashboard",
    },
    {
        id: "your_friends", // To be filled in when generating the dashboard component
        pageTitle: "Your Friends",
        icon: "	fa fa-handshake-o",
        category: "dashboard",
    },
    {
        id: "your_groups", // To be filled in when generating the dashboard component
        pageTitle: "Your Groups",
        icon: "fa fa-group",
        category: "dashboard",
    },
    {
        id: "chat", // To be filled in when generating the dashboard component
        pageTitle: "Chat",
        icon: "fa fa-comments",
        category: "dashboard",
    },
    {
        id: "account", // To be filled in when generating the dashboard component
        pageTitle: "Account",
        icon: "	fa fa-user-circle",
        category: "dashboard",
    }
];

export const supportNavList: SideBar[] = [
    {
        id: "about",
        pageTitle: "About CashTrack",
        icon: "fas fa-columns",
        category: "support",
    },
    {
        id: "faqs",
        pageTitle: "FAQs",
        icon: "	fa fa-info-circle",
        category: "support",
    },
];

export const bottomNavList: SideBar[] = [
    {
        id: "notifications",
        pageTitle: "Notifications",
        icon: "fas fa-bell color-white",
        category: "logout",
    },
    {
        id: "logout",
        pageTitle: "Logout",
        icon: "fas fa-sign-out-alt color-white",
        category: "logout",
    },
];
