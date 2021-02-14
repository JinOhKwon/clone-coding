"use strict";

const datas = [
    {
        name: "Product",
        properties: {
            id: {
                type: "number",
                description: "Product identifier",
                required: true,
            },
            name: {
                description: "Name of the product",
                type: "string",
                required: true,
            },
            price: { type: "number", minimum: 0, required: true },
            tags: { type: "array", items: { type: "string" } },
        },
    },
    {
        name: "sample",
        properties: {
            id: {
                type: "number",
                description: "sample identifier",
                required: true,
            },
            name: {
                description: "Name of the sample",
                type: "string",
                required: true,
            },
            price: { type: "number", minimum: 0, required: true },
            tags: { type: "array", items: { type: "string" } },
        },
    },
    {
        name: "test",
        properties: {
            id: {
                type: "number",
                description: "test identifier",
                required: true,
            },
            name: {
                description: "Name of the test",
                type: "string",
                required: true,
            },
            price: { type: "number", minimum: 0, required: true },
            tags: { type: "array", items: { type: "string" } },
        },
    },
];

function dataLoad() {
    datas.forEach(data => {
        
    })
}
