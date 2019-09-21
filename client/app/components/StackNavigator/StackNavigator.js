import { createStackNavigator } from 'react-navigation-stack';

//createStackNavigator(RouteConfigs, StackNavigatorConfig);

createStackNavigator({
    // For each screen that you can navigate to, create a new entry like this:
    Profile: {
      // `ProfileScreen` is a React component that will be the main content of the screen.
      screen: ProfileScreen,
      // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.
  
      // Optional: When deep linking or using react-navigation in a web app, this path is used:
      path: 'people/:name',
      // The action and route params are extracted from the path.
  
      // Optional: Override the `navigationOptions` for the screen
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.name}'s Profile'`,
      }),
    },
  
    ...MyOtherRoutes,
  });

exports default 