set -eux

DOCKER_NAME="code-snippet-bin"

DOCKER_TAG=$(date +%Y%m%d.%H%M)

mvn clean package -Dmaven.test.skip=true

echo "Finish packaging"

cd docker
cp ../target/code-snippet-bin.jar .

docker build -t ${DOCKER_NAME}:${DOCKER_TAG} .
cd ..

echo "Finish building docker image"
local_IP=$(ip route get 8.8.8.8 | head -1 | cut -d' ' -f8)

echo "docker run -it -p 5000:5000 -e server.port=5000 --privileged -e spring.datasource.url=jdbc:postgresql://${local_IP}:5432/code -e spring.datasource.username=code -e spring.datasource.password=code ${DOCKER_NAME}:${DOCKER_TAG}"
