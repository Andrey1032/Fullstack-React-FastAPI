import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CurrencyContext } from "@/context";
import { useContext } from "react";

export function NavMain({
    items,
}: {
    items: {
        id: number;
        title: string;
        url: string;
        imageUrl?: string;
    }[];
}) {
    const { setCurrentCurrencyId } = useContext(CurrencyContext);

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2"></SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu className="gap-0">
                    {items.map((item) => (
                        <SidebarMenuItem
                            key={item.title}
                            className="snap-start"
                        >
                            <SidebarMenuButton
                                tooltip={item.title}
                                size={"lg"}
                                className=" cursor-pointer hover:bg-amber-700 transition-all duration-300"
                                onClick={() => setCurrentCurrencyId(item.id)}
                            >
                                {item.imageUrl && (
                                    <img
                                        src={item.imageUrl}
                                        alt="icon"
                                        width={40}
                                        height={40}
                                    />
                                )}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
