# KillTeam
Squad building app for the tabletop game Kill Team. React based app using Node and an mLab Mongo database to store entries. 

Deployed at http://kill-team.herokuapp.com

![Main Screen](./client/public/killteam1.png)
![Detail View](./client/public/killteam2.png)

## Change Log:
1/24/19
Release 0.2.2
* Fixed Firebase user login
* Persistant squads can be submitted to the database. Does not submit unless logged in: working as intended.
* Added ability to name squads.
* Squad page currently displays the current squad as well as squads in the database. Work in progress.

1/17/19
Release 0.2.1
* Added Squad page to display the entire squad in detail view. Added a navbar button to access it.
* Added a usable Wargear Options selector which is dependent on unit type.
* Added Autofill stats for 4 more races.

1/9/19
Release 0.1.4
* Added Firebase user login: currently bugged.
* Added custom favicon.

1/7/19
Release 0.1.3
* Race selection displays in jumbotron.
* Model Types are now dependent on Race selection.
* Added all model types for each Race.
* Fixed npm package vulnerabilities.

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
* <s>Login currently bugged.</s> ✔️

## Updates Planned:

* Automatic squad totalling (no button).
* UI graphics.
* <s>Model Type selector based on army choice.</s> ✔️
* <s>Autofill stats based on Model Type selected.</s> ✔️
* <s>Equipment selector.</s> ✔️
* <s>User login to save individual squads.</s> ✔️
* <s>Squad Name.</s> ✔️
