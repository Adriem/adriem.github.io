module = angular.module("AdriemsWorkshop", ['ui.router', 'ngAnimate'])

module.config ($stateProvider, $urlRouterProvider) ->

  $stateProvider

    .state('home', {
        url: '/home'
        templateUrl: 'components/views/home.html'
      })

    .state('about', {
        url: '/about'
        templateUrl: 'components/views/about.html'
      })

    .state('projects', {
        url: '/projects'
        templateUrl: 'components/views/projects.html'
        controller: 'projectCtrl'
      })

  $urlRouterProvider.otherwise('home')

module.controller "globalCtrl", ($scope, $location, $state) ->
  $scope.toggleSidebar = false;

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