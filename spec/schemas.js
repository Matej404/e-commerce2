module.exports = {
  Item: {
    type: "object",
    properties: {
      itemId: {
        type: "string",
        description: "The unique identifier of the item",
      },
      quantity: {
        type: "integer",
        description: "The quantity of the item in the cart",
      },
    },
  },
  Cart: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The unique identifier of the cart",
      },
      items: {
        type: "array",
        description: "An array of items in the cart",
        items: {
          $ref: "#/components/schemas/Item",
        },
      },
    },
    required: ["id", "items"],
  },
  Order: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The unique identifier of the order",
      },
      items: {
        type: "array",
        description: "An array of items in the order",
        items: {
          $ref: "#/components/schemas/Item",
        },
      },
    },
    required: ["id", "items"],
  },
};
