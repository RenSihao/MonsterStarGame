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