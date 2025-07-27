import * as React from "react";

import { NavMain } from "@/components/shared/nav-main";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import axios from "axios";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [data, setData] = React.useState<
        {
            id: number;
            title: string;
            url: string;
            imageUrl?: string;
        }[]
    >([]);

    const fetchCurrencies = () => {
        axios
            .get(
                "https://backend-dtrtyixp8-andreys-projects-9f139c10.vercel.app/cryptocurrencies"
            )
            .then((data) =>
                setData(
                    data.data.map((item: { name: string; id: number }) => ({
                        id: item.id,
                        title: item.name,
                        url: `/${item.id}`,
                        imageUrl: `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`,
                    }))
                )
            );
    };

    React.useEffect(() => {
        fetchCurrencies();
    }, []);
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="/">
                                <span className="text-base font-semibold">
                                    All Crypto
                                </span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent
                className="snap-y [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:bg-blue-900
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-blue-600
   [&::-webkit-scrollbar-thumb]:rounded-full
   "
            >
                <NavMain items={data} />
            </SidebarContent>
        </Sidebar>
    );
}
