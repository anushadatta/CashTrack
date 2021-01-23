import { SideBar } from "src/app/types/common.type";

export const dashboardElement: SideBar = {
    id: "user_dashboard", // To be filled in when generating the dashboard component
    pageTitle: "Home",
    icon: "fas fa-columns",
    category: "dashboard",
};

export const aboutElement: SideBar = {
    id: "about-app", // To be filled in when generating the dashboard component
    pageTitle: "About",
    icon: "fas fa-columns",
    category: "about",
};

export const payNavList: SideBar[] = [
    {
        id: "pay-friend",
        pageTitle: "Split Bill",
        icon: "fas fa-ticket-alt",
        category: "pay",
    },
    {
        id: "create-group",
        pageTitle: "Group",
        icon: "fas fa-map-marker-alt",
        category: "pay",
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
