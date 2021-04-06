# App Asset Studio
A comprehensive tool to create, manipulate, and deploy mobile applications. 
This is an automation tool which I have developed as a proof of concept for 
my thesis research and in order to demonstrate the idea of automating monotonous workflow. 

### TOC
- [Background](#background)<br>
- [Features](#this-tool-has-3-main-features)<br>
- [Installation](#installation)<br>
- [Docker - Run the containerized server (Optional)](#docker---run-the-containerized-server-optional)<br>
- [How does it work? (Tutorial)](#how-does-it-work-tutorial)<br>
- [Todo](#todo)<br>
- [License](#license)<br>

### Background
To deploy a mobile application numerous manual tasks has to be done. 
Assume that you want to reskin your mobile application, hence you have to apply your changes manually. 
These changes that I have mentioned can be changing the launcher icon, graphical buttons that you used in your app. 
Using my tool you can create graphical contents for your mobile application and simplify this process. 

Furthermore, it is also time-consuming if you want to find and edit a configuration file in your mobile application repository. 
Assume that you don't know where your configuration file is located inside the mobile application repository. 
Using this tool, the system will provide you all the available configuration files in a nice looking graphical user interface. 
You can easily open, edit, and save your configuration files very quick and easy.

Finally, you can use this tool to create directory structure for your mobile application and at the same time 
the system will create a remote Git repository for you. 
The system will also listen to your repositories, push your changes, and deploy your mobile application automatically. 

<img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/home.png">

### This tool has 3 main features
Using this tool you can perform three main features.

#### 1- Create directory structure and remote Git repository programmatically
<ul>
    <li>Create directory structure with remote Git repository for your mobile applications.</li>
    <li>Perform all Git commands and push changes using just a GUI button.</li>
</ul>

#### 2- Manipulate the directory structure and update remote Git repository
<ul>
    <li>Find and provide all configuration files to the user.</li>
    <li>User can edit any provided configuration file and save them back using GUI.</li>
    <li>Create launcher icons.</li>
    <li>Edit launcher icons.</li>
    <li>Create buttons, notification icons, generic icons, and action bar/tab icons</li>
</ul>

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

### Installation
We suggest using Linux because some integrated functionalities uses Unix-like operating system commands.

1-Download latest(Current) Node.js<br>
2-Clone the git repository in your local server.<br>
3-Navigate to the folder that you have cloned.<br>
4-Type the following commands in your command line:<br>
`npm install` wait for the npm to be installed.<br>
`node src/server/js/server.js` wait for the server to run.<br>
`npm start` start the web server on your local host.<br>
Browse to: [http://localhost:4000](http://localhost:4000)<br>

#### Docker - Run the containerized server (Optional)
Server listens to port `5001` so to containerize and publish the port of the server use the following commands.
```
$ docker build -t server .
$ docker run --publish 5001:5001 server
```
Once you run the server you can use `npm start` and browse to [http://localhost:4000](http://localhost:4000)

### How does it work? (Tutorial)
<p>This tool looks for mobile application repositories in an already defined path. Even if you create a mobile application repository using this tool, it will be created in that already defined path as well. This path is defined in a configuration file that is used by the server src\server\configs\server-config.json in the pair value of the key resourcesPath.</p>
<p>So, if you have a mobile application repository that you want to manipulate using this tool, you should have it cloned into the mentioned path.</p>
<p>I strongly suggest running this prototype on Linux environment because some integrated features are implemented using Unix-like commands. However, the configuration file of the server also has other values which you have to change depending on your operating system. If you are using Windows make sure to set some values to false, such as linuxOS, initialGitRepo, and pushToGitRepo but it is your challenge to get everything works if you prefer to use Windows.</p>

#### Create a new directory structure & its remote Git repository

<p> 
    Now let's assume we want to create a new mobile application. 
    The first thing we need is a directory structure for the mobile application that should be 
    located in the mobile application repository and also a new remote Git repository for our mobile 
    application. 
</p>

##### Prepare the system to create remote Git repository automatically
<p>
    If you want the system to create remote Git repository automatically then you have to 
    update the system with your token. You can get your token from your Github account in 
    Settings → Developer Settings → Generate new token. Then you can use it in autoGitMakeRepo.sh
</p>

##### Create your directory structure and its remote Git repository
<p> 
    Once you started the server and client-side application of this prototype, 
    click on the button "Create Repo & Resources" on the home page.
</p>
<img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/home-1.png"><br>

<p>
    On the next page, choose a category of the mobile application. You will see the following list which represents the available directory structures that you can choose from and generate.
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/directory-structure-drop-down-menu.png" width="600"><br>
</p>

##### Define your desired directory structure or category (Optional)
<p>
    These directory structures are template directory structures that are saved as JSON files and the system will use them to create an actual directory structure. I used this trick to define the directory structure of mobile applications using a JSON hierarchy. So, the JSON hierarchy will be actually our directory structure. If you want to have your own customized directory structure, just take one of the JSON files that I have already included in the src/server/storage/directoryStructures/ and create your desired sample as you want in the respective category. To create a new category you just need to create a new folder in the mentioned path, then the system will show that folder as a category in the drop-down list to the end-user.
</p>

<p>
    This figure shows how you can create and define a new category with directory structures.
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/create-directory-structure-category.png" width="600"><br>
</p>

<p>
    After choosing the directory structure category, you will see its relative directory structures shown in the following figure.
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/directory-structure-drop-down-menu-app.png" width="600"><br>
</p>

<p>
    After choosing a structure, the JSON hierarchy (Directory structure) will be shown to the end-user. Thus, it is also possible to edit this JSON hierarchy on the front-end before using it as a directory structure.
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/json-to-directory-structure.png" width="600"><br>
</p>

<p>
    Once you click create the directory structure will be created with its remote Git repository. What we have done until now was to creating a completely new mobile application directory structure that can contains numerous files and directories. See the following figure to understand how does it works. We have the JSON hierarchy on the left and we get the directory structure on the right.
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/directory-structure-explained.png" width="600"><br>
    <br>That's it! If you prefer to manually create these files and folders then it will be tedious!
</p>

## Todo
<ul>
    <li>iOS deployment</li>
    <li>Trigger autoGitPush.py to first pop up as modal if there is something new Git status.</li>
    <li>A fix merge conflicts.</li>
    <li>Support for other type of configuration files rather than JSON, such as XML, etc. </li>
    <li>Improve README.md</li>
</ul>

# License
NOTE THAT YOU ARE NOT ALLOWED TO USE THIS PROTOTYPE FOR COMMERCIAL PURPOSE AND IS ONLY FOR EDUCATIONAL PURPOSES. THERE IS NO GUARANTY, AND THE SOFTWARE IS AS IT IS. 
