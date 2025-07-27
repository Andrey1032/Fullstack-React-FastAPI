import { AppSidebar } from "./components/shared/app-sidebar";
import CardCurrency from "./components/shared/card-currency";
import { SiteHeader } from "./components/shared/site-header";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import React, { useState } from "react";
import { CurrencyContext } from "./context";

function App() {
    const [currentCurrencyId, setCurrentCurrencyId] = useState<null | number>(null);

    return (
        <CurrencyContext value={{ currentCurrencyId, setCurrentCurrencyId }}>
            <main className="bg-gray-900 text-white">
                <SidebarProvider
                    style={
                        {
                            "--sidebar-width": "calc(var(--spacing) * 72)",
                            "--header-height": "calc(var(--spacing) * 12)",
                        } as React.CSSProperties
                    }
                >
                    <AppSidebar
                        variant="inset"
                        className="bg-blue-950 rounded-r-2xl"
                    />
                    <SidebarInset>
                        <SiteHeader/>
                        <div className="flex flex-1 flex-col">
                            <div className="@container/main flex flex-1 flex-col gap-2 p-6">
                                {currentCurrencyId ? (
                                    <CardCurrency />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-5xl text-gray-800">
                                        Choose a currency
                                    </div>
                                )}
                            </div>
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </main>
        </CurrencyContext>
    );
}

export default App;
