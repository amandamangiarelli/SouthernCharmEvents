#!/bin/bash
rm -Rf backups
touch data.db #in case it doesn't exist
rm data.db
sqlite3 data.db << 'finish'
.read createDataDB.sql
finish