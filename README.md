PI ADMIN
========

Admin panel on the web for Raspberry Pi

##Requirements##

- Having **NODE** & **NPM** installed
- Having **BOWER** installed *(You can run `sudo npm install -g bower` to install bower)*

##Installation##

- Enter the following commands when you're at the PI-Admin directory to install all the necessary tools:
 - `npm install`
 - `bower install`
- Rename the *server/config/config.example.js* to *server/config/config.js*
- You will find those lines at *config.js* file `db: 'mongodb://your-database-address'`, enter modify it to your database address
- To run PI-Admin, enter `node server.js` in the console

*Please visit <a href="http://www.tlnguyen.com/2014/03/28/raspberry-pi-admin-panel/">Project Tutorial</a> for more details*
