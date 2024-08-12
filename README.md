<h1 align='center'>AI Programmer for Rocket.Chat</h1>


https://github.com/user-attachments/assets/eb169616-63c1-40c0-96e0-dadc4bc05e92


The AI Programmer Rocket.Chat App enables users to generate a short piece of code in C/C++, Java, Javascript, Typescript or Python based on their specification. They can switch between different LLMs (Mistral, CodeLlama, etc.) and ask for a new refinement on the code generation result to make augment or fine-tune. A well-designed interactive UX aiming to simplify user's interactions is also implemented. Finally, the app bridges the generated codes with sharing APIs, allowing users to share the code pieces in RC channel and their Github repositories.
<h2 align='center'>🚀 Features 🚀</h2>
<ul>
  <li>Quick and Easy Setup</li> 
  <li>Automatic Code Generation</li> 
  <li>Ask for Code Refinement</li> 
  <li>Personalized User Configuration with Different Programming Language and LLM Options</li> 
  <li>Login to GitHub with one click using built-in App Engine's OAth2 mechanism</li>
  <li>Seamlessly Share the generated code content to GitHub Repository</li>
  <li>Share generated code content to Rocket.Chat Channels</li>
</ul>

<h2 align="center">💡 Usage 💡</h2>

<p style="font-size: 1em;"><em>Open Main Modal for Quick Access to Different Features</em></p>

<p>To open the main modal and access various features, use the command: <code>/ai-programmer</code>.</p>


### Main Modal Features:

- Set up user configuration options for the different Programming Languages and LLMs.
- Generate code pieces by typing in the requirements and expected features of code.
- Ask for code refinement if not satified with the current code result by typing in refinement requirements.
- Share generated code content into RC channel.
- Share generated code content to GitHub repository by setting up correct OAuth2 token, repository name, file path, branch, etc.
- Edit content before sharing to any external resources to verify the correctness.


### Command List

<ul>
    <li><strong>Generate code pieces with specific description (please set language and llm correctly first!) →</strong> <code>/ai-programmer gen</code></li>
    <li><strong>Set the language you want to use to generate code →</strong> <code>/ai-programmer set</code></li>
    <li><strong>Switch to the LLM you want to use to generate code (please view the viable LLM options first!) →</strong> <code>/ai-programmer llm</code></li>
    <li><strong>List the available LLM options →</strong> <code>/ai-programmer list</code></li>
    <li><strong>Use the interactive user interface to handle your operations →</strong> <code>/ai-programmer ui</code></li>
    <li><strong>Login to Github (You should set OAuth2 settings first!) →</strong> <code>/ai-programmer login</code></li>
    <li><strong>Logout to Github →</strong> <code>/ai-programmer logout</code></li>
</ul>


<h2 align='center'>🚀 Contribution 🚀</h2>

<ul>
  <li>Set up the Application on your server using the following setup guide.</li>
 <li>Explore the app and look for existing issues to solve. We look forward to new PRs :100:.</li>
 <li>If you find a bug or a missing feature, feel free to open a new Issue.</li>
 <li>If you are new to Rocket.Chat App Development, follow the <a href="https://developer.rocket.chat/apps-engine/rocket.chat-apps-engine">developement documentation</a> and <a href="https://rocketchat.github.io/Rocket.Chat.Apps-engine/">RocketChat Apps Engine TypeScript Defenitions</a></li>
  <li>You can also follow other Rocket.Chat Apps for inspiration : <a href="https://github.com/Poll-Plus/rocket.chat.app-poll">Polls Plus App</a>, <a href="https://github.com/RocketChat/Apps.ClickUp">ClickUp Rocket.Chat App</a> , <a href="https://github.com/RocketChat/Apps.Figma">Figma Rocket.Chat App</a>
</ul>




<h2 align='center'> Manual Setup 🐳 </h2>

<ol>
  <li>Rocket.Chat Apps Run on a Rocket.Chat server. If you dont have a server setup, please go through this <a href="https://developer.rocket.chat/rocket.chat/rocket-chat-environment-setup">setup</a> and setup a development environment and setup you server</li> 
  <li>To start with development on Rocket.Chat Apps, you need to install the Rocket.Chat Apps Engline CLI. Enter the following commands : </li>
  
  ``` 
    npm install -g @rocket.chat/apps-cli
  ```
  
  Check if the CLI has been installed 
  
  ```
  rc-apps -v
# @rocket.chat/apps-cli/1.4.0 darwin-x64 node-v10.15.3
  ```
  
  <li>Clone the GitHub Repository</li>
    
 ```
    git clone https://github.com/RocketChat/Apps.RC.AI.Programmer
 ```
  
  <li>Enter the AI.Programmer directory and install dependecies</li>
  
  ```
    cd Apps.RC.AI.Programmer
    npm install
  ```
  
  <li>In order to install Rocket.Chat Apps on your development server, the server must be in development mode. Enable Apps development mode by navigating to <i>Administration > General > Apps</i> and click on the True radio button over the Enable development mode..</li>
  
  <li>Build and Upload your application by running the following inside the apps directory (/App.Github22/github) </li>
  
  ```
  rc-apps deploy --url http://localhost:3000 --username <username> --password <password>
  ```
  
  Where:
  http://localhost:3000 is your local server URL (if you are running in another port, change the 3000 to the appropriate port).
  `username` is the username of your admin user.
  `password` is the password of your admin user.
  If you want to update the app deployed in your Rocket.Chat instance after making changes to it, you can run:
  
  ```
  rc-apps deploy --url http://localhost:3000 --username user_username --password user_password --update
  ```
</ol>

The Application is now installed on the server. You can verify this by checking the installed applications from the administration panel.
Enter `/ai-programmer` or  `/ai-programmer help` in the message input box of any channel on the server to know about different features and how to trigger them using different slash commands.

<h2 align='center'>:desktop_computer: Application Setup :desktop_computer:</h2>

<p>The GitHub App uses the GitHub OAth2 and you must setup a GitHub OAuth App to unlock the full potential of the GitHub App.</p>

<ol>
<li>The First Step is to setup a GitHub Oauth2 App. To setup the GitHub Oauth App Follow <a href="https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app">These Steps</a>
</li> 
<li>
The callback URL must be set to the url of your server as shown below. (Note : There is an issue of trailing slashes with RocketChat OathClient, so incase the authentication does not work, go to Administration Panel and try removing the trailing '/' at the end of the hosted url. This issue might not occur as it will be fixed in the future.)
<div align="center">
 <img src="https://user-images.githubusercontent.com/70485812/180335941-f77ff2f9-272c-4716-a0fd-b50a2648e2de.png" alt="OAuth Example" width="50%"/>
 </div>
</li>


<li>
Once the GitHub OAuth app is setup, open the GitHub Application Settings and enter the GitHub App OAuth Client Id and Client Secret over here.

<div align="center">
<img src="https://github.com/user-attachments/assets/7609f317-025c-4760-8685-9b590192bfbc" alt="OAuth Setting Example" width="70%"/>
<div>
</li>
</ol>

The users can login to GitHub by entering the slash command `/github login` and then clicking on the `Login` button.

Users are logged out after a week but the users can also logout at any time by entering `/github logout`.
