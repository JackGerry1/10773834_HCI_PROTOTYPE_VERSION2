# EARTH QUAKE WARNING SYSTEM VERSION 2 PROTOTYPE

## What Is The Purpose Of The Prototype?
This prototype is meant to be used on laptops and desktops. It allows users to gather information about earthquakes happening around the globe, even the ones near their current location. It will also allows users to see a demonstration warning if an earthquake occurs too close to their current location. It has added inforation about how close earthquakes are to the current users location, audio warning alarms and multiple popup windows. 

## Installation And Locally Hosting Instructions

### Prerequisites  
- Any Modern Web Browser
- Any Text Editor/IDE
- Node And NPM Installed: https://nodejs.org/en/download

### How To Install And Run Locally

2. Download ZIP File
2. Extract ZIP File To Folder Of Your Choice
3. Go Inside Extracted Folder
4. Open 10773834_HCI_PROTOTYPE_VERSION2-master In Your Favourite Code Editor (Visual Studio Code, Notepad++, etc)
5. Now Open Your Terminal In The Same Directory As The 10773834_HCI_PROTOTYPE_VERSION2-master folder, eg C:\Users\Downloads\10773834_HCI_PROTOTYPE_VERSION2\10773834_HCI_PROTOTYPE_VERSION2-master
6. In The Terminal, Now Run The Command "npm install", This Will Install All The NPM Packages Needed To Locallyh Run The Prototype
7. Then Run "npm run start", Which Will Locally Host The Prototype And Run It In Your Chosen Web Browser
8. Congratulations, You Have Now Locally Hosted The Prototype And Have The Code For It On Your System

### How To View The Code
1. Complete Upto Step 4 Of The How To Install And Run Locally
2. Now In Your Chosen Editor, You Should See a Folder called "src", Click On It To View Subdirectories
3. Inside This Folder There Will Be The "index.html" file, Styles Folder And Scripts Folder
4. Inside The Styles Folder, You will find the "styles.css" file, Inside The Scripts Folder there "mapStyles.js, overlay.js, script.js", There Is Also An Additonal File Called "assets" Containing Images Used In The Prototype
5. Congratulations, You Can Now View The Code For Every File In The Prototype.

## Files And Their Purpose

### Index.html
 
- Renders All Of Content For The Page, Including Maps, Navbar And Popup Windows.

### styles.css
 
- Styles All Of The Elements In The index.html, Including Information, Map, Navbar And Popup Window

### script.js
 
- Set Bounds For Google Map
- Asks For Users Current Location
- Renders Circles Reperesenting Earthquakes From USGS API
- Styles Circles Based On Depth And Magnitude
- Handles Onclick Events For The Rendered Circles To Show More Information About Each Earthquake

### warningOverlay.js

- Handles The Event Of When A Users Want To Show Or Hide The Earthquake Demonstration Warning

### earthquakeInfoOverlay.js

- Handles The Event Of When A Users Want To Show Or Hide The Earthquake information with external links

### earthquakeChangeDataPopup.js

- Popup to allow users to change the data that they display.

### mapStyles.js
 
- Applys A Custom Dark Theme To The Google Maps
- Removes Extra Markers From Cities, To Unclutter The UI
