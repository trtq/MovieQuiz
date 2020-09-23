![Movie Quiz](https://i.imgur.com/3o3V6hm.png "Movie Quiz")
# MovieQuiz
MovieQuiz is a game by Evgeny Ivanitsky (me) developed with React Native for mobile phones. During the game the player is shown a promotional photo or a still from a movie and several movie titles, one of which corresponds with the still. If the player pinpoints the correct title, the game moves on to the next still, if they don't, they lose a life, or, if the lives run out, they lose the game. The questions aren't prewritten, they are generated with the help of [The Movie Database](https://www.themoviedb.org/) And their API.

The game was developed as a showcase - i wanted to make something that would include the entire React Native development pipeline. It isn't the size of a huge commercial project, obviously, but it is still a fully featured React Native app, with such things as:
- Application state handling with [**mobx-lite**](https://github.com/mobxjs/mobx-react-lite),
- Routing with [**react-navigation**](https://reactnavigation.org/),
- Information is pulled from TMDb with [**axios**](https://github.com/axios/axios),
- All questions are pulled one in advance so that the player wouldn't have to wait until the work with the API is done. The images are preloaded thanks to [**react-native-FastImage**](https://github.com/DylanVann/react-native-fast-image),
- A whole lot of animations, all done with [**react-native-reanimated**](https://github.com/software-mansion/react-native-reanimated) with the help of [**react-native-redash**](https://github.com/wcandillon/react-native-redash) and occasionally even [**react-native-svg**](https://github.com/react-native-community/react-native-svg),
- Adaptive styling with [**styled-components**](https://styled-components.com/) and [**react-native-size-matters**](https://github.com/nirsky/react-native-size-matters),
- Theming, with light and dark theme switchable at any time and realized with [**styled-components**](https://styled-components.com/),
- Persistence between sessions with [**async-storage**](https://github.com/react-native-community/async-storage).


Here's a showcase for the visuals:


## Animations
![Movie Quiz animations](https://i.imgur.com/d90nT7E.gif "Movie Quiz animations")
Animations where done with [**react-native-reanimated**](https://github.com/software-mansion/react-native-reanimated) with the help of [**react-native-redash**](https://github.com/wcandillon/react-native-redash). I jam-packed the whole app with every animation that i could think of. The countdown circle that appears once an answer is pressed and the rays around the correct answer are done with animating [**react-native-svg**](https://github.com/react-native-community/react-native-svg) with the latter definitely being an overkill.


## Themes
![Movie Quiz themes](https://i.imgur.com/yYlcDjJ.png "Movie Quiz themes")
Themes are realized with [**styled-components**](https://styled-components.com/). I haven't used their tools for theming before and was very pleasantly surprised, as it ended up being incredibly lightweight and easy to understand.


## Adaptive styling
![Movie Quiz Adaptive styling](https://i.imgur.com/lR5v4vk.png "Movie Quiz Adaptive styling")


## Error handling
This hardly illustrates handling of axios throwing errors, but it is an animation that i really like!
![Movie Quiz Error handling](https://i.imgur.com/2A6mvg9.gif "Movie Quiz Error handling")

I used [**axios**](https://github.com/axios/axios) so that i wouldn't need to fake a time-out on my requests. If 5 requests time out, the error shows up, as it's probably a problem with connection.


## A couple more screenshots
![Movie Quiz more stuff](https://i.imgur.com/1bZYJjh.png "Movie Quiz more stuff")
![Movie Quiz more stuff](https://i.imgur.com/CWW54tb.png "Movie Quiz more stuff")


# Contacts
My linkedIn https://www.linkedin.com/in/evgeny-ivanitsky/

