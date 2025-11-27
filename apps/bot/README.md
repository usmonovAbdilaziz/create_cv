<!-- Create your first migration to set up the database tables -->
<!-- Now run the following command to generate the Prisma Client: -->
npx prisma migrate dev --name init 
npx prisma migrate reset
npx prisma generate
<!-- reset name -->
<!-- new table add -->
npx prisma migrate dev --name add_new_table


