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
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The unique identifier for the user'
      },
      name: {
        type: 'string',
        description: 'The name of the user'
      },
      email: {
        type: 'string',
        description: 'The email address of the user'
      }
    }
  },
  Product: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The unike identifier for the product'
      },
      name: {
        type: 'string',
        description: 'The name of the product'
      }, 
      price: {
        type: 'number',
        format: 'float',
        description: 'The price of the product in GBP'
      }
    }
  },
  Auth: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'The email address of the user'
      },
      password: {
        type: 'string',
        description: 'The password of the user'
      }
    }
  }
};
