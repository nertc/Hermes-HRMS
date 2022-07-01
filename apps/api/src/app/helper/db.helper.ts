import * as mongoose from 'mongoose';

export class DBHelper {
  static init(): void {
    mongoose
      .connect(
        'mongodb+srv://uDev:T8mVsAmdkfLgb40Z@hermes.lmwj7in.mongodb.net/dev?retryWrites=true&w=majority'
      )
      .then(() => console.log('Connection to mongoDB successful'))
      .catch((e: Error) => console.log(`Could not connect to mongo.\n\n${e}`));
  }
}
