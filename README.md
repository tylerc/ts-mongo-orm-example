ts-mongo-orm-example
====================

This package shows some example usage of [ts-mongo-orm](https://github.com/tylerc/ts-mongo-orm).

Exploring this example
----------------------

First, clone the repo, install the dependencies, and compile the files:

```sh
git clone https://github.com/tylerc/ts-mongo-orm-example
cd ts-mongo-orm-example
npm install
tsc
```

Then make sure you have a MongoDB server listening on localhost, and run:

```sh
node index.js
```

The expected output is something like this:
```
Saved user to the database (Someone Else 2019-06-19T23:04:21.051Z someone+1560985461051@example.com)
Found user in database:
Someone Else 2019-06-19T23:04:21.051Z someone+1560985461051@example.com
Deleting 5d0abf75eb4836e8c5869fab...
Finding all users that exist in the DB...
Found: { _id: 5d0abce3018752e7f7a7ed00,
  email: 'someone+1560984803247@example.com',
  name: 'Someone Else 2019-06-19T22:53:23.247Z',
  passwordHash: '1234567890',
  passwordSalt: '0987654321',
  createdAt: 2019-06-19T22:53:23.247Z }
Found: { _id: 5d0abd67887b90e80943f892,
  email: 'someone+1560984935793@example.com',
  name: 'Someone Else 2019-06-19T22:55:35.793Z',
  passwordHash: '1234567890',
  passwordSalt: '0987654321',
  createdAt: 2019-06-19T22:55:35.793Z }
Found: { _id: 5d0abd98fda75fe815e70d9e,
  email: 'someone+1560984984581@example.com',
  name: 'Someone Else 2019-06-19T22:56:24.581Z',
  passwordHash: '1234567890',
  passwordSalt: '0987654321',
  createdAt: 2019-06-19T22:56:24.581Z }
Program complete, cleaning up DB connections and exiting.
```

Relevant files:

- `user.ts` - Creates a class describing the user document and then a model class on top of that.
- `index.ts` - Connects to the database and does some work with the `UserActiveRecord` class.

License
-------

This repo and `ts-mongo-orm` are licensed under the `MIT` license. See the `LICENSE` file for more details.