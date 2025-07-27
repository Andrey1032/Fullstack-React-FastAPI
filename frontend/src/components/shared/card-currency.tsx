import { useContext, useEffect, useState } from "react";
import { Card } from "../ui/card";
import axios from "axios";
import { CurrencyContext } from "@/context";
import { Spinner } from "../ui/shadcn-io/spinner";

interface Crypto {
    id: number;
    name: string;
    symbol: string;
    quote: {
        USD: {
            fully_diluted_market_cap: number;
            price: number;
            percent_change_1h: number;
            percent_change_7d: number;
            percent_change_24h: number;
        };
    };
}

export default function CardCurrency() {
    const [currencyData, setCurrencyData] = useState<null | Crypto>(null);
    const { currentCurrencyId } = useContext(CurrencyContext);
    useEffect(() => {
        setCurrencyData(null);
        axios
            .get(
                `http://localhost:8000/cryptocurrencies/${currentCurrencyId}`
            )
            .then((data) => setCurrencyData(data.data));
    }, [currentCurrencyId]);
    return (
        <>
            {currencyData ? (
                <Card className="p-2">
                    <p className="flex items-center gap-5">
                        <img
                            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currencyData?.id}.png`}
                            alt="icon"
                        />
                        <div className="">
                            <p className="text-2xl">{currencyData?.name}</p>
                            <p className="text-gray-500">{currencyData?.symbol}</p>
                        </div>
                    </p>
                    <p>Текущая цена: {currencyData.quote.USD.price}$</p>
                    <p>
                        Изменение цены за 1 час:{" "}
                        <span
                            className={
                                currencyData.quote.USD.percent_change_1h < 0
                                    ? "text-red-500"
                                    : "text-green-500"
                            }
                        >
                            {Math.abs(
                                currencyData.quote.USD.percent_change_1h
                            ).toPrecision(3)}
                            %
                        </span>
                    </p>
                    <p>
                        Изменение цены за 24 часа:{" "}
                        <span
                            className={
                                currencyData.quote.USD.percent_change_24h < 0
                                    ? "text-red-500"
                                    : "text-green-500"
                            }
                        >
                            {Math.abs(
                                currencyData.quote.USD.percent_change_24h
                            ).toPrecision(3)}
                            %
                        </span>
                    </p>
                    <p>
                        Изменение цены за 7 дней:{" "}
                        <span
                            className={
                                currencyData.quote.USD.percent_change_7d < 0
                                    ? "text-red-500"
                                    : "text-green-500"
                            }
                        >
                            {Math.abs(
                                currencyData.quote.USD.percent_change_7d
                            ).toPrecision(3)}
                            %
                        </span>
                    </p>
                    <p>
                        Текующая капитализация:{" "}
                        {currencyData.quote.USD.fully_diluted_market_cap}$
                    </p>
                </Card>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <Spinner variant="pinwheel" size="100px" />
                </div>
            )}
        </>
    );
}
