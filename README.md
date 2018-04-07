#install docker

`sudo apt-get remove docker docker-engine docker-ce docker.io`

`sudo apt-get update`

`sudo apt-get install apt-transport-https ca-certificates curl software-properties-common`

`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`

`sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`

`sudo apt-get update`

`sudo apt-get install docker-ce`

`sudo groupadd docker`

`sudo usermod -aG docker $USER`

#install docker-compose

`sudo curl -L https://github.com/docker/compose/releases/download/1.20.1/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose`

`sudo chmod +x /usr/local/bin/docker-compose`

#log out & log in!

#download the project

`git clone https://github.com/20Heroes/hackathon-budgety-app.git`

`npm install`

`npm run dev:up`

#visual studio code extension

install ESLint extension

reload
