module.directive 'navbar', ($state, $location) ->

  ### DIRECTIVE RETURN ###
  templateUrl: 'components/directives/navbar/navbar.html'
  scope: true
  link: (scope, element, attrs) ->
    scope.isActiveSection = (path) -> $location.path() == path