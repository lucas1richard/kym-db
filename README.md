<h1 align="center">@kym/db</h1>

An extraction to handle the database connection and management of database modules.

## Exports

```ts
import Sequelize from 'sequelize';

{
  forceSync: () => Promise<void>;
  sync: () => Bluebird<void>;
  destroyAll: () => Promise<void>;
  closeConnection: () => Bluebird<void>;
  sequelize: Sequelize.Sequelize;
  Abbrev: Sequelize.Model;
}
```