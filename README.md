# App Asset Studio
A comprehensive tool to manipulate mobile application repository. This is an automation tool which I have developed as a proof of concept for my thesis research and in order to demonstrate the idea of automating and simplifying tedious tasks while we are developing a mobile application. Using this tool you can:

#### 1- Create directory structure and remote Git repository programmatically
1- Create directory structure for mobile application<br>
2- Create remote Git repository from directory structure<br>
3- Perform Git commands and push changes using just a GUI button<br>
These changes are done when you manipulate the mobile application repository.

#### 2- Manipulate the directory structure and update remote Git repository
1- Fetch all mobile application configuration files<br>
2- Edit all fetched configuration files and save them back using GUI<br>
3- Create launcher icons<br>
4- Edit launcher icons<br>
5- Create buttons, notification icons, generic icons, and action bar/tab icons<br>

#### 3- Deploy the mobile application automatically after each push to the store
This is done using a template repository which I have provided <a href="https://github.com/AhmadVakil/AppAssetAutoDeploy">here</a>, I used <a href="https://fastlane.tools/">Fastlane</a> and also <a href="https://github.com/features/actions">GitHub Actions</a>. It means if you want your mobile application to be automatically deployed to the store, you can use the template for each of your mobile applications or you can configure your app repo with your own CI/CD tool. Currently, there are numerous tools which I preferred to use <a href="https://fastlane.tools/">Fastlane</a> 
<br><br>Other Continuous integration and continuous delivery tools for mobile app developments.
<br><a href="https://www.jenkins.io/">Jenkins</a>
<br><a href="https://www.travis-ci.com/">Travis CI</a>
<br><a href="http://circleci.com/">CircleCI</a>
<br><a href="https://www.jetbrains.com/teamcity/">TeamCity</a>
<br><a href="https://about.gitlab.com/">GitLab CI</a>
<br><a href="https://www.atlassian.com/software/bamboo">Bamboo</a>
<br><a href="https://azure.microsoft.com/en-us/services/devops/pipelines/">Azure Pipelines</a>

## Installation
We suggest using Linux because some integrated functionalities uses Unix-like operating system commands.

1-Download latest(Current) Node.js<br>
2-Clone the git repository in your local server.<br>
3-Navigate to the folder that you have cloned.<br>
4-Type the following commands in your command line:<br>
5
1. `npm install` wait for the npm to be installed.
1. `node src/server/js/server.js` wait for the server to run.
2. `npm start` start the web server on your local host. 
3. Browse to [http://localhost:4000](http://localhost:4000)

### Docker - Run the containerized server
Server listens to port `5001` so to containerize and publish the port of the server use the following commands.
```
$ docker build -t server .
$ docker run --publish 5001:5001 server
```
Once you run the server you can use `npm start` and browse to [http://localhost:4000](http://localhost:4000)

## Todo
<ul>
    <li>iOS deployment</li>
    <li>Trigger autoGitPush.py to be first pop up as modal if there is something new Git status</li>
    <li>Improve README.md</li>
</ul>

# License
NOTE THAT YOU ARE NOT ALLOWED TO USE THIS PROTOTYPE FOR COMMERCIAL PURPOSE AND IS ONLY FOR EDUCATIONAL PURPOSES. THERE IS NO GUARANTY, AND THE SOFTWARE IS AS IT IS. 