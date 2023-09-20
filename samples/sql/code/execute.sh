docker run --name=mysql -e MYSQL_ROOT_PASSWORD=123456 -d -p 3306:3306 mysql/mysql-server:latest

sudo apt-get update && sudo apt-get dist-upgrade

sudo apt-get install mysql-client

docker exec -u root mysql mysql -u root -p 123456 -e "update mysql.user set host='%' where user='root' and host = 'localhost'; flush privileges;"

docker exec mysql /bin/sh -c "echo 'max_connections = 1' >> /etc/my.cnf"