# Installation

Follow the next steps, im asuming you have node and docker installed

1. Run `npm i` to install dependencies
2. Start the db depending of the OS you are

- Ubuntu: `sh start.sh`
- Windows: `docker compose up -d`

_You can manage the db from [Mongo Express](http://localhost:8081)_

3. Duplicate the **.env.example** and rename it **.env**

_You can change the env variables, the default its for local_

### [Ethereal Email](https://ethereal.email/messages) _Here you can see the emails_

> Username: `bailee.jast79@ethereal.email`

> Password: `EJHT4GrTNnngSJY5VU`

4. Finally start the app running `npm run start:dev`
