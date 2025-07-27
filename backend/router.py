from fastapi import APIRouter
from init import cmc_client

router = APIRouter(prefix="/cryptocurrencies")


@router.get("")
async def get_cryptocurrencies():
    return await cmc_client.get_listening()


@router.get("/{currency_id}")
async def get_cryptocurrency(currency_id):
    return await cmc_client.get_currency(currency_id=currency_id)
