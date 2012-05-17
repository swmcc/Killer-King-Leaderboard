// Get the players
Players = new Meteor.Collection("killerplayers2");
 

// Listen for someone using the application
if (Meteor.is_client) {

  Template.leaderboard.players = function () {
    return Players.find({}, {sort: {score: -1, name: 1}});
  };

  // Get the player information if passed in
  Template.leaderboard.selected_name = function () {
    var player = Players.findOne(Session.get("selected_player"));
    return player && player.name;
  };

  // Someone selected a player
  Template.player.selected = function () {
    return Session.equals("selected_player", this._id) ? "selected" : '';
  };

  // Simply get the selected player and increment them by one.
  Template.leaderboard.events = {
    'click input.inc': function () {
      Players.update(Session.get("selected_player"), {$inc: {score: 1}});
    }
  };

  // Someone has clicked on a player
  Template.player.events = {
    'click': function () {
      Session.set("selected_player", this._id);
    }
  };
}

// On server startup, create some players if the database is empty.
if (Meteor.is_server) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
      var names = [
		               "Annette McDonagh",
		               "Jenni Hall",
                   "John Price",
                   "Marcus Richardson",
                   "Michael Simpson",
                   "Niall Adams",
                   "Peter O'Malley",
                   "Rick Hassard",
                   "Richard Martin",
                   "Roisin Murray",
                   "Ryan Cunning",
                   "Stevie McCullough",
                   "Steve Rushe"];
      for (var i = 0; i < names.length; i++)
        Players.insert({name: names[i], score: Math.floor(Math.random()*10)*5});
      }
  });
}
