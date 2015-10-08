var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

var mainState = {

    preload: function() { 
        
    },

    create: function() { 
         
    },

    update: function() {
           
    },
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.start('main');  