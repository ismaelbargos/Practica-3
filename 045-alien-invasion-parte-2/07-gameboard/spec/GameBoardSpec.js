/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colección de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se añaden como tableros independientes para que Game pueda
  ejecutar sus métodos step() y draw() periódicamente desde su método
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre sí. Aunque se añadiesen nuevos tableros para los
  misiles y para los enemigos, resulta difícil con esta arquitectura
  pensar en cómo podría por ejemplo detectarse la colisión de una nave
  enemiga con la nave del jugador, o cómo podría detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: diseñar e implementar un mecanismo que permita gestionar
  la interacción entre los elementos del juego. Para ello se diseñará
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego serán las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard será un board más, por lo que deberá ofrecer los
  métodos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos métodos.

  Este prototipo no añade funcionalidad nueva a la que ofrecía el
  prototipo 06.


  Especificación: GameBoard debe

  - mantener una colección a la que se pueden añadir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosión, etc.

  - interacción con Game: cuando Game llame a los métodos step() y
    draw() de un GameBoard que haya sido añadido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los métodos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisión entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deberán
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cuándo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qué tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto sólo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/

describe("Clase GameBoardSpec", function(){
  it("Probar el añadir", function(){
    var objeto = {1:"nave"};
    var tablero = new GameBoard();
    expect(tablero.add(objeto)).toEqual(tablero.objects[0]);
  });

  //it("Probar el eliminar", function(){
    
  it("Probar el resetRemoved", function(){
    var objeto = {1:"nave"};
    var tablero = new GameBoard();
    var obj1 = tablero.add(objeto);
    expect(tablero.resetRemoved()).toEqual(undefined);
  });

  it("Probar el removed", function(){
    var objeto = {1:"nave"};
    var tablero = new GameBoard();
    var obj1 = tablero.add(objeto);
    tablero.resetRemoved();
    tablero.remove(objeto);
    expect(tablero.objects[0]).toEqual(tablero.removed[0]);
  });
    
  it("Probar el finalizeRemoved", function(){
    var objeto = {1:"nave"};
    var tablero = new GameBoard();
    var obj1 = tablero.add(objeto);
    tablero.resetRemoved();
    tablero.remove(objeto);
    tablero.finalizeRemoved();
    expect(tablero.objects[0]).toEqual(undefined);
  });

  it("Probar el overlap",function(){

    var tablero = new GameBoard();
    var rect = function(x,y,w,h){
      this.x=x;
      this.y=y;
      this.h=h;
      this.w=w;
    }
    var rect1= new rect(1,1,4,5);
    var rect2= new rect(1,3,4,6);
    var rect3= new rect(100,100,5,5);
    expect(tablero.overlap(rect1,rect2)).toBe(true);
    expect(tablero.overlap(rect1,rect3)).toBe(false);
  });

  it("Probar iterate",function(){

    var tablero = new GameBoard();
    var obj1 = {
      delta: 2,
      prueba: function(){
        return this.delta;}
    };

    var obj2 = {
      delta: 2,
      prueba: function(){
        return this.delta;}
    };

    spyOn(obj1,"prueba");
    spyOn(obj2,"prueba");
    tablero.add(obj1);
    tablero.add(obj2);
    tablero.iterate("prueba");
    _.each(tablero.objects,function(element, index, list){expect(element.prueba).toHaveBeenCalled()});
    var objeto = tablero.detect(obj1.prueba);
    _.each(tablero.objects,function(element, index, list){expect(element.prueba).toEqual(objeto)});
  });

  it ("Probar detect", function(){
    var tablero = new GameBoard();
    var obj1 = {
      delta: 2,
      prueba: function(){
        return this.delta;}
    };

    var obj2 = {
      delta: 2,
      prueba: function(){
        return this.delta;}
    };
    
    tablero.add(obj1);
    tablero.add(obj2);
    var objeto = tablero.detect(obj1.prueba);
    _.each(tablero.objects,function(element, index, list){expect(element.prueba).toEqual(objeto)});
  })
});
