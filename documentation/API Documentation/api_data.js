define({ "api": [
  {
    "type": "post",
    "url": "/bills/createPersonalExp",
    "title": "Create New personal expense",
    "name": "Create_Personal_Expense",
    "group": "Bills",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>Users unique EmailID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bill_id",
            "description": "<p>Unique Bill ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "created_at",
            "description": "<p>Bill Creation Time</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Bill Last Updated At</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>Bill Label</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tag",
            "description": "<p>Bill Tag</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "expense_amount",
            "description": "<p>Expense Amount</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"success\": true,\n    \"message\": \"Expense created\",\n    \"data\": [\n        {\n            \"user_id\": \"anushadatta@gmail.com\",\n            \"bill_id\": 5,\n            \"created_at\": \"1609590600000\",\n            \"updated_at\": \"1609603200000\",\n            \"label\": \"Soup Spoon Lunch\",\n            \"tag\": \"Food\",\n            \"expense_amount\": 48,\n            \"_id\": \"60571678b9fbd2c458409d42\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/Bills.js",
    "groupTitle": "Bills"
  },
  {
    "type": "get",
    "url": "/bills/getPersonalExp/:email",
    "title": "Get Personal Expenses of User",
    "name": "GetPersonalExpenses",
    "group": "Bills",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users unique EmailID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"success\": true,\n   \"message\": \"User expenses found\",\n   \"data\": [\n       {\n         \"_id\": \"601a66ffeb1a2406fc726606\",\n         \"user_id\": \"anushadatta@gmail.com\",\n         \"bill_id\": 4,\n         \"created_at\": \"3272831296\",\n         \"updated_at\": \"3285431296\",\n         \"label\": \"Cab to MBS\",\n         \"tag\": \"Travel\",\n         \"expense_amount\": \"25\"\n     }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/Bills.js",
    "groupTitle": "Bills"
  },
  {
    "type": "get",
    "url": "/bills/getSharedExp/author/:email",
    "title": "Get Shared Expenses of User as Author",
    "name": "GetSharedExpensesAuthor",
    "group": "Bills",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users unique EmailID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"success\": true,\n    \"message\": \"Shared author exp found\",\n    \"data\": [\n        {\n            \"_id\": \"601a6cb4eb1a2406fc740abc\",\n            \"bill_id\": 101,\n            \"created_at\": \"3380202368\",\n            \"updated_at\": \"3380202368\",\n            \"author\": \"anushadatta@gmail.com\",\n            \"label\": \"H&M Shopping\",\n            \"tag\": \"Shopping\",\n            \"total_amount\": 50,\n            \"split_by_method\": \"amount\",\n            \"group_id\": \"null\",\n            \"payer\": [\n                {\n                    \"user_id\": \"mehul.kumar171@gmail.com\",\n                    \"amount\": \"45\",\n                    \"paid\": false\n                },\n                {\n                    \"user_id\": \"amritaravishankar00@gmail.com\",\n                    \"amount\": \"5\",\n                    \"paid\": false\n                }\n            ],\n            \"comments\": [\n                [\n                    \"amritaravishankar00@gmail.com\",\n                    \"Just waiting on my salary amount to pay you!\"\n                ]\n            ]\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/Bills.js",
    "groupTitle": "Bills"
  },
  {
    "type": "get",
    "url": "/bills/getSharedExp/payer/:email",
    "title": "Get Shared Expenses of User as Payer",
    "name": "GetSharedExpensesPayer",
    "group": "Bills",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users unique EmailID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"success\": true,\n    \"message\": \"Shared payer expenses found\",\n    \"data\": [\n        {\n            \"_id\": \"601a6906dd3d6befc9b87fd1\",\n            \"bill_id\": 100,\n            \"created_at\": \"4255002368\",\n            \"updated_at\": \"4255002368\",\n            \"author\": \"amritaravishankar00@gmail.com\",\n            \"label\": \"Cha Cha Cha Dinner\",\n            \"tag\": \"Food\",\n            \"total_amount\": 45,\n            \"split_by_method\": \"equal\",\n            \"group_id\": \"null\",\n            \"payer\": [\n                {\n                    \"user_id\": \"mehul.kumar171@gmail.com\",\n                    \"amount\": \"20\",\n                    \"paid\": false\n                },\n                {\n                    \"user_id\": \"anushadatta@gmail.com\",\n                    \"amount\": \"25\",\n                    \"paid\": false\n                }\n            ],\n            \"comments\": [\n                [\n                    \"anushadatta@gmail.com\",\n                    \"Are you sure I owe you 15$?\"\n                ]\n            ]\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/Bills.js",
    "groupTitle": "Bills"
  },
  {
    "type": "put",
    "url": "/bills/updatePersonalExp",
    "title": "Update personal expense",
    "name": "Update_Personal_Expense",
    "group": "Bills",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>Users unique EmailID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bill_id",
            "description": "<p>Unique Bill ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "created_at",
            "description": "<p>[OPTIONAL] Bill Creation Time</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "updated_at",
            "description": "<p>[OPTIONAL] Bill Last Updated At</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>[OPTIONAL] Label</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tag",
            "description": "<p>[OPTIONAL] Bill Tag</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "expense_amount",
            "description": "<p>[OPTIONAL] Expense Amount</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Bills.js",
    "groupTitle": "Bills"
  },
  {
    "type": "get",
    "url": "/notifications/getNotifications/:email",
    "title": "Get User Notifications",
    "name": "GetNotifications",
    "group": "Notifications",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users unique EmailID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"success\": true,\n    \"message\": \"User notifications found\",\n    \"data\": [\n        {\n            \"_id\": \"601a6d89dd3d6befc9b87fd4\",\n            \"user_id\": \"mehul.kumar171@gmail.com\",\n            \"type\": \"Reminder\",\n            \"message\": \"Reminder: Pay Anusha Datta 20$ before 5th February\",\n            \"bill_id\": 101\n        },\n        {\n            \"_id\": \"601a6e77eb1a2406fc748c94\",\n            \"user_id\": \"mehul.kumar171@gmail.com\",\n            \"type\": \"Proof Available\",\n            \"message\": \"Proof Available: Amrita has uploaded payment proof\",\n            \"bill_id\": 100\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/Notifications.js",
    "groupTitle": "Notifications"
  },
  {
    "type": "get",
    "url": "/users/getInfo/:email",
    "title": "Get User Info",
    "name": "GetUserInfo",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users unique EmailID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"success\": true,\n    \"message\": \"User info found\",\n    \"data\": {\n        \"_id\": \"601a6435eb1a2406fc7197dc\",\n        \"user_id\": \"mehul.kumar171@gmail.com\",\n        \"first_name\": \"Mehul\",\n        \"last_name\": \"Kumar\",\n        \"personal_limit\": \"100\",\n        \"personal_limit_reminder\": 95,\n        \"profile_image\": \"test.jpg\",\n        \"personal_limit_duration\": \"Weekly\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/Users.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/users/updateInfo/:user_id",
    "title": "Update User Info",
    "name": "Update_User_Info",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>Users unique EmailID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "personal_limit",
            "description": "<p>Personal Spending Limit</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "personal_limit_reminder",
            "description": "<p>Personal Limit Reminder Thresh</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>User Profile Image URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "personal_limit_duration",
            "description": "<p>Personal Limit Duration</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Users.js",
    "groupTitle": "Users"
  }
] });
