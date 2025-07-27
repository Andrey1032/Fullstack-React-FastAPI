from aiohttp import ClientSession
from async_lru import alru_cache


class HTTPClient:
    def __init__(self, base_url: str, api_key: str):
        self._session = ClientSession(
            base_url=base_url,
            headers={
                "Accepts": "application/json",
                "X-CMC_PRO_API_KEY": api_key,
            },
        )


class CMCHTTPClient(HTTPClient):
    async def get_listening(self):
        async with self._session.get("/v1/cryptocurrency/listings/latest") as res:
            result = await res.json()
            return result["data"]

    async def get_currency(self, currency_id: int):
        async with self._session.get(
            "/v2/cryptocurrency/quotes/latest", params={"id": currency_id}
        ) as res:
            result = await res.json()
            return result["data"][str(currency_id)]
