import { SideBar } from "src/app/types/common.type";

export const dashboardElement: SideBar = 
    {
        id: "user_dashboard", // To be filled in when generating the dashboard component
        pageTitle: "Home",
        icon: "fas fa-columns",
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
        icon: "fas fa-columns",
        category: "dashboard",
    },
    {
        id: "shared_expenses", // To be filled in when generating the dashboard component
        pageTitle: "Shared Expenses",
        icon: "fas fa-columns",
        category: "dashboard",
    },
    {
        id: "your_friends", // To be filled in when generating the dashboard component
        pageTitle: "Your Friends",
        icon: "fas fa-columns",
        category: "dashboard",
    },
    {
        id: "your_groups", // To be filled in when generating the dashboard component
        pageTitle: "Your Groups",
        icon: "fas fa-columns",
        category: "dashboard",
    },
    {
        id: "chat", // To be filled in when generating the dashboard component
        pageTitle: "Chat",
        icon: "fas fa-columns",
        category: "dashboard",
    },
    {
        id: "account", // To be filled in when generating the dashboard component
        pageTitle: "Account",
        icon: "fas fa-columns",
        category: "dashboard",
    }
];

export const supportNavList: SideBar[] = [
    {
        id: "about",
        pageTitle: "About CashTrack",
        icon: "fas fa-bell",
        category: "support",
    },
    {
        id: "faqs",
        pageTitle: "FAQs",
        icon: "fas fa-sign-out-alt",
        category: "support",
    },
];

export const bottomNavList: SideBar[] = [
    {
        id: "notifications",
        pageTitle: "Notifications",
        icon: "fas fa-bell",
        category: "logout",
    },
    {
        id: "logout",
        pageTitle: "Logout",
        icon: "fas fa-sign-out-alt",
        category: "logout",
    },
];
