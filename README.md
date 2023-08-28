# Gal_Maker
Django based gal maker

## Introduction
This project is a web-based GalGame maker. [GalGames](https://en.wikipedia.org/wiki/Bish%C5%8Djo_game) is a form of interactive visual novel that focuses on telling a story and allows the player to choose the course of actions at critical points of the story.

Each game is stored in a linked list fashion, where each node represents a step of the story, being either a dialogue with the character and background or a choice the player can make. 

There are different choices the player can make during their play through, the choices could affect the story's path using a state system, which is roughly a dictionary with a state name as key and state value and value. A choice can change the value of a state and could require a state to be at a certain value for itself to be available.

![alt text](https://github.com/samsara138/GalMaker/blob/main/ReadMeImgs/GalMakerGraph.png?raw=true "Data representation")

## How to run
Install requirements (just Django)
‘’’
pip3 install -r requirements.txt
‘’’

Start server
‘’’
python3 manager.py runserver
‘’’

The Admin account credentials are:
Username: Admin
Password: Admin

The website should accessible on your browser on [localhost:8000](http://localhost:8000) 

There is a included demo game for you to try out

## Playing a game

Under the 'All Games' section, you can see all the available games to play

During game play, you can click the 'Next' button to proceed to the next dialog

When a choice can be made, 2 options will show on the screen, if it's greyed out, then it's because a previous choice has prevented that choice to be chosen. 

![alt text](https://github.com/samsara138/GalMaker/blob/main/ReadMeImgs/Screenshot.jpg?raw=true "Game play screenshot")


## Making a game

After logging in as Admin, you can see the game Admin has made under the 'Create Game' page

Here's an explanation of all the fields of each node

![alt text](https://github.com/samsara138/GalMaker/blob/main/ReadMeImgs/EditorScreenShot.jpg?raw=true "Game editor screenshot")

### Dialog

Those data determine what the dialog and image will show

| Field             | Description                                                                                                                                                   |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name              | Optional, name of the node, only for creator reference                                                                                                       |
| Speaker           | The name of the speaker, this will be shown in bold in the dialog                                                                                           |
| Text              | The content of the dialog                                                                                                                                     |
| Next (Normal)     | The next nodes to go to when the 'Next' button is clicked                                                                                                   |
| Background        | The new background of the game (Set only when different than previous node)                                                                                  |
| Left Character    | The image of the character on the left; you can also set the 'Show no character' flag to true to show no left character                                     |
| Right Character   | Same rules as the left character but for the right one                                                                                                       |


### Options


To make a choice, all requirement must be fulfilled and the game state will change based on the choice.

Think the state as a dictionary, when comparing requirement, the first prompt is the key to look up, and the second is value it's comparing to. When the actual value equals the value you are checking, this requirement is considered fulfilled.

Only when all entries in the requirement are fulfilled, then is this choice available.

State change works similarly, where you can write or modify a key value pair

The Option text will show on the button, while each option will have it's own 'next' node.

Node 24, named Choice 2 is a good example of the option system. Only when the player choose to show interest in the first choice, would the pizza order choice be available. Or else, the player can only order salad.






