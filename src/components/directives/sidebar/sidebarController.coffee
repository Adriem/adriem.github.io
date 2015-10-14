module.directive 'sidebar', ($state, $location) ->

#  link = (scope, element, attrs) ->
#    scope.isActiveSection = (path) -> $location.path() == path

  ### DIRECTIVE RETURN ###
  templateUrl: 'components/directives/sidebar/sidebar.html'
  scope: false
#  link: link