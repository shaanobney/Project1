                                                    Think For Me.

We live in an age of information overload. Entertainment is ruled by content, and there are more shows and films to consume now than anyone has time for. While this should be a boon for lovers of film, the size and freedom of choice can overwhelm a person, and paralyze them with the fear of missing out on a good show while they struggle to decide how to spent their leisure time. With Think For Me, those fears and anxieties are long gone. 
    
Think For Me queries multiple entertainment and food databases to select a single movie and food choice that's available to eat or watch online. That way modern anxieties about FOMO (fear of missing out) and the detriment of too many streaming choices are a thing of the past. Think For Me also includes the option of going out on the town, giving restuarant and movie choices as well as links to locations. 
        

## Technologies used

- Guidebox API
- Themoviedb API
- food2fork API
- Google Maps API
- Firebase


## Built With

    Subline Text
    Bootstrap


## Walk throughs of code

The project is split into two fully indepenedent functions, each one similiar, but different in execution. The IN side takes a movie genre response or food category and queries the appropriate API. In the case of movies, Themoviedb API is queried for a list of genres based on rating. This list is then shortened to the top 30, and randomly chosen. This selection is then sent to the Guidebox API, which searches it's database and returns streaming information as well as appropriate images and text. The food section acts in a similar manner, querying the food2fork API for the top rated recipes for the genre in question. It than randomly pulls one of the top 30 results. 

## Authors

Nathaniel Van Doren
William Chye
Shaan Obney

