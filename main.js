var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

var mainState = {

    preload: function() { 
      game.stage.backgroundColor = '#BADA55';
      //game.load.image('background', 'assets/bg.png');
      game.load.image('bird', 'assets/angry.jpg');
       
      game.load.image('pipe', 'assets/pipe.png');
        
    },

    create: function() { 
      game.physics.startSystem(Phaser.Physics.ARCADE);
      this.bird = this.game.add.sprite(100, 245, 'bird');

      game.physics.arcade.enable(this.bird);
      this.bird.body.gravity.y = 1000;

      var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      spaceKey.onDown.add(this.jump, this);

      this.pipes = game.add.group();
      this.pipes.enableBody = true;
      this.pipes.createMultiple(20, 'pipe');
      this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

      this.score = 0;
      topScore = localStorage.getItem("topFlappyScore")==null?0:localStorage.getItem("topFlappyScore");  
      this.labelScore = game.add.text(20, 20, "0", 
        { font: "30px Arial", fill: "red" });
         
    },

    update: function() {

      if (this.bird.inWorld == false)
        this.restartGame();

      game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
           
    },

    jump: function() {  
    // Add a vertical velocity to the bird
      this.bird.body.velocity.y = -250;
    },

    restartGame: function() {  
    // Start the 'main' state, which restarts the game
      game.state.start('main');
    },

    addOnePipe: function(x, y) {
        var pipe = this.pipes.getFirstDead();

        pipe.reset(x, y);
        pipe.body.velocity.x = -200;  
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function() {  
    // Pick where the hole will be
      var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes 
      for (var i = 0; i < 8; i++)
        if (i != hole && i != hole + 1) 
            this.addOnePipe(400, i * 60 + 10); 
            
      this.score += 1;  
      this.labelScore.text = this.score;  
    },

};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.start('main');  