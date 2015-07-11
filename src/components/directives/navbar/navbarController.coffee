module.directive 'navbar', ($state, $location) ->

  link = (scope, element, attrs) ->
    scope.isActiveSection = (path) -> $location.path() == path
#    scope.isLoggedIn = () -> SessionManager.getSessionState() is 'active'
#    scope.logOut = () ->
#      SessionManager.endSession()
#      $state.go('access')

  ### DIRECTIVE RETURN ###
  templateUrl: 'components/directives/navbar/navbar.html'
  scope: true
  link: link