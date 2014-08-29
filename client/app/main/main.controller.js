'use strict';

angular.module('chatAppApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $http.get('/api/chat').success(function(chatData) {
      $scope.chatData = chatData;
      socket.syncUpdates('chat', $scope.chatData);
    });

    $scope.sendMsg = function() {
      if($scope.chatMsg === '') {
        return;
      }
      $http.post('/api/chat', { 
        name: Auth.getCurrentUser().name || "Anon",
        info: $scope.chatMsg
      });
      $scope.chatMsg = '';
    };

    $scope.checkEnter = function(e){
      if(e.keyCode === 13){
        $scope.sendMsg();
      }
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
      socket.unsyncUpdates('chat');
    });
  });