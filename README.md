# KillTeam
Squad building app for the tabletop game Kill Team. React based app using Node and an mLab Mongo database to store entries. 

Deployed at http://kill-team.herokuapp.com

![Main Screen](./client/public/killteam1.png)
![Detail View](./client/public/killteam2.png)

## Change Log:
12/31/2018
Release 0.1.2
* Army selector updated, now correctly saves to state.
* Added dropdown for all of the Model Types (Adeptus Astartes only so far).
* Added autofill stats based on Model Type.

11/15/2018
Release 0.1.1
* Fixed the text contrast on detail screen.
* Army selector updated, still not saving to detail screen.

10/25/2018
Release 0.1.0 is here!

## Known Issues:

* <s>Poor text contrast on the detail screen.</s> ✔️
* Delete button alert does not have a cancel option.
* Squad counter does not alert > 100 pts unless you hit the "total" button twice.
* Equipment selector does not display correctly.
* <s>Army selector does nothing currently.</s> ✔️
* Selectors don't register default state; you must select a new option then select the default for it to register.
* Have to click autofill button to autofill stats.

## Updates Planned:

* Automatic squad totalling (no button).
* UI graphics.
* Model Type selector based on army choice.
* <s>Autofill stats based on Model Type selected.</s> ✔️
* Equipment selector.
* User login to save individual squads.
* Squad Name.
