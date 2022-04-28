rem Delete backups folder and its contents
rmdir /Q /s backups
rem Create data.db in case it doesn't exist
type nul >> data.db
rem Delete data.db
del data.db
rem Launch sqlite3 to initialize tables in data.db, then quit sqlite3
echo .quit | sqlite3 -init createDataDB.sql data.db