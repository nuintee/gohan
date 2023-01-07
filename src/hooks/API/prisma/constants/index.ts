export const _primsa_errors = [
  {
    code: 'P1000',
    message:
      'Authentication failed against database server at {database_host}, the provided database credentials for {database_user} are not valid. Please make sure to provide valid database credentials for the database server at {database_host}."',
  },
  {
    code: 'P1001',
    message:
      'Can\'t reach database server at {database_host}:{database_port} Please make sure your database server is running at {database_host}:{database_port}."',
  },
  {
    code: 'P1002',
    message:
      'The database server at {database_host}:{database_port} was reached but timed out. Please try again. Please make sure your database server is running at {database_host}:{database_port}. "',
  },
  {
    code: 'P1003',
    message: 'Database {database_file_name} does not exist at {database_file_path}"',
  },
  {
    code: 'P1008',
    message: 'Operations timed out after {time}"',
  },
  {
    code: 'P1009',
    message:
      'Database {database_name} already exists on the database server at {database_host}:{database_port}"',
  },
  {
    code: 'P1010',
    message: 'User {database_user} was denied access on the database {database_name}"',
  },
  {
    code: 'P1011',
    message: 'Error opening a TLS connection: {message}"',
  },
  {
    code: 'P1012',
    message:
      'Note: If you get error code P1012 after you upgrade Prisma to version 4.0.0 or later, see the version 4.0.0 upgrade guide. A schema that was valid before version 4.0.0 might be invalid in version 4.0.0 and later. The upgrade guide explains how to update your schema to make it valid.',
  },
  {
    code: 'P1013',
    message: 'The provided database string is invalid. {details}"',
  },
  {
    code: 'P1014',
    message: 'The underlying {kind} for model {model} does not exist."',
  },
  {
    code: 'P1015',
    message:
      'Your Prisma schema is using features that are not supported for the version of the database.Database version: {database_version}Errors:{errors}"',
  },
  {
    code: 'P1016',
    message:
      'Your raw query had an incorrect number of parameters. Expected: {expected}, actual: {actual}."',
  },
  {
    code: 'P1017',
    message: 'Server has closed the connection."',
  },
  {
    code: 'P2000',
    message:
      'The provided value for the column is too long for the column\'s type. Column: {column_name}"',
  },
  {
    code: 'P2001',
    message:
      'The record searched for in the where condition ({model_name}.{argument_name} = {argument_value}) does not exist"',
  },
  {
    code: 'P2002',
    message: 'Unique constraint failed on the {constraint}"',
  },
  {
    code: 'P2003',
    message: 'Foreign key constraint failed on the field: {field_name}"',
  },
  {
    code: 'P2004',
    message: 'A constraint failed on the database: {database_error}"',
  },
  {
    code: 'P2005',
    message:
      'The value {field_value} stored in the database for the field {field_name} is invalid for the field\'s type"',
  },
  {
    code: 'P2006',
    message: 'The provided value {field_value} for {model_name} field {field_name} is not valid"',
  },
  {
    code: 'P2007',
    message: 'Data validation error {database_error}"',
  },
  {
    code: 'P2008',
    message: 'Failed to parse the query {query_parsing_error} at {query_position}"',
  },
  {
    code: 'P2009',
    message: 'Failed to validate the query: {query_validation_error} at {query_position}"',
  },
  {
    code: 'P2010',
    message: 'Raw query failed. Code: {code}. Message: {message}"',
  },
  {
    code: 'P2011',
    message: 'Null constraint violation on the {constraint}"',
  },
  {
    code: 'P2012',
    message: 'Missing a required value at {path}"',
  },
  {
    code: 'P2013',
    message:
      'Missing the required argument {argument_name} for field {field_name} on {object_name}."',
  },
  {
    code: 'P2014',
    message:
      "The change you are trying to make would violate the required relation '{relation_name}' between the {model_a_name} and {model_b_name} models.\"",
  },
  {
    code: 'P2015',
    message: 'A related record could not be found. {details}"',
  },
  {
    code: 'P2016',
    message: 'Query interpretation error. {details}"',
  },
  {
    code: 'P2017',
    message:
      'The records for relation {relation_name} between the {parent_name} and {child_name} models are not connected."',
  },
  {
    code: 'P2018',
    message: 'The required connected records were not found. {details}"',
  },
  {
    code: 'P2019',
    message: 'Input error. {details}"',
  },
  {
    code: 'P2020',
    message: 'Value out of range for the type. {details}"',
  },
  {
    code: 'P2021',
    message: 'The table {table} does not exist in the current database."',
  },
  {
    code: 'P2022',
    message: 'The column {column} does not exist in the current database."',
  },
  {
    code: 'P2023',
    message: 'Inconsistent column data: {message}"',
  },
  {
    code: 'P2024',
    message:
      'Timed out fetching a new connection from the connection pool. (More info: http://pris.ly/d/connection-pool (Current connection pool timeout: {timeout}, connection limit: {connection_limit})"',
  },
  {
    code: 'P2025',
    message:
      'An operation failed because it depends on one or more records that were required but not found. {cause}"',
  },
  {
    code: 'P2026',
    message:
      'The current database provider doesn\'t support a feature that the query used: {feature}"',
  },
  {
    code: 'P2027',
    message: 'Multiple errors occurred on the database during query execution: {errors}"',
  },
  {
    code: 'P2028',
    message: 'Transaction API error: {error}"',
  },
  {
    code: 'P2030',
    message:
      'Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema"',
  },
  {
    code: 'P2031',
    message:
      'Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. See details: https://pris.ly/d/mongodb-replica-set"',
  },
  {
    code: 'P2033',
    message:
      'A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you\'re trying to store large integers"',
  },
  {
    code: 'P2034',
    message:
      'Transaction failed due to a write conflict or a deadlock. Please retry your transaction"',
  },
  {
    code: 'P3000',
    message: 'Failed to create database: {database_error}"',
  },
  {
    code: 'P3001',
    message:
      'Migration possible with destructive changes and possible data loss: {migration_engine_destructive_details}"',
  },
  {
    code: 'P3002',
    message: 'The attempted migration was rolled back: {database_error}"',
  },
  {
    code: 'P3003',
    message:
      'The format of migrations changed, the saved migrations are no longer valid. To solve this problem, please follow the steps at: https://pris.ly/d/migrate"',
  },
  {
    code: 'P3004',
    message:
      'The {database_name} database is a system database, it should not be altered with prisma migrate. Please connect to another database."',
  },
  {
    code: 'P3005',
    message:
      'The database schema is not empty. Read more about how to baseline an existing production database: https://pris.ly/d/migrate-baseline"',
  },
  {
    code: 'P3006',
    message:
      'Migration {migration_name} failed to apply cleanly to the shadow database. {error_code}Error:{inner_error}"',
  },
  {
    code: 'P3007',
    message:
      'Some of the requested preview features are not yet allowed in migration engine. Please remove them from your data model before using migrations. (blocked: {list_of_blocked_features})"',
  },
  {
    code: 'P3008',
    message: 'The migration {migration_name} is already recorded as applied in the database."',
  },
  {
    code: 'P3009',
    message:
      'migrate found failed migrations in the target database, new migrations will not be applied. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve{details}"',
  },
  {
    code: 'P3010',
    message:
      'The name of the migration is too long. It must not be longer than 200 characters (bytes)."',
  },
  {
    code: 'P3011',
    message:
      'Migration {migration_name} cannot be rolled back because it was never applied to the database. Hint: did you pass in the whole migration name? (example: \\"20201207184859_initial_migration\\")"',
  },
  {
    code: 'P3012',
    message:
      'Migration {migration_name} cannot be rolled back because it is not in a failed state."',
  },
  {
    code: 'P3013',
    message:
      'Datasource provider arrays are no longer supported in migrate. Please change your datasource to use a single provider. Read more at https://pris.ly/multi-provider-deprecation"',
  },
  {
    code: 'P3014',
    message:
      'Prisma Migrate could not create the shadow database. Please make sure the database user has permission to create databases. Read more about the shadow database (and workarounds) at https://pris.ly/d/migrate-shadow.',
  },
  {
    code: 'P3015',
    message:
      'Could not find the migration file at {migration_file_path}. Please delete the directory or restore the migration file."',
  },
  {
    code: 'P3016',
    message:
      'The fallback method for database resets failed, meaning Migrate could not clean up the database entirely. Original error: {error_code}{inner_error}"',
  },
  {
    code: 'P3017',
    message:
      'The migration {migration_name} could not be found. Please make sure that the migration exists, and that you included the whole name of the directory. (example: \\"20201207184859_initial_migration\\")"',
  },
  {
    code: 'P3018',
    message:
      'A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolveMigration name: {migration_name}Database error code: {database_error_code}Database error:{database_error} "',
  },
  {
    code: 'P3019',
    message:
      'The datasource provider {provider} specified in your schema does not match the one specified in the migration_lock.toml, {expected_provider}. Please remove your current migration directory and start a new migration history with prisma migrate dev. Read more: https://pris.ly/d/migrate-provider-switch"',
  },
  {
    code: 'P3020',
    message:
      'The automatic creation of shadow databases is disabled on Azure SQL. Please set up a shadow database using the shadowDatabaseUrl datasource attribute.Read the docs page for more details: https://pris.ly/d/migrate-shadow"',
  },
  {
    code: 'P3021',
    message:
      'Foreign keys cannot be created on this database. Learn more how to handle this: https://pris.ly/d/migrate-no-foreign-keys"',
  },
  {
    code: 'P3022',
    message:
      'Direct execution of DDL (Data Definition Language) SQL statements is disabled on this database. Please read more here about how to handle this: https://pris.ly/d/migrate-no-direct-ddl"',
  },
  {
    code: 'P4000',
    message: 'Introspection operation failed to produce a schema file: {introspection_error}"',
  },
  {
    code: 'P4001',
    message: 'The introspected database was empty."',
  },
  {
    code: 'P4002',
    message: 'The schema of the introspected database was inconsistent: {explanation}"',
  },
  {
    code: 'P5000',
    message: 'This request could not be understood by the server',
  },
  {
    code: 'P5001',
    message: 'This request must be retried',
  },
  {
    code: 'P5002',
    message: 'The datasource provided is invalid:',
  },
  {
    code: 'P5003',
    message: 'Requested resource does not exist',
  },
  {
    code: 'P5004',
    message: 'The feature is not yet implemented:',
  },
  {
    code: 'P5005',
    message: 'Schema needs to be uploaded',
  },
  {
    code: 'P5006',
    message: 'Unknown server error',
  },
  {
    code: 'P5007',
    message: 'Unauthorized, check your connection string',
  },
  {
    code: 'P5008',
    message: 'Usage exceeded, retry again later',
  },
  {
    code: 'P5009',
    message: 'Request timed out',
  },
  {
    code: 'P5010',
    message: 'Cannot fetch data from service',
  },
  {
    code: 'P5011',
    message: 'Request parameters are invalid.',
  },
  {
    code: 'P5012',
    message: 'Engine version is not supported',
  },
  {
    code: 'P5013',
    message: 'Engine not started: healthcheck timeout',
  },
  {
    code: 'P5014',
    message: 'Unknown engine startup error (contains message and logs)',
  },
  {
    code: 'P5015',
    message: 'Interactive transaction error:',
  },
]
