# App Asset Studio
A comprehensive tool to create, manipulate, and deploy mobile applications. 
This is an automation tool which I have developed as a proof of concept for 
my thesis research and in order to demonstrate the idea of automating monotonous workflow. 

## TOC
- [Background](#background)<br>
- [Features](#this-tool-has-3-main-features)<br>
- [Installation](#installation)<br>
- [Docker - Run the containerized server (Optional)](#docker---run-the-containerized-server-optional)<br>
- [How does it work? (Tutorial)](#how-does-it-work-tutorial)<br>
-- [Create a new mobile app repo & its directory structure](#create-a-new-mobile-app-repo--its-directory-structure)<br>
-- [Define your desired directory structure or new category (Optional)](#define-your-desired-directory-structure-or-new-category-optional)<br>
-- [Edit mobile applications configuration files](#edit-mobile-applications-configuration-files)<br>
-- [Create & edit launcher icons](#create--edit-launcher-icons)<br>
-- [Create graphical contents](#create-graphical-contents)<br>
- [Todo](#todo)<br>
- [License](#license)<br>

## Background
To deploy a mobile application numerous manual tasks has to be done. 
Assume that you want to reskin your mobile application, hence you have to apply your changes manually. 
These changes that I have mentioned can be changing the launcher icon, graphical buttons that you used in your app. 
Using my tool you can create graphical contents for your mobile application and simplify this process. 

Furthermore, it is also time-consuming if you want to find and edit a configuration file in your mobile application repository. 
Assume that you don't know where your configuration file is located inside the mobile application repository. 
Using this tool, the system will find and provide you all the available configuration files in a nice looking graphical user interface. 
You can easily open, edit, and save your configuration files very quick and easy.

Finally, you can use this tool to create directory structure for your mobile application and at the same time 
the system will create a remote Git repository for you. 
The system will also listen to your repositories, push your changes, and deploy your mobile application automatically. 

<img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/home.png">

## This tool has 3 main features
Using this tool you can perform three main features.

### 1- Create directory structure and remote Git repository programmatically
<ul>
    <li>Create directory structure with remote Git repository for your mobile applications.</li>
    <li>Perform all Git commands and push changes using just a GUI button.</li>
</ul>

### 2- Manipulate the directory structure and update remote Git repository
<ul>
    <li>Find and provide all configuration files to the user.</li>
    <li>User can edit any provided configuration file and save them back using GUI.</li>
    <li>Create launcher icons.</li>
    <li>Edit launcher icons.</li>
    <li>Create buttons, notification icons, generic icons, and action bar/tab icons</li>
</ul>

### 3- Deploy the mobile application automatically after each push to the store
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
`npm install` wait for the npm to be installed.<br>
`node src/server/js/server.js` wait for the server to run.<br>
`npm start` start the web server on your local host.<br>
Browse to: [http://localhost:4000](http://localhost:4000)<br>

### Docker - Run the containerized server (Optional)
Server listens to port `5001` so to containerize and publish the port of the server use the following commands.
```
$ docker build -t server .
$ docker run --publish 5001:5001 server
```
Once you run the server you can use `npm start` and browse to [http://localhost:4000](http://localhost:4000)

## How does it work? (Tutorial)

This software system simply search for any mobile application repositories in an already defined path and will provide them all to the end-user for manipulation. Even if you create a mobile application repository using this system, it will be created in that already defined path as well. This path is defined in a configuration file that is used by the server `src\server\configs\server-config.json` in the pair value of the key `resourcesPath`.

So, if you have a mobile application repository that you want to manipulate using this tool, you should have it cloned into the mentioned path.

I strongly suggest running this prototype on Linux environment because some integrated features are implemented using Unix-like commands. However, the configuration file of the server also has other values which you have to change depending on your operating system. If you are using Windows make sure to set some values to false, such as `linuxOS`, `initialGitRepo`, and `pushToGitRepo` but it is your challenge to get everything works if you prefer to use Windows.

### Authorize the system to create remote Git repository automatically

If you want the system to create remote Git repository automatically then you have to 
update the system with your token. You can get your token from your Github account in 
`Settings → Developer Settings → Generate new token`. Then you can use your token in the Shell script called `autoGitMakeRepo.sh` located in the `server` directory.

<hr>

## Create a new mobile app repo & its directory structure

<p> 
    Now let's assume we want to create a new mobile application. 
    The first thing we need is a directory structure for the mobile application that should be 
    located in the mobile application repository and also a new remote Git repository for our mobile 
    application. 
</p>

Once you started the server and client-side application of this prototype, 
click on the button 
<img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/create-repo-and-resources-button.png" height="27"> 
on the home page.

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/home-1.png" width="600"><br>
</p>

<p>
    On the next page, choose a category of the mobile application. You will see the following list which represents the available directory structures that you can choose from.
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/directory-structure-drop-down-menu.png" width="600"><br>
</p>

### Define your desired directory structure or new category (Optional)

These directory structures are template directory structures that are saved as JSON files 
and the system will use them to create an actual directory structure. I used this trick to 
define the directory structure of mobile applications using a JSON hierarchy. 
So, the JSON hierarchy will be actually our directory structure. 
If you want to have your own customized directory structure, just take one of the JSON 
files that I have already included in the `src/server/storage/directoryStructures/` 
and create your desired sample as you want in the respective category. 
To create a new category you just need to create a new folder in the mentioned path, 
then the system will show that folder as a category in the drop-down list to the end-user.

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
    Once you click 
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/create-button.png" height="27">
    , the system will ask you to verify the name of the mobile application 
    and after you pass the name verification the directory structure will be created with its remote Git repository. 
    What we have done until now was to creating a completely new mobile application directory structure that can contains 
    numerous files and directories. See the following figure to understand how does it works. We have the JSON hierarchy on 
    the left and we get the directory structure on the right.
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/directory-structure-explained.png" width="600"><br>
    <br>That's it! If you prefer to manually create these files and folders then it will be tedious!
</p>

The JSON file you used to create the directory structure has some keys and pair values as I describe them briefly here:<br>
- `-path` The name of the mobile application root directory<br>
- `-type` Define the type. For example, `"bin": { "-type": "d"}` will give you an empty directory called `bin` and `d` stands for directory. You can have more hierarchy under the `bin` which is totally up to you how you would like to have your structure.<br>
- `-content` The content of the file. Can be anything you would like to store in the file, maybe a base64 image data, a text data, or even an encrypted data, etc.

<hr>

## Edit mobile applications configuration files
The other magical feature of this prototype is that it can find all configuration files in your mobile application 
repository and provide them to the end-user. In this case, you can easily click on your configuration file, edit it, 
and save it. 

On the home screen click on 
<img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/edit-configs-button.png" height="27">
to navigate to the related page.

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/home-2.png" width="600">
</p>

In the next page you can see your cloned or already created mobile application repositories as a drop-down list.

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/drop-down-menu-of-repositories.png" width="600">
</p>

Now let's assume you have chosen the Todo app from the available repositories, 
then the system will provide you all the available configuration files in that repository. 
No matter where the config file is located, the system will recursively fetch and provide them 
to the end-user. Following image represents the configuration files of Todo App which are 
`project_config.json`, `config.json`, and `configuration.json`.

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/edit-config-data.png" width="600">
</p>

Each of these configuration files are located in different paths, thus after choosing a configuration file
we can see its actual path.

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/config-path.png" width="600">
</p>

Next the configuration file will be provided, so the user can touch it.

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/config-file.png" width="600">
</p>

This is actually a JSON configuration file that is collapsible. 
We can easily manipulate, delete keys or values, add new keys or values, and overwrite them back directly. 
This solution makes the JSON file easy to read and to understand, 
we can even visualize it and convert our JSON file into a nice looking diagram. 

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/config-diagram.png" width="600">
</p>

The text format of the JSON file will be also provided in case if the user prefer to use or edit it as text.

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/config-as-string.png" width="600">
</p>

Finally, the diagram that I have mentioned recently can be also converted into SVG image.

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/config-as-svg-image.png" width="600">
</p>

Note that, when you run the prototype, you will have all the functionalities in one web page. 
Figures are screenshots from each scope separately.

<hr>

## Create & edit launcher icons

Using this prototype you can edit or change launcher icons of a mobile application or a mobile game.
The system will create all launcher icons for you in different mipmap sizes ver quick.<br>
From the home page click on the button
<img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/resicons-button.png" height="28"> 
<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/home-3.png" width="600">
</p>

Then you will be redirected to a page where you can create launcher icons.
<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/icon-creator.png" width="600">
</p>

Here you can choose a background and foreground layer as a first step to create a launcher icon. 
There are also some properties that you can modify such as scale and transparent background.<br>
Once you are done click on 
<img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/send-to-icon-cropper-button.png" height="28"> 
to got to next step and round the icon corners.<br>
In the next page you can apply radius amount to the corners of you launcher icon and save it directly into your
mobile applications repository.

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/icon-cropper.png" width="600"><br>
</p>

Once done, click on
<img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/save-to-app-resource.png" height="28"> 
and your launcher icons will be saved into your chosen mobile application repository.<br>

This part of the prototype also has an integrated image editor which you can use to create or edit a launcher icon.
It can be helpful for quick edit and save.

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/image-editor.png" width="600"><br>
</p>

Once done editing, click the link `SEND TO ICON CROPPER` in the up right corner to round corners and save into different sizes.
<hr>

## Create graphical contents
Using this tool you can easily create buttons, notification icon, etc. and save them into your mobile application 
repository.

<p align="center">
    <img src="https://raw.githubusercontent.com/AhmadVakil/AppAssetStudio/master/tutorial/create-buttons.png" width="600"><br>
</p>

## Todo
<ul>
    <li>iOS deployment</li>
    <li>Trigger autoGitPush.py to first pop up as modal if there is something new Git status.</li>
    <li>A fix merge conflicts.</li>
    <li>Support for other type of configuration files rather than JSON, such as XML, etc. </li>
    <li>Improve README.md</li>
</ul>

## License
NOTE THAT YOU ARE NOT ALLOWED TO USE THIS PROTOTYPE FOR COMMERCIAL PURPOSE AND IS ONLY FOR EDUCATIONAL PURPOSES. THERE IS NO GUARANTY, AND THE SOFTWARE IS AS IT IS. 
