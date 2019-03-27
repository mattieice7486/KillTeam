# KillTeam
Squad building app for the tabletop game Kill Team. React based app using Node and an mLab Mongo database to store entries. 

Deployed at http://kill-team.herokuapp.com

![Main Screen](./client/public/killteam1.png)
![Detail View](./client/public/killteam2.png)
![Squad View](./client/public/killteam3.png)

## Change Log:
3/26/2019
Release 0.3.5
* Fixed various incorrect stats.
* Squad total now correctly updates.
* Unit list clears once submitted to the database.
* Added a Delete All button.

3/25/2019
Release 0.3.4
* Fixed various incorrect stats.
* Updated Detail View to match the new interface.
* Tweaked the interface.

3/25/2019
Release 0.3.3
* Added random names for all races.
* Updated some UI elements.
* Added Abilities to each Unit Type.

3/21/2019
Release 0.3.2
* Added a random name generator (Ultramarines only currently).
* Added an "Other Options" category for additional wargear.
* Fixed the autofill bug where user had to click twice.
* Selectors correctly clear when a new selection is picked.
* Wargear Options now update equipment list.

3/11/2019
Release 0.3.1
* Finished adding entries to guns.json.

3/7/2019
Release 0.2.9
* Squad page now correctly shows all equipment.
* Current page updated to also show equipment stats.
* Detail page bugged, does not show equipment stats correctly.
* Equipment added to guns.json.

3/5/2019
Release 0.2.8
* Squad page now shows equipment stats (bugged: only displays first item of equipment).
* Added equipment list JSON (only Astartes equipment so far).

2/28/2019
Release 0.2.7
* Squad page now correctly shows all squad members in a saved squad.
* Squad page now only shows squads based on user who is logged in.
* Equipment list now populates correctly in the table.

2/25/2019
Release 0.2.6
* Fixed navbar collapse button for small screens.
* Unit attribute numbers are read only inputs now.
* Autofill works on selection of unit type (bugged: must click twice to take effect).

2/11/2019
Release 0.2.5
* Login button moved to navbar.
* User must be logged in to see saved squads (bugged: currently all users' squads can be viewed by anyone).
* Fixed confirm prompt to allow unit delete cancel (bugged: prompt appears at the bottom of div).
* User can now delete squads from database.

1/30/2019
Release 0.2.4
* Finished Autofill stats for all races.

1/29/2019
Release 0.2.3
* Added a Current page to show a detail summary of the current squad.
* Fixed the Select inputs to correctly display selected item.

1/24/2019
Release 0.2.2
* Fixed Firebase user login.
* Persistant squads can be submitted to the database. Does not submit unless logged in: working as intended.
* Added ability to name squads.
* Squad page currently displays the current squad as well as squads in the database. Work in progress.

1/17/2019
Release 0.2.1
* Added Squad page to display the entire squad in detail view. Added a navbar button to access it.
* Added a usable Wargear Options selector which is dependent on unit type.
* Added Autofill stats for 4 more races.

1/9/2019
Release 0.1.4
* Added Firebase user login: currently bugged.
* Added custom favicon.

1/7/2019
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

* Unit list does not correctly update when a squad of one is submitted or deleted using delete squad.
* Detail page does not display equipment correctly.
* User can create mixed-race squads.
* Tyranid Warrior options do not correctly update flesh hooks into Equipment.
* Other Options dropdown does not display selection.
* <s>Squad total does not update correctly.</s> ✔️
* <s>Confirm prompt does not render in the correct location.</s> ✔️
* <s>Selectors don't register default state; you must select a new option then select the default for it to register.</s> ✔️
* <s>Squad page only displays first squad member for each squad.</s> ✔️
* <s>Navbar collapse bugged for small screens.</s> ✔️
* <s>Delete button alert does not have a cancel option.</s> ✔️
* <s>Poor text contrast on the detail screen.</s> ✔️
* <s>Equipment selector does not display correctly.</s> ✔️
* <s>Army selector does nothing currently.</s> ✔️
* <s>Login currently bugged.</s> ✔️

## Updates Planned:

* Limits for specific unit types.
* Random name generator allows Space Marine Chapter select.
* More squad options (specialists, flesh wounds, experience, demeanour).
* UI graphics.
* <s>Delete the current squad when the submit squad button is clicked.</s> ✔️
* <s>Random name generator.</s> ✔️
* <s>Automatic squad totalling/Autofill stats.</s> ✔️
* <s>Correct Equipment Stats.</s> ✔️
* <s>Squad page only displays current user's squads.</s> ✔️
* <s>Login Button in the Navbar.</s> ✔️
* <s>Fix Squad page format.</s> ✔️
* <s>Model Type selector based on army choice.</s> ✔️
* <s>Autofill stats based on Model Type selected.</s> ✔️
* <s>Equipment selector.</s> ✔️
* <s>User login to save individual squads.</s> ✔️
* <s>Squad Name.</s> ✔️
