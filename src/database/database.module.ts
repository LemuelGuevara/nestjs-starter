import { Module } from '@nestjs/common';
import { db } from './database-instance';
import { DATABASE_CONNECTION } from './database-connection';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useValue: db,
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
