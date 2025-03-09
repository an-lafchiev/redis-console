# redis-console

# RUN REDIS SERVER

docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest

# REDIS-CLI

docker exec -it redis-stack redis-cli

# Python version 3.13.2

### 2️⃣ Set Up Python Environment

cd src/publisher
py -m venv venv
. ./venv/bin/activate
pip install -r requirements.txt

# Install dependancies

pip install -r requirements.txt
