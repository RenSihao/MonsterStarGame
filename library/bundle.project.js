require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"game":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5f760hdGDJLSLgCSTpOGQXJ', 'game');
// scripts/game.js

cc.Class({
    'extends': cc.Component,

    properties: {

        //引用星星预制资源
        starPrefab: {
            'default': null,
            type: cc.Prefab
        },

        //星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,

        //地面节点，用于确定星星的生成高度
        ground: {
            'default': null,
            type: cc.Node
        },

        //player节点，用于获取人物弹跳高度和行为控制开关
        player: {
            'default': null,
            type: cc.Node
        }
    },

    onLoad: function onLoad() {

        //获取地平面的y轴坐标
        this.groundY = this.ground.y + this.ground.height / 2;

        //生成新的星星
        this.spawnNewStar();
    },

    spawnNewStar: function spawnNewStar() {

        //使用给定模板在场景中生成一个星星
        var newStar = cc.instantiate(this.starPrefab);

        //将新增的节点添加到Canvas节点下
        this.node.addChild(newStar);

        //给星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition);
    },

    getNewStarPosition: function getNewStarPosition() {

        var randX = 0;
        //根据地平面位置和主角跳跃高度，随机得到一个星星的y坐标
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('player').jumpHeight + 50;

        //根据屏幕宽度，随机得到一个星星的x坐标
        var maxX = this.node.width / 2;
        randX = cc.random0To1() * maxX;

        return cc.p(randX, randY);
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {}
});

cc._RFpop();
},{}],"player":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b0733iRPARPIoNdAnMir6rX', 'player');
// scripts/player.js

cc.Class({
    "extends": cc.Component,

    //属性
    properties: {
        //跳跃高度
        jumpHeight: 200,
        //跳跃持续时间
        jumpDuration: 0.5,
        //最大移动速度
        maxMoveSpeed: 400,
        //加速度
        accel: 1000
    },

    //跳跃动画
    setJumpAction: function setJumpAction() {
        //跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        //下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        //不断重复
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },

    //移动控制
    setInputControl: function setInputControl() {

        var self = this;

        //添加键盘事件监听
        cc.eventManager.addListener({

            event: cc.EventListener.KEYBOARD,

            //按键
            onKeyPressed: function onKeyPressed(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                        self.accLeft = true;
                        self.accRight = false;
                        break;
                    case cc.KEY.d:
                        self.accLeft = false;
                        self.accRight = true;
                        break;
                }
            },

            //松键
            onKeyReleased: function onKeyReleased(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                        self.accLeft = false;
                        break;
                    case cc.KEY.d:
                        self.accRight = false;
                        break;
                }
            }
        }, self.node);
    },

    //场景加载后立即启用
    onLoad: function onLoad() {

        //初始化跳跃
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        //加速度方向开关
        this.accLeft = false;
        this.accRight = false;

        //当前水平方向速度
        this.xSpeed = 0;

        //初始化键盘输入监听
        this.setInputControl();
    },

    //场景加载后每帧调用一次，一般是经常计算的或者需要及时更新的逻辑
    update: function update(dt) {
        //根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }

        //限制最大移动速度
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        //根据当前速度更新位置
        this.node.x += this.xSpeed * dt;

        //限制人物移动范围
        if (this.node.x < Math.min(0, this.groundX) || this.node.x > Math.max(0, this.groundX)) {
            this.node.x = 0;
        }
    }
});

cc._RFpop();
},{}],"star":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'adb54rW+XhCSppTuax7R7T5', 'star');
// scripts/star.js

cc.Class({
    "extends": cc.Component,

    properties: {
        //星星和人物之间的距离小于0即消失
        pickRadius: 0
    },

    onLoad: function onLoad() {},

    update: function update(dt) {}
});

