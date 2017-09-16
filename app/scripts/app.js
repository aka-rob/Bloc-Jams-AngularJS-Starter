(function() {
  function config($stateProvider, $locationProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: '/templates/landing.html'
      })
      .state('album', {
        url: '/album',
        templateUrl: '/teamplates/album.html'
      });
  }

  angular
    .module('blocJams', ['ui.router'])
    .config(config);
})
