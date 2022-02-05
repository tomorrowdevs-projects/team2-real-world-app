<h1>Docker + MySQL</h1>

<h3>Prerequisites</h3>
<ul>
    <li>Docker installed </li>
    <li>Docker compose installed </li>
    <li>Docker compose file </li>
    <li>SQL File </li>
</ul>

<b>Windows</b>

From the official page of <a href="https://hub.docker.com/editions/community/docker-ce-desktop-windows">Docker Desktop for Windows</a> 
download the .exe file by clicking on <b>"Get Docker Desktop for Windows"</b>. <br>
Docker Desktop for Windows includes <b>Docker Compose</b> and other Docker apps. <br>
<a href="https://docs.docker.com/desktop/windows/install/">Official Docs</a>

<br>

<h3>Docker</h3>
Docker is a tool that simplifies the process of <b>building, running, managing and distributing applications</b>. <br>
Group an application and its dependencies into containers ensuring that the application runs in any environment
With multiple containers each individual application runs on separate containers, each with its own separate dependencies ensuring that each is independent of the other.

… was developed using the GO

<br>

<h3>Docker Compose</h3>
Docker compose is a tool that allows you to configure one or more containers in a single file and run it with a command.
It also lets you easily share the configurations for a container.


<code>docker-compose.yml</code>

```
version: "3.1"
 
services:
  database:
    image: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: test_db
      MYSQL_USER: 'user'
      # You can use whatever password you like
      MYSQL_PASSWORD: 'password'
 
    ports:
      - "3307:3306"
    volumes:
      - sql-file:/var/lib/mysql
 ```

<ul>
<li><b>version</b>, compose file format version  <a href="https://docs.docker.com/compose/compose-file/">Official Docs</a></li>

<li><b>services</b>, define the services to be used in the application </li>
<li><b>database</b>, the service to configure </li>
<li><b>image</b>, the image to use <a href="https://hub.docker.com/_/mysql">Official MySQL</a></li>
<li><b>restart</b>, always, for the restart tag, the container always restarts</li>
<li><b>environment</b>, define the environment variables</li>
<li><b>ports</b>, the ports to use:
  <ul>
  <li>3307 host</li>
  <li>3306 container</li>
  </ul></li>

<li><b>volumes</b>, to define the folder to be mounted from the local machine to the container 
  <ul>
  <li>
  Example: <br>
  With a structure like this we will map the contents of the sql-file folder to mount it inside the container, 
  the two fields are separated by <code>:</code> <br>
  So, given the command <code>sql-file:/var/lib/mysql</code> <br>
  The first part is the location of the folder in the local machine <code>sql-file</code> <br>
  The second part is the location on which we will place it in the container <code>/var/lib/mysql</code>
  
  </li></ul></li></ul>

<br>

<b>Example of local folder position</b>

    `home
    │ docker-compose.yml
    │ 
    └─── sql-file 
    │ 	│ real_world_app.sql`



<h3>Run Docker Compose</h3>
Go to the folder where the <code>docker-compose.yml<code> file resides
and use the command <code>docker compose up</code>


