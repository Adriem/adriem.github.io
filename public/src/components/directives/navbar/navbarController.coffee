module.directive 'navbar', ($state, $location) ->

  link = (scope, element, attrs) ->
    scope.isActiveSection = (path) -> $location.path() == path

  ### DIRECTIVE RETURN ###
  templateUrl: 'components/directives/navbar/navbar.html'
  scope: true
  link: link