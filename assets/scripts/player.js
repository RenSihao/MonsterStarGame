cc.Class({
    extends: cc.Component,

    //属性
    properties: {
        //跳跃高度
        jumpHeight: 200,
        //跳跃持续时间
        jumpDuration: 0.5,
        //最大移动速度
        maxMoveSpeed: 400,
        //加速度
        accel: 1000,
    },
    
    //跳跃动画
    setJumpAction: function() {
        //跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        //下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        //不断重复
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },
    
    //移动控制
    setInputControl: function() {
        
        var self = this;
        
        //添加键盘事件监听
        cc.eventManager.addListener({
            
            event:cc.EventListener.KEYBOARD,
            
            //按键
            onKeyPressed: function(keyCode, event) {
                switch(keyCode) {
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
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
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
    onLoad: function () {
        
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
    update: function (dt) {
        //根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel*dt;
        }
        else if (this.accRight) {
            this.xSpeed += this.accel*dt;
        }
        
        //限制最大移动速度
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed)
        }
        
        //根据当前速度更新位置
        this.node.x += this.xSpeed*dt;
        
        //限制人物移动范围
        if (this.node.x < Math.min(0,this.groundX) || this.node.x > Math.max(0,this.groundX)) {
            this.node.x = 0;
        }
        
    },
});




