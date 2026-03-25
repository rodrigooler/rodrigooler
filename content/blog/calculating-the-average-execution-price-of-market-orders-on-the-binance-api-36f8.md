---
title: "Calculating the Average Execution Price of MARKET Orders on the Binance API"
description: "Learn how to calculate the average execution price for market orders using the Binance API"
date: "2023-07-12"
tags: ["binance","api","crypto","trading"]
canonical: "https://dev.to/oler/calculating-the-average-execution-price-of-market-orders-on-the-binance-api-36f8"
devto: "https://dev.to/oler/calculating-the-average-execution-price-of-market-orders-on-the-binance-api-36f8"
readingTime: "2 min read"
coverImage: "https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F2nkdaa6ila9dcee9iure.png"
featured: false
---

![binance](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vafkezfj7n56rl6kd8s2.jpg)

**Table of Contents**

- [Introduction](#introduction)
- [What is a Market Order?](#what-is-a-market-order)
- [Example of Binance API Response](#example-of-binance-api-response)
- [How to Calculate the Average Execution Price](#how-to-calculate-the-average-execution-price)
- [Practical Example](#practical-example)
- [Conclusion](#conclusion)

---

## Introduction

In this tutorial, we will understand how to calculate the average execution price for market orders in the Binance API.

## What is a Market Order?

A market order is a request to buy or sell an asset (in this case, a cryptocurrency) at the best available market price.

## Example of Binance API Response

Here is an example of a response from the Binance API after executing a market order:

```json
{
    "symbol": "BNBUSDT",
    "orderId": 4741809903,
    "orderListId": -1,
    "clientOrderId": "Pk4WeE2X5OduzaabLI7vTn",
    "price": "0.00000000",
    "origQty": "0.05400000",
    "executedQty": "0.05400000",
    "cummulativeQuoteQty": "12.97620000",
    "status": "FILLED",
    "timeInForce": "GTC",
    "type": "MARKET",
    "side": "BUY",
    "stopPrice": "0.00000000",
    "icebergQty": "0.00000000",
    "time": 1688580085707,
    "updateTime": 1688580085707,
    "isWorking": true,
    "workingTime": 1688580085707,
    "origQuoteOrderQty": "13.15000000",
    "selfTradePreventionMode": "NONE"
}
```

## How to Calculate the Average Execution Price

To calculate the average execution price, you can use the data provided in the API response after executing a market order.

Note the following fields in the response:

1. `cummulativeQuoteQty`: The total amount of the quote currency (in this case, USDT) used to execute the order.
2. `executedQty`: The amount of assets (in this case, BNB) actually bought/sold.

The average execution price can be calculated by dividing `cummulativeQuoteQty` by `executedQty`.

## Practical Example

Consider the following values in an API response:

```
"executedQty": "0.05400000"
"cummulativeQuoteQty": "12.97620000"
```

To calculate the average execution price, do the following:

```
Average Price = cummulativeQuoteQty / executedQty
Average Price = 12.97620000 / 0.05400000
Average Price ≈ 240.302 USD
```

Therefore, the average execution price of the buy order was approximately 240.302 USDT per BNB.

## Conclusion

Remember that this calculation is valid only for market orders (MARKET) on Binance and depends on the values provided by the API. In other types of order or different situations, additional calculations or approaches may be required.
