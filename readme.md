# JKLF - Project

LOREM de description.


## INIT project

git : [https://github.com/khaled290/jklfProjet](https://github.com/khaled290/jklfProjet)


## Particularité 1

    app.use(expressJwt({ secret: secret})    
	    .unless({ path: ["/public", '/', '/movies', new  RegExp('/movies.*/', 'i'), '/movie-search', '/login', new  RegExp('/movie-details.*/', 'i')]}))

Pour qu'une page soit accessible en front il faut **Obligatoirement** quelle ce trouve dans le tableau de **unless** sinon elle ne sera jamais accessible.

## Particularité 2
    localStorage.getItem('token');

Quand on personne ce log un **localStorage** est crée avec pour nom **token** et comme valeur le **token complet** donc coté front si on a ce **token** dans le localStorage c'est que notre user et logger !
