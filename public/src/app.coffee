module = angular.module("AdriemsWorkshop", ['ui.router'])

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

    .state('works', {
        url: '/works'
        templateUrl: 'components/views/works/works.html'
      })

  $urlRouterProvider.otherwise('home')