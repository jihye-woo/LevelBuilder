
// class Map{
//     constructor(id, mapWidth, mapHeight, tileWidth, tileHeight, layer){
//         this.id = id;
//         this.mapWidth = mapWidth;
//         this.mapHeight = mapHeight;
//         this.tileWidth = tileWidth;
//         this.tileHeight = tileHeight;
//         this.Layer = new Array(layer);
//     }
// }

// class Layer{
//     constructor(id, name, width, height){
//         this.id = id;
//         this.name = name;
//         this.width = width;
//         this.hegiht = height;
//     }
// }

// class TiledLayer extends Layer{
//     constructor(id, name, width, height){
//         super(id, name, width, height);
//     }
// }

// class ObjectLayer extends Layer{
//     constructor(id, name, width, height){
//         super(id, name, width, height);
//         this.objects = new Array(); // insert the MapObject later
//     }
// }

// class MapObject{
//     constructor(id, xcoordinate, ycoordinate, height, width, image, properties){
//         this.id = id;
//         this.xcoordinate = xcoordinate;
//         this.ycoordinate = ycoordinate;
//         this.visibility = true;
//         this.height = height;
//         this.width = width;
//         this.image = image;
//         this.properties = properties;
//     }
// }
class Color {
    constructor(r,g,b,a) {
      this.r=r;
      this.g=g;
      this.b=b;
      if (a === undefined && a !== 0) a = 1.0;
      this.a=a;
    }    
    static getWhite() {
      return new Color(255,255,255,1);
    }  
    static getBlack() {
      return new Color(0,0,0,1);
    }  
    darker(amount) {    
      return this.shade(-amount);
    }  
    lighter(amount) {    
      return this.shade(amount);
    }
    lerp(to, amount) {
      const lerpNum = (start, end, a) => parseInt(start + ((end-start) * a));
      return new Color(
        lerpNum(this.r, to.r, amount),
        lerpNum(this.g, to.g, amount),
        lerpNum(this.b, to.b, amount),
        this.a
      );
    }  
    shade(percent) {
      let r = parseInt(this.r * (100 + percent) / 100);
      let g = parseInt(this.g * (100 + percent) / 100);
      let b = parseInt(this.b * (100 + percent) / 100);
      let c = new Color((r<255)?r:255, (g<255)?g:255,(b<255)?b:255,this.a);    
      return c;
    }  
    rgba(alpha) {
      alpha = alpha || this.a;
      return `rgba(${this.r},${this.g},${this.b},${alpha})`;
    }
    rgb() {    
      return `rgb(${this.r},${this.g},${this.b})`;
    }  
  }
  
  
  class Physics {
      static register(object) {
          if (!this.objects) this.objects = [];        
          this.objects.push(object);
      }
    
      static unregister(object) {
          // note: this would have been super bad if we had multiple threads..
          if (!this.objects) this.objects = [];        
          var index = this.objects.indexOf(object);       
          if (index === -1) return;
          this.objects.remove(index);        
      }
    
      static update() {
        if (!this.objects) this.objects = [];  
        for (let index = 0; index < this.objects.length; ++index) {
          let obj = this.objects[index];
          if (obj.rigidBody) this.updateRigidBody(obj.rigidBody);        
          else if (obj.collider) this.updateCollider(obj.collider);       
        }
      }
  
      static updateRigidBody(rigidBody) {
          let isGrounded = false;
          let velX = rigidBody.velocity.x * Time.deltaTime;
          let velY = rigidBody.velocity.y * Time.deltaTime;
          if (!isNaN(velX) && !rigidBody.constraints.freezePositionX) rigidBody.gameObject.position.x += velX;
          if (!isNaN(velY) && !rigidBody.constraints.freezePositionY) rigidBody.gameObject.position.y += velY;
          // let height = rigidBody.gameObject.collider.bounds.max.y;
          let screenHeight = window.innerHeight / ctxScaleY;
          for (let i = 0; i < this.objects.length; ++i) {
              if (this.objects[i].rigidBody !== rigidBody) {
                  let obj = this.objects[i];
                  if (obj.collider && obj.collider.isTouching(rigidBody.gameObject.collider)) {
                      if (obj.isTrigger === true) {
                          rigidBody.gameObject.onTriggerEnter(obj.collider);
                      } else {
                          rigidBody.gameObject.onCollisionEnter(obj.collider);
                          if (rigidBody.ignoreCollisionPhysics) return;
                          // check which face of the boundingbox/collider that actually had a collision
                          // and then stop the velocity of that direction
  
                          // TODO: RayCast the sides to determine where the blockage is
                          //       and stop the velocity in that direction                      
                          
                          // NOTE: You can jump through objects that whould block your left or right if you jump towards it                      
                          if (obj.position.y + obj.offset.y >= (rigidBody.gameObject.position.y + rigidBody.gameObject.offset.y)) {
                              isGrounded = true;
                              rigidBody.velocity.y = 0;
                              rigidBody.gameObject.position.y = (obj.position.y - rigidBody.gameObject.collider.bounds.max.y) + 1;
                          } else if (obj.position.x + obj.offset.x >= rigidBody.gameObject.position.x) {
                            // collides to the right
                            // + rigidBody.gameObject.collider.bounds.max.x
                            rigidBody.gameObject.position.x -= velX;
                            rigidBody.velocity.x = 0;
                          }
                          else if (obj.position.x + obj.offset.x + obj.collider.bounds.max.x >= 
                                   rigidBody.gameObject.position.x) {
                            // collides to the right
                            // + rigidBody.gameObject.collider.bounds.max.x
                            rigidBody.gameObject.position.x -= velX;
                            rigidBody.velocity.x = 0;
                          }
                      }
                  }
              }
          }
          if (!isGrounded) {
              let fall = gravity * Time.deltaTime;
              if (!isNaN(fall)) {
                  rigidBody.velocity.y -= fall;
              }
          }
          else {
              if (rigidBody.force.y != 0) {
                  rigidBody.velocity.y = rigidBody.force.y;
                  rigidBody.force.y = 0;
              }
          }
  
          rigidBody.isGrounded = isGrounded;
      }
  
      static updateCollider(collider) {
          // console.log("update collider");
      }
  }
  
  class GameComponent {
      constructor() {
        this.gameObject = null;
        this.isEnabled = true;
        this.tag = '';
        this.layer = '';
      }
      setGameObject(gameObject) {
          this.gameObject = gameObject;
      }
      update() { }
      draw() { }
  }
  
  class BoundingBox {
    constructor(min = { x: 0, y: 0 }, max = { x: 0, y: 0 }) {
        this.min = min;
        this.max = max;
      }
    get delta() {
      return {
        x: this.max.x - this.min.x,
        y: this.max.y - this.min.y
      };
    }
  }
  
  class Viewport {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.width = window.innerWidth / ctxScaleX;
      this.height = window.innerWidth / ctxScaleY;    
    }
    move (xOffset, yOffset) {
      this.x += xOffset;
      this.y += yOffset;
    }
    reset() {
      this.x = 0;
      this.y = 0;
    }
  }
  
  class Camera {
    constructor() {    
      this.viewport = new Viewport();    
    }
    static getMainCamera() {
      if (!this.mainCamera) this.mainCamera = new Camera();
      return this.mainCamera;
    }
    setViewport(x, y, w, h) {
      this.viewport.x = x;
      this.viewport.y = y;
      if (w) this.viewport.width  = w;
      if (h) this.viewport.height = h;
    }
  }
  
  class FollowTarget extends GameComponent {
    constructor(target, xOffset, yOffset) {
      super();  
      this.target=target;
      this.xOffset=xOffset||0;
      this.yOffset=yOffset||0;
    }
    draw() {
      if (!this.isEnabled||!this.isVisible) return;
      super.draw();
    }
    update() {
      if (!this.isEnabled) return;
      super.update();
      if (this.target instanceof GameObject) {
        this.gameObject.position.x = this.target.position.x + this.xOffset;
        this.gameObject.position.y = this.target.position.y + this.yOffset;
      }
    }
  }
  
  class FadeOut extends GameComponent {
    constructor() {
      super();
      this.isRunning = false;
      this.value = 1.0;    
      this.duration = 5.0;
      this.timer = this.duration;    
      this.destroyObjectOnCompletion = false;
    }
    start() {    
      this.value = this.gameObject.opacity;
      this.timer = this.duration * this.gameObject.opacity;        
      this.isRunning = true;    
    }
    stop() {
      this.isRunning = false;
    }
    update() {
      if (!this.isEnabled || !this.isRunning) return;
      super.update();
      
      this.timer -= Time.deltaTime / 1000;
      this.value = 1-((this.duration - this.timer) / this.duration);
      this.gameObject.opacity = this.value;
      if (this.value <= 0.001 || this.timer <= 0) {
        if (this.onComplete) this.onComplete(this.gameObject);
        this.isRunning = false;
        this.timer = 0;
        this.gameObject.opacity = 0;
        if (this.destroyObjectOnCompletion) {
          this.gameObject.destroy();
        }        
      }    
  
    }
    draw() { 
      super.draw();
    }
  }
  
  class Mask extends GameComponent {
    constructor() {
      super();
      this.shape = undefined;    
      this.centerShape = false;
      this.drawShape = false;
      this.offset = {x:0,y:0};    
    }
    draw() {
      if (this.shape === undefined) return;
      if (this.isEnabled !== true) return;
      
      if (this.drawShape) {
        this.shape.draw();
      }
      
      let path = new Path2D();
      path.moveTo(this.shape.points[0].x, this.shape.points[0].y);
      for (let i = 1; i < this.shape.points.length; ++i) {
        path.lineTo(this.shape.points[i].x, this.shape.points[i].y);
      }    
      path.closePath();    
      ctx.clip(path, "nonzero");
    }
    update() {
      if (!this.isEnabled || !this.centerShape || !this.shape) return;
      // console.log(this.gameObject.image.src);    
      let goPos = this.gameObject.position;   
      // TODO: move path to center of sprite
      //let bb = this.shape.getBoundingBox();
      
      this.shape.moveTo(goPos.x + this.offset.x, goPos.y + this.offset.y, new Point(0, 0));
    }
  }
  
  class Collider extends GameComponent {
    constructor() {
      super();
      this.isTrigger = false;
      this.bounds = new BoundingBox();    
      this.layerMask = undefined;
    }
    isTouching(otherCollider) {
      return false;
    }
  }
  
  class PolygonCollider extends Collider {
      constructor(shape) {
        super();
        this.isTrigger = false;
        this.shape = shape;
        this.bounds = new BoundingBox();
        if (this.shape) {
          this.bounds = shape.getBoundingBox();
        }
      }
      isTouching(otherCollider) {
        if (!this.shape) return;
  
        if (this.gameObject && otherCollider && otherCollider.gameObject) {        
          if (this.layerMask && otherCollider.layer !== this.layerMask) {          
              return false;
          }        
          if (this.bounds.max.x == 0) this.bounds = this.shape.getBoundingBox();
          
          // first check if we are inside eachother's bounding box. otherwise theres no point of checking whether they touch
          let aSize = { width: this.bounds.max.x, height : this.bounds.max.y };
          let aPos  = { x: this.gameObject.position.x + this.gameObject.offset.x, y: this.gameObject.position.y + this.gameObject.offset.y};
          let bSize = { width: otherCollider.bounds.max.x, height: otherCollider.bounds.max.y };
          let bPos  = { x: otherCollider.gameObject.position.x + otherCollider.gameObject.offset.x, y: otherCollider.gameObject.position.y + otherCollider.gameObject.offset.y};          
          if(aPos.x + aSize.width >= bPos.x
            && aPos.x <= bPos.x + bSize.width
            && aPos.y + aSize.height >= bPos.y
            && aPos.y <= bPos.y + bSize.height) {          
            let pts = otherCollider.getPoints();                  
            for(let pt of pts) {
              if (this.shape.isPointInside(pt)) return true;
            }                        
          }
        }
        return false;
      }   
    getPoints() {
      return this.shape.points;
    }
  }
  
  class BoxCollider extends Collider {
      constructor() {
        super();
        this.isTrigger = false;
        this.bounds = new BoundingBox();
      }
      isTouching(otherCollider) {
        if (this.gameObject && otherCollider && otherCollider.gameObject) {
          if (this.layerMask && otherCollider.layer !== this.layerMask) {          
              return false;
          }
          
          let aSize = { width: this.bounds.max.x, height : this.bounds.max.y };
          let aPos  = { x: this.gameObject.position.x + this.gameObject.offset.x, y: this.gameObject.position.y + this.gameObject.offset.y};
          let bSize = { width: otherCollider.bounds.max.x, height: otherCollider.bounds.max.y };
          let bPos  = { x: otherCollider.gameObject.position.x + otherCollider.gameObject.offset.x, y: otherCollider.gameObject.position.y + otherCollider.gameObject.offset.y};          
          return aPos.x + aSize.width >= bPos.x
          && aPos.x <= bPos.x + bSize.width
          && aPos.y + aSize.height >= bPos.y
          && aPos.y <= bPos.y + bSize.height;          
        }
        return false;
      }
    getPoints() {
      return [      
        new Point(this.bounds.min.x, this.bounds.min.y), new Point(this.bounds.max.x, this.bounds.min.y), 
        new Point(this.bounds.max.x, this.bounds.min.y), new Point(this.bounds.max.x, this.bounds.max.y),
        new Point(this.bounds.max.x, this.bounds.max.y), new Point(this.bounds.min.x, this.bounds.max.y),
        new Point(this.bounds.min.x, this.bounds.max.y), new Point(this.bounds.min.x, this.bounds.min.y),            
      ];
    }
  }
  
  class BoxRenderer extends GameComponent {
      constructor() {
          super();
          this.size = { width: 0, height: 0 };
      }
      draw() { 
        if (this.isEnabled !== true) return;
        let camera = Camera.getMainCamera();
        ctx.save();
        ctx.beginPath();
        ctx.rect(
          camera.viewport.x + this.gameObject.position.x, 
          camera.viewport.y + this.gameObject.position.y, 
          this.size.width, 
          this.size.height);        
        ctx.strokeStyle = 'Red';
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }
  }
  
  class RigidBody extends GameComponent {
      constructor() {
          super();
          this.velocity = { x: 0, y: 0 };
          this.force = { x: 0, y: 0 };  
          this.isStatic = false;        
          this.isGrounded = false;
          this.constraints = { freezePositionX: false, freezePositionY: false };
          this.ignoreCollisionPhysics = false;
      }
  }
  
  class GameObject {
      constructor() {
          this.position = { x: 0, y: 0 };
          this.rotation = 0;
          this.opacity = 1;
          this.isEnabled = true;
          this.isVisible = true;
          this.rigidBody = null;
          this.collider = null;
          this.renderer = null;
          this.parent   = null;
          this.isDestroyed = false;
          this.components = [];
          this.children   = [];
          this.name = '';
          this.tag = '';
          this.layer = '';
          this.offset = {x:0, y:0};        
          Physics.register(this);
      }  
    
      // get localPosition() {      
      getLocalPosition() {
        if (this.parent !== null) {
          return {
            x: this.position.x - this.parent.position.x,
            y: this.position.y - this.parent.position.y
          };
        }
        
        return {
          x: this.position.x,
          y: this.position.y
        };      
      }
    
      //set localPosition(value) {
      setLocalPosition(x, y) {
        if (this.parent !== null) {
          this.position = {
            x: this.parent.position.x + x,
            y: this.parent.position.y + y
          };
          return;
        }
        
        this.position = {
          x: value.x,
          y: value.y
        };      
      }
      
      destroy() {
        if (this.isDestroyed) return;
        this.isDestroyed = true;
        Physics.unregister(this);
        if (this.parent) {       
          this.parent.removeChild(this);
        }
      }    
      addComponent(component) {
        this.components.push(component);
        component.setGameObject(this);
        return component;
      }
      addChild(gameObject) {
        this.children.push(gameObject);
        gameObject.setParent(this);
        return gameObject;
      }
    
      removeChild(gameObject) {
        let index = this.children.indexOf(gameObject);
        gameObject.setParent(null);      
        this.children.remove(index);
      }
      getComponent(name) {
        for(let child of this.components) {
          if (child.constructor.name == name) {
            return child;
          }
        }
        return undefined;
      }
      setParent(gameObject) {
        this.parent = gameObject;
      }
      setRenderer(renderer) {
        if (this.renderer) {
          var index = this.components.indexOf(this.renderer);                   
          this.components.remove(index);
        }
        this.renderer = renderer;
        this.addComponent(this.renderer);
      }
      setRigidBody(rigidBody) {
        if (this.rigidBody) {
          var index = this.components.indexOf(this.rigidBody);                   
          this.components.remove(index);
        }
        this.rigidBody = rigidBody;
        this.addComponent(this.rigidBody);
      }
      setCollider(collider) {
        if (this.collider) {            
          var index = this.components.indexOf(this.collider);                   
          this.components.remove(index);          
        }
        this.collider = collider;
        this.addComponent(this.collider);
      }
      update() {   
        for(let i = 0; i < this.components.length; ++i) {
          this.components[i].update();
        }      
        for(let i = 0; i < this.children.length; ++i) {
          this.children[i].update();
        }
      }
      draw() {             
        for(let i = 0; i < this.components.length; ++i) {
          this.components[i].draw();
        }      
        for(let i = 0; i < this.children.length; ++i) {
          this.children[i].draw();
        }
      }
      onCollisionEnter(collider) { }
      onTriggerEnter(collider) { }
  }
  
  class ParticleSystem extends GameObject {
    constructor() {    
      super();
      this.isLooping = false;
      this.isEmitting = false;    
      this.startSize = 1;
      this.startDelay = 0;
      this.startSpeed = 5;
      this.startColor = "red";
      this.startLifetime = 1;
      this.startTime = 0;
      this.duration = 1.0;
      this.timer = this.duration;
      this.maxParticleCount = 10;
    }
    update() {
      if (!this.isEnabled) return;    
      super.update();
      // pass-1 update whether we should continue to emit particles
      if (this.isEmitting) {
        this.timer -= Time.deltaTime/1000;       
        if (this.timer <= 0) {
          this.timer = this.isLooping ? this.duration : 0;
          // if its still 0, then stop the emitting
          this.isEmitting = this.timer > 0;
        }
      }    
      // if we are still emitting, keep adding those particles!
      if (this.isEmitting) {
        this.addParticle();
        this.updateParticles();
      }
    }  
    addParticle() {
      if (this.children.length >= this.maxParticleCount) return;
      let velocity = new Point((Math.random()*0.5)-0.25, Math.random()*0.2); 
      let particle = new Particle(this.position.x, this.position.y, this.startLifetime, velocity, this.startColor, (Math.random() * 3)+1);
      this.addChild(particle);
    }  
    updateParticles() {
      let toRemove = this.children.filter(x => x.lifetime <= 0 || x.position.y >= canvas.height);    
      toRemove.forEach(x => x.destroy());
    }  
    destroyParticles() {
      let toRemove = [];    
      this.children.forEach(x => toRemove.push(particle));
      toRemove.forEach(x => x.destroy());
    }  
    draw() {
      if (!this.isEnabled) return;
      super.draw();
    }
    start() {
      this.destroyParticles();
      this.isEmitting = true;
      this.timer = this.duration;
      this.startTime = Time.time;
    }
    stop() {
      this.isEmitting = false;
    }  
    get particleCount() {
      return children.length;
    }
  }
  
  class Particle extends GameObject {
    constructor(startX, startY, life, velocity, color, size) {
      super();
      const rigidBody = new RigidBody();    
      rigidBody.velocity.x = velocity.x;
      rigidBody.velocity.y = velocity.y;
      this.size = size;
      this.color = color;
      this.lifetime = life;
      this.setRigidBody(rigidBody);        
      this.position.x = startX;
      this.position.y = startY;
    }
    update() {
      if (!this.isEnabled) return;
      super.update();
      this.lifetime -= Time.deltaTime/1000;
    }
    draw() {
      if (!this.isEnabled || !this.isVisible) return;
      super.draw();
      ctx.save();
      // console.log("draw particle at: " + this.position.x + "," + this.position.y);
      drawCircle(this.position.x, this.position.y, this.color, this.size);
      ctx.restore();    
    }
  }
  
  class Button extends GameObject {
    constructor() {
      super();
      this.states = [];
      this.states["default"] = {callbacks: []};    
      this.states["hover"]   = {callbacks: []};
      this.states["active"]  = {callbacks: []};  
      this.states["click"]  = {callbacks: []};      
      this.state = "default";
      this.borderOnInside = false;
      this.width = 150;
      this.height = 50;
      this.text = "Button 1";
      this.fontSize = 16;
      this.fontColor = Color.getWhite();
      this.font = "arial";
      this.background = new Color(255, 0, 0);
      this.border = new Color(0, 255, 0);
      this.borderWidth = 1;
      this.doubleBorder = false;
      this.doubleBorderDistance = 5;
      this.content = undefined; // appoint a gameobject and it will draw it as content :-)
      this.contentScale = 1.0;
      this.contentMargin = {top:0,left:0,right:0,bottom:0};
    }
    draw() {
      if (!this.isEnabled || !this.isVisible) return
      super.draw();
      
      this.drawButtonBase();    
      this.drawContent();
      this.drawText();    
    }
    
    drawButtonBase() {
      let fill   = this.background;
      let stroke = this.border;    
      switch (this.state) {
        case "hover":        
          fill   = fill.darker(22);
          stroke = stroke.darker(22);
          break;
        case "active":
          fill   = fill.darker(44);
          stroke = stroke.darker(44);
          break;
      }
      
      const bw =ctx.lineWidth;
      const fs =ctx.fillStyle;
      const ss =ctx.strokeStyle;
      
      ctx.save();    
      ctx.beginPath();
      ctx.lineWidth = this.borderWidth;
      ctx.fillStyle = fill.rgba();
      ctx.strokeStyle = stroke.rgba();
      ctx.rect(this.position.x, this.position.y, this.width, this.height);
      ctx.fill();
      
      if (this.borderOnInside === true) {
        ctx.beginPath();
        ctx.rect(this.position.x + this.borderWidth/2, 
                 this.position.y + this.borderWidth/2, 
                 this.width   - (this.borderWidth), 
                 this.height  - (this.borderWidth));
      }
      ctx.stroke();
      
      if(this.doubleBorder === true) {
         const bd = this.doubleBorderDistance;
        ctx.beginPath();
      ctx.lineWidth = this.borderWidth;
      ctx.fillStyle = fill.rgba();
      ctx.strokeStyle = stroke.rgba();
      ctx.rect(this.position.x + bd, this.position.y + bd, this.width - bd*2, this.height - bd*2);
      ctx.fill();
      ctx.stroke();
    }
      
      
      ctx.restore();
      
      ctx.lineWidth = bw;
      ctx.fillStyle = fs;
      ctx.strokeStyle =ss;
    }
    
    drawContent() {
      if (!this.content) return;
      ctx.save();
          
      
      let x = this.position.x + this.contentMargin.left;
      let y = this.position.y + this.contentMargin.top;
      
      ctx.translate(x, y);
      ctx.scale(this.contentScale,this.contentScale);
  
      
      this.content.draw();
      ctx.restore();
    }
    
    drawText() {
      if (!this.text || this.text.length === 0) return;
      ctx.save();
      ctx.font = this.fontSize + "px " + this.font;    
      const size = ctx.measureText(this.text);    
      ctx.fillStyle = this.fontColor.rgba();
      ctx.fillText(this.text, this.position.x + (this.width / 2 - size.width/2), (this.position.y + this.fontSize) + (this.height/2 - this.fontSize/2));
      ctx.restore();
    }
    
    update() {
      if (!this.isEnabled) return;
      super.update();
      let oldState = this.state;
      let click = false;
      if (mouse.x >= this.position.x && mouse.x <= this.position.x + this.width &&
         mouse.y >= this.position.y && mouse.y <= this.position.y + this.height) {
        if (mouse.leftButton) {
          if (this.state !== "active") {
            this.state = "active";
          }
        } else {
          if (this.state !== "hover") {
            this.state = "hover";
            click = oldState === "active";
          }
        }
      } else if(this.state !== "default") {
        this.state = "default"
      }
      if (oldState !== this.state) {
        this.states[this.state].callbacks.forEach(x => x());      
        if (click) this.states["click"].callbacks.forEach(x => x());      
      }
    }
    
    on(state, callback) {
      this.states[state].callbacks.push(callback);
    }
  }
  
  
  class Sprite extends GameObject {
    constructor(img) {
      super();
      this.image = img;
      this.width= -1;
      this.height=-1;
      this.imageOffset = {x:0,y:0};
      this.scale = {x:1,y:1};    
      this.origin = {x:0,y:0};    
      this.isTiledRepeat = false;
    }
    static fromUrl(src) {
      const spriteImg = new Image();
      spriteImg.src = src;
      return new Sprite(spriteImg);
    }
    update() {
      if (!this.isEnabled) return;
      super.update();
    }  
    draw() {    
      if (!ctx || !this.isVisible || !this.isEnabled || !this.image) return;   
      
      ctx.save();
      super.draw();
      // ctx.restore();
      
      const w = this.image.width;
      const h = this.image.height;
      const cols = Math.floor(this.width / w) + 1;
      const rows = Math.floor(this.height / h) + 1;
      
      if (this.isTiledRepeat && !isNaN(cols) && !isNaN(rows) && cols > 0 && rows > 0 && cols < 1920 && rows < 1080) {  
        for(let x = 0; x < cols; x++) {
          for(let y = 0; y < rows; y++) {
            ctx.drawImage(this.image, x * w, y * h);
          }
        }
      } else {   
        let camera = Camera.getMainCamera();        
        if (this.width  <= 0) {
          this.width = this.image.width;
          this.height = this.image.height;
        }    
  
        const scaledWidth = this.width * this.scale.x;
        const scaledHeight = this.height * this.scale.y;    
        const bb = this.getBoundingBox();    
        const dx = this.origin.x > 0 ? -((bb.max.x - bb.min.x) * this.origin.x) : 0;
        const dy = this.origin.y > 0 ? -((bb.max.y - bb.min.y) * this.origin.y) : 0;     
        const renderX = camera.viewport.x + this.position.x + this.offset.x + this.imageOffset.x + dx;
        const renderY = camera.viewport.y + this.position.y + this.offset.y + this.imageOffset.y + dy;    
  
        // ctx.save();
        ctx.globalAlpha = this.opacity;
  
        if (this.rotation !== 0) {
          ctx.translate(renderX-dx, renderY-dy);
          ctx.rotate(this.rotation * Math.PI/180.0);
          ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, dx, dy, scaledWidth, scaledHeight);      
        } else {      
  
          ctx.drawImage(
            this.image,
            0,
            0,
            this.image.width,
            this.image.height,
            renderX,
            renderY,
            scaledWidth,
            scaledHeight);
        }    
      }
      
      ctx.restore(); // do restore again as we saved our context the first thing we did.
    } 
    getBoundingBox() {
      return new BoundingBox(
        new Point(this.position.x, this.position.y),
        new Point(this.position.x + (this.width * this.scale.x), this.position.y + (this.height * this.scale.y))
      ); 
    }
  }
  
  
  class Scene extends GameObject {
    constructor() {
      super();
    }
    update() {
      super.update();
    }
    draw() {
      super.draw();
    }
  }
  
  class IsometricMapRenderer {
      constructor() {
        this.tileDepth=80;
        this.renderIndex=0;
      }
      draw(map) {
        this.renderIndex = 0;
        if (!map) return;
    
        this.drawGrid(map);
        this.drawRecursive(map); 
        if (map.hoverVisible) {
          this.drawBrush(map);
        }
      }
      
      drawBrush(map) {
        let mousePoint = this.screenToWorldPoint(map, mouse.x / ctxScaleX, mouse.y / ctxScaleY);               
        for(let y = 0; y < brushSize;++y) {if (window.CP.shouldStopExecution(2)){break;}
         for (let x = 0; x < brushSize;++x) {if (window.CP.shouldStopExecution(1)){break;}
              let renderPoint = this.getRenderPoint(mousePoint.x+x, mousePoint.y+y); 
              this.drawTileHover(renderPoint.x, renderPoint.y, map.tileWidth, map.tileHeight); 
           }
    window.CP.exitedLoop(1);
    
        }
    window.CP.exitedLoop(2);
           
      }
      
      drawRecursive(map, currentLayer) {
        if (typeof currentLayer == "undefined") {            
          for (let item of map.children) {if (window.CP.shouldStopExecution(3)){break;}
            this.drawRecursive(map, item);
          }
    window.CP.exitedLoop(3);
    
        } else {
          if (currentLayer.visible) {
            if (currentLayer instanceof MapLayerGroup) {
              for (let item of currentLayer.children) {if (window.CP.shouldStopExecution(4)){break;}
                this.drawRecursive(map, item);
              }
    window.CP.exitedLoop(4);
    
            } else {
              this.drawLayer(map, currentLayer);
            }
          }      
          this.renderIndex++;
        }
      }
      
      drawGrid(map) {
        let camera = Camera.getMainCamera();
        let tileWidth = map.tileWidth;
        let tileHeight = map.tileHeight;
        let tile_half_width = tileWidth / 2;
        let tile_half_height = tileHeight / 2;
        for (let tileX = 0; tileX < map.width; ++tileX) {if (window.CP.shouldStopExecution(6)){break;}
          for (let tileY = 0; tileY < map.height; ++tileY) {if (window.CP.shouldStopExecution(5)){break;}     
            let renderX = camera.viewport.x + (tileX - tileY) * tile_half_width;
            let renderY = camera.viewport.y + (tileX + tileY) * tile_half_height;
            this.drawGridTile(renderX, renderY, tileWidth, tileHeight);     
          }
    window.CP.exitedLoop(5);
    
        }
    window.CP.exitedLoop(6);
    
      }
      
      drawLayer(map, layer) {
        let camera = Camera.getMainCamera();
        let tileWidth = map.tileWidth;
        let tileHeight = map.tileHeight;
        let tile_half_width = tileWidth / 2;
        let tile_half_height = tileHeight / 2;
        for (let tileX = 0; tileX < map.width; ++tileX) {if (window.CP.shouldStopExecution(8)){break;}
          for (let tileY = 0; tileY < map.height; ++tileY) {if (window.CP.shouldStopExecution(7)){break;}     
            let renderX = camera.viewport.x + (tileX - tileY) * tile_half_width;
            let renderY = camera.viewport.y + (tileX + tileY) * tile_half_height;        
            this.drawTile(map, layer.tileData[tileY * map.width + tileX], renderX, renderY-48-(this.renderIndex*12), tileWidth, tileHeight);
          }
    window.CP.exitedLoop(7);
    
        }
    window.CP.exitedLoop(8);
     
      }
      
      getRenderPoint(tileX, tileY) {
        let camera = Camera.getMainCamera();
        let tileWidth = map.tileWidth;
        let tileHeight = map.tileHeight;
        let tile_half_width = tileWidth / 2;
        let tile_half_height = tileHeight / 2;
        let renderX = camera.viewport.x + (tileX - tileY) * tile_half_width;
        let renderY = camera.viewport.y + (tileX + tileY) * tile_half_height;
        return {
          x: renderX,
          y: renderY
        }
      }
      drawGridTile(x, y, width, height) {
        this.drawTileGraphics(x, y, width, height, 'rgba(255,255,255,0.4)', 'rgba(25,34, 44,0.2)', [5], 1);
      }  
      drawTile(map, tileData, x, y, width, height) {
        if (!tileData || tileData.id === -1) 
          return;
        
        let tileset = getTilesetById(tileData.tileset, map.type);
        let tile = tileset.getTile(tileData.id);       
        if (!tile || !tile.src)
          return;
        
        // this.drawTileGraphics(x, y, width, height, 'rgba(255,255,255,0.4)', 'rgba(25,34, 44,0.2)', [5], 1);
        // ctx.drawImage(tile.src, tile.x, tile.y, tile.width, tile.height, x, y, tile.width, tile.height);
        let offsetY = this.tileDepth - height;
        ctx.drawImage(tile.src, x, y+offsetY-(height/2));
      }  
      drawTileHover(x, y, width, height){         
        this.drawTileGraphics(x, y, width, height, 'rgba(30,250,42,0.4)', 'rgba(30,250,42,0.1)', [], 1);
      }  
      drawTileGraphics(x, y, width, height, strokeStyle, fillStyle, lineDash, lineWidth) {
        ctx.beginPath();  
        ctx.setLineDash(lineDash);
        ctx.strokeStyle = strokeStyle;  
        ctx.fillStyle = fillStyle;  
        ctx.lineWidth = lineWidth;
        ctx.moveTo(x, y);
        ctx.lineTo(x + width/2, y-height/2);  
        ctx.lineTo(x + width, y);  
        ctx.lineTo(x + width/2, y + height/2);  
        ctx.lineTo(x, y);    
        ctx.stroke();
        ctx.fill();    
      }
      
      worldToScreenPoint(map, x, y) {
        let camera = Camera.getMainCamera();
        let tileWidth = map.tileWidth;
        let tileHeight = map.tileHeight;
        let tile_half_width = tileWidth / 2;
        let tile_half_height = tileHeight / 2;    
        let renderX = (x - y) * tile_half_width - camera.viewport.x;
        let renderY = (x + y) * tile_half_height - camera.viewport.y;
        return {
          x: renderX,
          y: renderY
        }
      }
      screenToWorldPoint(map, x, y) {
        let camera = Camera.getMainCamera();
        let tile_height = map.tileHeight;
        let tile_width = map.tileWidth;
        let mouse_y = y - camera.viewport.y;
        let mouse_x = x - camera.viewport.x;  
        return {
          x: Math.floor((mouse_y / tile_height) + (mouse_x / tile_width)),
          y: Math.floor((-mouse_x / tile_width) + (mouse_y / tile_height))+1
        };
      }  
    }
    
    class MapRenderer {
      draw(map) {
        if (!map) return;    
        this.drawGrid(map);
        this.drawRecursive(map);    
        if (map.hoverVisible) {
          this.drawBrush(map);
        }
      }
      
      drawBrush(map) {
        let mousePoint = this.screenToWorldPoint(map, mouse.x / ctxScaleX, mouse.y / ctxScaleY);               
        for(let y = 0; y < brushSize;++y) {if (window.CP.shouldStopExecution(10)){break;}
         for (let x = 0; x < brushSize;++x) {if (window.CP.shouldStopExecution(9)){break;}
              let renderPoint = this.getRenderPoint(mousePoint.x+x, mousePoint.y+y); 
              this.drawTileHover(map, renderPoint.x, renderPoint.y);
           }
    window.CP.exitedLoop(9);
    
        }
    window.CP.exitedLoop(10);
           
      }
      
      drawRecursive(map, currentLayer) {
        if (typeof currentLayer == "undefined") {            
          for (let item of map.children) {if (window.CP.shouldStopExecution(11)){break;}
            this.drawRecursive(map, item);
          }
    window.CP.exitedLoop(11);
    
        } else {
          if (currentLayer.visible) {
            if (currentLayer instanceof MapLayerGroup) {
              for (let item of currentLayer.children) {if (window.CP.shouldStopExecution(12)){break;}2
                this.drawRecursive(map, item);
              }
    window.CP.exitedLoop(12);
    
            } else {
              this.drawLayer(map, currentLayer);
            }
          }
        }
      }
      
      drawGrid(map) {
        let camera = Camera.getMainCamera();
        for(let y = 0; y < map.height; ++y) {if (window.CP.shouldStopExecution(14)){break;}
          for (let x = 0; x < map.width; ++x) {if (window.CP.shouldStopExecution(13)){break;}
            let renderX = camera.viewport.x + (x * map.tileWidth);
            let renderY = camera.viewport.y + (y * map.tileHeight);
            this.drawGridTile(map, renderX, renderY);
          }
    window.CP.exitedLoop(13);
    
        }
    window.CP.exitedLoop(14);
        
      }
       
      drawLayer(map, layer) {
        let camera = Camera.getMainCamera();
        for(let y = 0; y < map.height; ++y) {if (window.CP.shouldStopExecution(16)){break;}
          for (let x = 0; x < map.width; ++x) {if (window.CP.shouldStopExecution(15)){break;}
            let renderX = camera.viewport.x + (x * map.tileWidth);
            let renderY = camera.viewport.y + (y * map.tileHeight);
            this.drawTile(layer.tileData[y * map.width + x], map, renderX, renderY);
          }
    window.CP.exitedLoop(15);
    
        }
    window.CP.exitedLoop(16);
        
      }
      
      getRenderPoint(x, y) {    
        let camera = Camera.getMainCamera();
        return {
          x: camera.viewport.x + (x * map.tileWidth),
          y: camera.viewport.y + (y * map.tileHeight) 
        }
      }
      drawGridTile(map, x, y) {
        this.drawTileGraphics(map, x, y, 'rgba(255,255,255,0.4)', 'rgba(25,34, 44,0.2)', [1], 1);
      }
      
      drawTile(tileData, map, x, y) {
        if (!tileData || tileData.id === -1) 
          return;
        
        let tileset = getTilesetById(tileData.tileset, map.type);
        let tile = tileset.getTile(tileData.id);    
        ctx.drawImage(tileset.src, tile.x, tile.y, tile.width, tile.height, x, y, tile.width, tile.height);
        // this.drawTileGraphics(map, x, y, 'rgba(255,255,255,0.4)', 'rgba(25,34, 44,0.2)', [1], 1);
      }
      
      drawTileHover(map, x, y) {   
        this.drawTileGraphics(map, x, y, 'rgba(30,250,42,0.4)', 'rgba(30,250,42,0.1)', [], 1);
      }  
      drawTileGraphics(map, x, y, strokeStyle, fillStyle, lineDash, lineWidth) {
        ctx.beginPath();    
        ctx.setLineDash(lineDash);
        ctx.strokeStyle = strokeStyle;  
        ctx.fillStyle = fillStyle;  
        ctx.lineWidth = lineWidth;  
        ctx.rect(x, y, map.tileWidth, map.tileHeight);    
        ctx.fill();
        ctx.stroke();   
      }  
      worldToScreenPoint(map, x, y) {
        let camera = Camera.getMainCamera();
        return {
          x: (map.tileWidth * x) - camera.viewport.x,
          y: (map.tileHeight * y) - camera.viewport.y
        }
      }
      screenToWorldPoint(map, x, y) {
        let camera = Camera.getMainCamera();
        let mouse_y = y - camera.viewport.y;
        let mouse_x = x - camera.viewport.x;  
        return {
          x: Math.floor(mouse_x / map.tileWidth),
          y: Math.floor(mouse_y / map.tileHeight)
        };
      }    
    }
    
    class Map {
      constructor(type, width, height, tileWidth, tileHeight, renderer) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.children = []; // both layer and groups
        this.renderer = renderer;
        this.hoverVisible = false;
        this.itemId = 0;
      }
      static createIso(width, height) {    
        resetScale();
        Camera.getMainCamera()
          .setViewport(canvas.width/2-48, canvas.height/2-((48*height)/2));
        return new Map("iso", width, height, 96, 48, new IsometricMapRenderer());
      }
      static create(width, height) {   
        resetScale();
        Camera.getMainCamera()
          .setViewport(canvas.width/2-((32*width)/2), canvas.height/2-((32*height)/2));
        return new Map("top", width, height, 32, 32, new MapRenderer());
      }
      draw() {    
        this.renderer.draw(this);
      }
      getHoverTile() {
        return this.renderer.screenToWorldPoint(this, mouse.x/ ctxScaleX, mouse.y/ ctxScaleY);
      }
      clone(item) {
        if (!item.type) { // check if the property: type exists, it should only exist on layers
          alert("Groups cannot be cloned yet.");
          return; // we can't clone groups right now
        }
        
        let newLayer = this.createLayer(item.parent);
        newLayer.name = item.name;
        newLayer.type = item.type;
        return newLayer;
      }
      
      createLayer(parent) {
        let layer = new MapLayer(this.type, ++this.itemId, "New layer", "normal", this.width, this.height);
        layer.properties = {};
        if (parent) {      
          layer.parent = parent;
          parent.children.push(layer);
        } else {
          this.children.push(layer);
          layer.parent = this;
        }    
        return layer;
      }  
      createGroup(parent) {
        let group = new MapLayerGroup(++this.itemId, "New group");
        if (parent) {
          group.parent = parent;
          parent.children.push(group);
        } else {
          this.children.push(group);
          group.parent = this;
        }    
        return group;    
      }
    }
    
    class MapLayerGroup {
      constructor(id, name) {
        this.name = name;
        this.id = id;
        this.children = [];
        this.visible = true;
        this.parent = undefined;
      }
    }
    
    class MapLayerTile {
      constructor(id, tileset) {
        this.id = id;
        this.tileset = tileset;
      }
      static empty() {
        return new MapLayerTile(-1, -1);
      }
    }
    
    class MapLayer {
      constructor(mapType, id, name, layerType, width, height) {
        this.name = name;
        this.id = id;
        this.type = layerType;
        this.width = width;
        this.height = height;
        this.visible = true;
        this.parent = undefined;    
        this.tileData   = [];
        for (let y = 0; y < height; ++y)
        {if (window.CP.shouldStopExecution(18)){break;}for (let x = 0; x < width;  ++x)
          {if (window.CP.shouldStopExecution(17)){break;}this.tileData[y * width + x] = MapLayerTile.empty();
    window.CP.exitedLoop(17);
    }}
    window.CP.exitedLoop(18);
    
        this.properties = mapType === "iso" 
          ? this.createIsoProperties() 
          : this.createStandardProperties();
      } 
      
      createIsoProperties() {
        return {
          heightLevel: 0,
          block: false,
        };
      }
      
      createStandardProperties() {
        return {
          block: false      
        };
      }  
    }
    
    class FillTool {
      constructor() {
        this.stackSize = 16777216; //avoid possible overflow exception
        this.stackptr = 0;
        this.stack = [];
        this.h = 0;
        this.w = 0;
        this.mouseWasDown=false;
      }
      
      update() {
        if (isGroupSelected()) return;
        if (!mouse.leftButton && this.mouseWasDown) {
          this.mouseWasDown = false;
          this.w = map.width;
          this.h = map.height;
          let camera = Camera.getMainCamera();
          // todo: 
          // this.floodFill(
          //    selectedTreeItem, x, y, 
          //    selectedTile.id, 
          //    layer.tileData[this.getIndex(x, y)].id);      
        }
        if (mouse.leftButton) {
          this.mouseWasDown = true;
        }
      }
      
      floodFill(layer, x, y, newTile, oldTile) {
        if (newTile === oldTile) return;
        this.emptyStack();
        var x1, spanAbove, spanBelow, val, index;
        if (this.push(x, y) === undefined) return;
        while ((val = this.pop()) !== undefined) {if (window.CP.shouldStopExecution(21)){break;}
          x1=val.x;
          while (x1>=0&&layer.tileData[this.getIndex(x1, y)].id==oldTile){if (window.CP.shouldStopExecution(19)){break;}x1--;}
    window.CP.exitedLoop(19);
    
          x1++; spanAbove=spanBelow=0;
          while(x1<this.w&&layer.tileData[this.getIndex(x1, y)].id==oldTile){if (window.CP.shouldStopExecution(20)){break;}
            layer.tileData[this.getIndex(x1, y)].type = newTile;
            if (!spanAbove&&y>0&&layer.tileData[this.getIndex(x1, y-1)].id==oldTile) {
              if(this.push(x1, y-1) === undefined) return;
              spanAbove=1;
            } else if(spanAbove&&y>0&&layer.tileData[this.getIndex(x1, y-1)].id!=oldTile) {
              spanAbove=0;
            } else if(!spanBelow&&y>h-1&&layer.tileData[this.getIndex(x1, y+1)].id==oldTile) {
              if(this.push(x1,y+1) === undefined) return;
              spanBelow=1;
            } else if(spanAbove&&y>0&&layer.tileData[this.getIndex(x1, y+1)].id!=oldTile) {
              spanBelow=0;
            }                
            x1++;
          }
    window.CP.exitedLoop(20);
    
        }
    window.CP.exitedLoop(21);
    
      }
                 
      getIndex(x,y) {
        return y * this.w + x;
     }
      
      pop() {
        if (this.stackptr > 0) {
          let p = this.stack[this.stackptr];
          let x = p / this.h;
          let y = p % this.h;
          this.stackptr--;
          return { x: x, y: y };
        }
        return undefined;
      }
      
      push(x, y) {
        if (this.stackptr < this.stackSize - 1) {
          this.stackptr++;
          this.stack[this.stackptr] = this.h * x + y;
          return true;
        }    
        return undefined;
      }
      
      emptyStack() {
        while(this.pop() !== undefined){if (window.CP.shouldStopExecution(22)){break;};}
    window.CP.exitedLoop(22);
    
      }
    }
    
    class MoveTool {
      constructor() {    
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.dragCameraStartY = 0;
        this.dragCameraStartX = 0;
      }
      update() {
        if (mouse.leftButton) {
          let camera = Camera.getMainCamera();
          if (!this.isDragging) {
            this.isDragging = true;
            this.dragStartX = mouse.x / ctxScaleX;
            this.dragStartY = mouse.y / ctxScaleY;
            this.dragCameraStartX = camera.viewport.x;
            this.dragCameraStartY = camera.viewport.y;        
          } else {
            camera.viewport.x = this.dragCameraStartX - (this.dragStartX - mouse.x / ctxScaleX);
            camera.viewport.y = this.dragCameraStartY - (this.dragStartY - mouse.y / ctxScaleY);        
          }
        } else {
          this.isDragging = false;
        }    
      }
    }
    
    class BrushTool {
      constructor() {    
      }
      update() {
        if (isGroupSelected()||!selectedTile||!selectedTileElement) return;    
        if (mouse.leftButton) { 
          let layer = selectedTreeItem;
          let brush = selectedTile;
          let tileStart = map.getHoverTile();            
          this.paint(layer, tileStart, brush, brushSize);      
        }
        // todo: add undo support?
      }  
      paint(layer, position, brush, size) {    
        if (!brush) return;
        if (position.x < 0 || position.y < 0 || position.x >= layer.width || position.y >= layer.height) 
          return;
        
        for(let y = 0; y < size; ++y)
        {if (window.CP.shouldStopExecution(24)){break;}for(let x = 0; x < size; ++x) {if (window.CP.shouldStopExecution(23)){break;}
          let idx = (position.y+y) * layer.width + (position.x+x);
          if (idx < layer.tileData.length) {
            let tile = layer.tileData[idx];
            tile.id = brush.id;
            tile.tileset = brush.tileset;
          }
        }
    window.CP.exitedLoop(23);
    }
    window.CP.exitedLoop(24);
          
      }
    }
    
    class EraserTool {
     constructor() {    
      }
      update() {
        if (isGroupSelected()||!selectedTile||!selectedTileElement) return;    
        if (mouse.leftButton) { 
          let layer = selectedTreeItem;
          let tileStart = map.getHoverTile();            
          this.clear(layer, tileStart, brushSize);      
        }
        // todo: add undo support?
      }  
      clear(layer, position, size) {
        if (position.x < 0 || position.y < 0 || position.x >= layer.width || position.y >= layer.height) 
          return;
        
        for(let y = 0; y < size; ++y)
        {if (window.CP.shouldStopExecution(26)){break;}for(let x = 0; x < size; ++x) {if (window.CP.shouldStopExecution(25)){break;}
          let idx = (position.y+y) * layer.width + (position.x+x);
          if (idx < layer.tileData.length) {
            let tile = layer.tileData[idx];
            tile.id = -1;
            tile.tileset = -1;
          }
        }
    window.CP.exitedLoop(26);
    
    window.CP.exitedLoop(25);
    }      
      }
    }
    
    class Tileset {
      constructor(id, type, width, height, tileWidth, tileHeight, src) {
        this.id = id;
        this.type = type;
        this.width = width;  // amount of tiles per row
        this.height = height;// amount of rows
        this.tileWidth=tileWidth;
        this.tileHeight = tileHeight;    
        this.tiles = []; // array of TilesetSource
        this.src = src;  // undefined if the source exists in the tiles:TilesetSource
      }
      getTile(id) {
        for(let i = 0; i < this.tiles.length; ++i) {if (window.CP.shouldStopExecution(27)){break;}
          if (this.tiles[i].id == id) return this.tiles[i];
        }
    window.CP.exitedLoop(27);
    
        return undefined;
      }
    }
    
    class TilesetSource {
      constructor(id, x, y, width, height, src) {
        this.id = id;   // used for identifying which tile it is when drawing
        this.src = src; // should only be defined if we have 1 tile per image
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
      }
    }