module = angular.module("AdriemsWorkshop", ['ui.router'])

module.config ($stateProvider, $urlRouterProvider) ->

  $stateProvider

    .state('about', {
      url: '/about'
      templateurl: 'components/views/about.html'
    })

    .state('projects', {
      url: '/projects'
      templateUrl: 'components/views/projects.html'
      controller: 'projectCtrl'
    })

  $urlRouterProvider.otherwise('projects')

module.controller "projectCtrl", ($scope, Projects) ->
  $scope.projects = Projects
  $scope.filter =
    selectedLabel: ''
    labels: do ->
      tags = []
      for project in Projects
        for tag in project.tags when tag not in tags
          tags.push(tag)
      tags
  $scope.filterFunction = (item, index, array) ->
    $scope.filter.selectedLabel is '' or
    item.state == $scope.filter.selectedLabel or
      $scope.filter.selectedLabel in item.tags
