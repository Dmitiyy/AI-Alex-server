# echo "Removing old docker container..."
# (docker stop dishboard-dev-task-db && docker kill dishboard-dev-task-db || :) && (docker rm dishboard-dev-task-db || :)

# echo "Creating a new instance..."
# docker run \
#     --name dishboard-dev-task-db \
#     -e POSTGRES_PASSWORD=postgres \
#     -e PGPASSWORD=postgres \
#     -p 5430:5432 \
#     -d postgres

# echo "Waiting for the database to start..."
# sleep 3

# echo "Creating the database..."
# echo "CREATE DATABASE dev;" | docker exec -i dishboard-dev-task-db psql -U postgres
# echo "\l" | docker exec -i dishboard-dev-task-db psql -U postgres

echo "Removing old docker container..."
docker stop dishboard-dev-task-db
docker rm dishboard-dev-task-db

echo "Creating a new instance..."
docker run --name dishboard-dev-task-db `
  -e POSTGRES_PASSWORD=postgres `
  -e PGPASSWORD=postgres `
  -p 5430:5432 `
  -d postgres

echo "Waiting for the database to start..."
Start-Sleep -Seconds 3

echo "Creating the database..."
docker exec -i dishboard-dev-task-db psql -U postgres -c "CREATE DATABASE dev;"
docker exec -i dishboard-dev-task-db psql -U postgres -c "\l"
