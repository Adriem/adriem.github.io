module = angular.module("AdriemsWorkshop", ['ui.router', 'ngAnimate'])

module.config ($stateProvider, $urlRouterProvider) ->

#  checkLoggedIn = (SessionManager, state) ->
#    sessionState = SessionManager.getSessionState()
#    if sessionState is 'disconnected' then state.go('access')
#    else if sessionState is 'expired'
#      SessionManager.restoreSession()
#      .error () -> state.go('access')
#
#  checkNotLoggedIn = (SessionManager, state) ->
#    sessionState = SessionManager.getSessionState()
#    if sessionState is 'active' then state.go('home')
#    else if sessionState is 'expired'
#      SessionManager.restoreSession()
#      .success () -> state.go('home')

  $stateProvider

    .state('home', {
        url: '/home'
        templateUrl: 'components/views/home/home.html'
#        controller: 'homeCtrl'
#        onEnter: ['SessionManager', '$state', checkLoggedIn]
      })

    .state('about', {
        url: '/about'
        templateUrl: 'components/views/about/about.html'
#        controller: 'aboutCtrl'
      })

    .state('contact', {
        url: '/contact'
        templateUrl: 'components/views/contact/contact.html'
#        onEnter: ['SessionManager', '$state', checkLoggedIn]
      })

    .state('projects', {
        url: '/projects'
        templateUrl: 'components/views/projects/projects.html'
      })

  $urlRouterProvider.otherwise('home')

module.controller "globalCtrl", ($scope, $location, $state) ->
  $scope.toggleSidebar = false;
  $scope.isActiveSection = (path) -> $location.path() == path
#  $scope.toggleNavbar = () -> $scope.toggleSidebar = not $scope.toggleSidebar;