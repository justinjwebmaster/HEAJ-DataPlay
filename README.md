# Dataplay - HEAJ 202223 

> Travailler sur sa *branch* dasn un pemier temps
>
> Ne pas modifier une autre *branch*

> La branch MAIN sera la version finale de notre site, seulement y ajouter nos bouts de code quand on est 100 % certains que ceux-ci sont correct.


## Utilisation de git
### Initialisation 
    git init

### Pour créer sa branch
    git branch mon_prenom

### Pour aller sur sa branch
    git checkout ma_branch

> Florence = git checkout florence
>
> Jessy = git checkout florence
>
> Joachim = git checkout joachim
>
> Xavier = git checkout xavier
>
> Justin = git checkout justin


### Pour créer une nouvelle branch
    git branch nom_de_la_branch

pour aller sur cette nouvelle branch

    git checkout nom_de_la_branch


### Pour ajouter des nouveaux fichiers à git 
    git add -A

ou 

    git add nom_du_fichier.ext


### Voir si des fichiers ont été modifiés
    git status

et pour voir les modifications dans les fichiers

    git diff


### Pour créer un commit
    git commit -m "Description des modifications pour ce commit"


### Pour push sur github
premier push pour une nouvelle branch

    git push -u origin nom_de_ma_branch

les "push" suivants
  git push


### Pour cloner un repo sur mon ordi
    git clone url_github monDossier



<!-- # Simple Workflow with Laravel Mix.

## Install

- `npm i`

## Features

- Copy `src/*.html` to `dist` folder.
- Copy `src/assets/*/` to `dist/assets/*/` folder.
- Compile SASS `src/styles/app.scss` to `dist/styles` folder.
- Bundle and transpile JS `src/scripts/app.js` to `dist/scripts` folder.
- Create sources maps.
- Run a dev web server with browsersync.

## Commands

- `npx mix watch` : build on files changes, launch a dev server with browsersync.
- `npm run build` : clean, lint and build the project.
- `npm run clean` : clean the `dist` folder.

## Warning

Not intended to be used in production since minification as been disabled.  
For school project purpose only. -->