cc._RFpop();
},{}]},{},["game","star","player"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9Db2Nvc0NyZWF0b3IuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL3NjcmlwdHMvZ2FtZS5qcyIsImFzc2V0cy9zY3JpcHRzL3BsYXllci5qcyIsImFzc2V0cy9zY3JpcHRzL3N0YXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzVmNzYwaGRHREpMU0xnQ1NUcE9HUVhKJywgJ2dhbWUnKTtcbi8vIHNjcmlwdHMvZ2FtZS5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgLy/lvJXnlKjmmJ/mmJ/pooTliLbotYTmupBcbiAgICAgICAgc3RhclByZWZhYjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/mmJ/mmJ/kuqfnlJ/lkI7mtojlpLHml7bpl7TnmoTpmo/mnLrojIPlm7RcbiAgICAgICAgbWF4U3RhckR1cmF0aW9uOiAwLFxuICAgICAgICBtaW5TdGFyRHVyYXRpb246IDAsXG5cbiAgICAgICAgLy/lnLDpnaLoioLngrnvvIznlKjkuo7noa7lrprmmJ/mmJ/nmoTnlJ/miJDpq5jluqZcbiAgICAgICAgZ3JvdW5kOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy9wbGF5ZXLoioLngrnvvIznlKjkuo7ojrflj5bkurrnianlvLnot7Ppq5jluqblkozooYzkuLrmjqfliLblvIDlhbNcbiAgICAgICAgcGxheWVyOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG5cbiAgICAgICAgLy/ojrflj5blnLDlubPpnaLnmoR56L205Z2Q5qCHXG4gICAgICAgIHRoaXMuZ3JvdW5kWSA9IHRoaXMuZ3JvdW5kLnkgKyB0aGlzLmdyb3VuZC5oZWlnaHQgLyAyO1xuXG4gICAgICAgIC8v55Sf5oiQ5paw55qE5pif5pifXG4gICAgICAgIHRoaXMuc3Bhd25OZXdTdGFyKCk7XG4gICAgfSxcblxuICAgIHNwYXduTmV3U3RhcjogZnVuY3Rpb24gc3Bhd25OZXdTdGFyKCkge1xuXG4gICAgICAgIC8v5L2/55So57uZ5a6a5qih5p2/5Zyo5Zy65pmv5Lit55Sf5oiQ5LiA5Liq5pif5pifXG4gICAgICAgIHZhciBuZXdTdGFyID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFyUHJlZmFiKTtcblxuICAgICAgICAvL+WwhuaWsOWinueahOiKgueCuea3u+WKoOWIsENhbnZhc+iKgueCueS4i1xuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobmV3U3Rhcik7XG5cbiAgICAgICAgLy/nu5nmmJ/mmJ/orr7nva7kuIDkuKrpmo/mnLrkvY3nva5cbiAgICAgICAgbmV3U3Rhci5zZXRQb3NpdGlvbih0aGlzLmdldE5ld1N0YXJQb3NpdGlvbik7XG4gICAgfSxcblxuICAgIGdldE5ld1N0YXJQb3NpdGlvbjogZnVuY3Rpb24gZ2V0TmV3U3RhclBvc2l0aW9uKCkge1xuXG4gICAgICAgIHZhciByYW5kWCA9IDA7XG4gICAgICAgIC8v5qC55o2u5Zyw5bmz6Z2i5L2N572u5ZKM5Li76KeS6Lez6LeD6auY5bqm77yM6ZqP5py65b6X5Yiw5LiA5Liq5pif5pif55qEeeWdkOagh1xuICAgICAgICB2YXIgcmFuZFkgPSB0aGlzLmdyb3VuZFkgKyBjYy5yYW5kb20wVG8xKCkgKiB0aGlzLnBsYXllci5nZXRDb21wb25lbnQoJ3BsYXllcicpLmp1bXBIZWlnaHQgKyA1MDtcblxuICAgICAgICAvL+agueaNruWxj+W5leWuveW6pu+8jOmaj+acuuW+l+WIsOS4gOS4quaYn+aYn+eahHjlnZDmoIdcbiAgICAgICAgdmFyIG1heFggPSB0aGlzLm5vZGUud2lkdGggLyAyO1xuICAgICAgICByYW5kWCA9IGNjLnJhbmRvbTBUbzEoKSAqIG1heFg7XG5cbiAgICAgICAgcmV0dXJuIGNjLnAocmFuZFgsIHJhbmRZKTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge31cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYjA3MzNpUlBBUlBJb05kQW5NaXI2clgnLCAncGxheWVyJyk7XG4vLyBzY3JpcHRzL3BsYXllci5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIC8v5bGe5oCnXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvL+i3s+i3g+mrmOW6plxuICAgICAgICBqdW1wSGVpZ2h0OiAyMDAsXG4gICAgICAgIC8v6Lez6LeD5oyB57ut5pe26Ze0XG4gICAgICAgIGp1bXBEdXJhdGlvbjogMC41LFxuICAgICAgICAvL+acgOWkp+enu+WKqOmAn+W6plxuICAgICAgICBtYXhNb3ZlU3BlZWQ6IDQwMCxcbiAgICAgICAgLy/liqDpgJ/luqZcbiAgICAgICAgYWNjZWw6IDEwMDBcbiAgICB9LFxuXG4gICAgLy/ot7Pot4PliqjnlLtcbiAgICBzZXRKdW1wQWN0aW9uOiBmdW5jdGlvbiBzZXRKdW1wQWN0aW9uKCkge1xuICAgICAgICAvL+i3s+i3g+S4iuWNh1xuICAgICAgICB2YXIganVtcFVwID0gY2MubW92ZUJ5KHRoaXMuanVtcER1cmF0aW9uLCBjYy5wKDAsIHRoaXMuanVtcEhlaWdodCkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSk7XG4gICAgICAgIC8v5LiL6JC9XG4gICAgICAgIHZhciBqdW1wRG93biA9IGNjLm1vdmVCeSh0aGlzLmp1bXBEdXJhdGlvbiwgY2MucCgwLCAtdGhpcy5qdW1wSGVpZ2h0KSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpO1xuICAgICAgICAvL+S4jeaWremHjeWkjVxuICAgICAgICByZXR1cm4gY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShqdW1wVXAsIGp1bXBEb3duKSk7XG4gICAgfSxcblxuICAgIC8v56e75Yqo5o6n5Yi2XG4gICAgc2V0SW5wdXRDb250cm9sOiBmdW5jdGlvbiBzZXRJbnB1dENvbnRyb2woKSB7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIC8v5re75Yqg6ZSu55uY5LqL5Lu255uR5ZCsXG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih7XG5cbiAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLktFWUJPQVJELFxuXG4gICAgICAgICAgICAvL+aMiemUrlxuICAgICAgICAgICAgb25LZXlQcmVzc2VkOiBmdW5jdGlvbiBvbktleVByZXNzZWQoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkuYTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjTGVmdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkuZDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjTGVmdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NSaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvL+advumUrlxuICAgICAgICAgICAgb25LZXlSZWxlYXNlZDogZnVuY3Rpb24gb25LZXlSZWxlYXNlZChrZXlDb2RlLCBldmVudCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoa2V5Q29kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5hOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NMZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkuZDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgc2VsZi5ub2RlKTtcbiAgICB9LFxuXG4gICAgLy/lnLrmma/liqDovb3lkI7nq4vljbPlkK/nlKhcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcblxuICAgICAgICAvL+WIneWni+WMlui3s+i3g1xuICAgICAgICB0aGlzLmp1bXBBY3Rpb24gPSB0aGlzLnNldEp1bXBBY3Rpb24oKTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbih0aGlzLmp1bXBBY3Rpb24pO1xuXG4gICAgICAgIC8v5Yqg6YCf5bqm5pa55ZCR5byA5YWzXG4gICAgICAgIHRoaXMuYWNjTGVmdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFjY1JpZ2h0ID0gZmFsc2U7XG5cbiAgICAgICAgLy/lvZPliY3msLTlubPmlrnlkJHpgJ/luqZcbiAgICAgICAgdGhpcy54U3BlZWQgPSAwO1xuXG4gICAgICAgIC8v5Yid5aeL5YyW6ZSu55uY6L6T5YWl55uR5ZCsXG4gICAgICAgIHRoaXMuc2V0SW5wdXRDb250cm9sKCk7XG4gICAgfSxcblxuICAgIC8v5Zy65pmv5Yqg6L295ZCO5q+P5bin6LCD55So5LiA5qyh77yM5LiA6Iis5piv57uP5bi46K6h566X55qE5oiW6ICF6ZyA6KaB5Y+K5pe25pu05paw55qE6YC76L6RXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgLy/moLnmja7lvZPliY3liqDpgJ/luqbmlrnlkJHmr4/luKfmm7TmlrDpgJ/luqZcbiAgICAgICAgaWYgKHRoaXMuYWNjTGVmdCkge1xuICAgICAgICAgICAgdGhpcy54U3BlZWQgLT0gdGhpcy5hY2NlbCAqIGR0O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWNjUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMueFNwZWVkICs9IHRoaXMuYWNjZWwgKiBkdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v6ZmQ5Yi25pyA5aSn56e75Yqo6YCf5bqmXG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnhTcGVlZCkgPiB0aGlzLm1heE1vdmVTcGVlZCkge1xuICAgICAgICAgICAgdGhpcy54U3BlZWQgPSB0aGlzLm1heE1vdmVTcGVlZCAqIHRoaXMueFNwZWVkIC8gTWF0aC5hYnModGhpcy54U3BlZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/moLnmja7lvZPliY3pgJ/luqbmm7TmlrDkvY3nva5cbiAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy54U3BlZWQgKiBkdDtcblxuICAgICAgICAvL+mZkOWItuS6uueJqeenu+WKqOiMg+WbtFxuICAgICAgICBpZiAodGhpcy5ub2RlLnggPCBNYXRoLm1pbigwLCB0aGlzLmdyb3VuZFgpIHx8IHRoaXMubm9kZS54ID4gTWF0aC5tYXgoMCwgdGhpcy5ncm91bmRYKSkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnggPSAwO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdhZGI1NHJXK1hoQ1NwcFR1YXg3UjdUNScsICdzdGFyJyk7XG4vLyBzY3JpcHRzL3N0YXIuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8v5pif5pif5ZKM5Lq654mp5LmL6Ze055qE6Led56a75bCP5LqOMOWNs+a2iOWksVxuICAgICAgICBwaWNrUmFkaXVzOiAwXG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge31cbn0pO1xuXG5jYy5fUkZwb3AoKTsiXX0=
