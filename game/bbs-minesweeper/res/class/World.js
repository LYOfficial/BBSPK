class World {
    constructor() {
        this.name         = 'world';
        this.size         = {
            height: 5,
            width:  5,
            stage:  1
        };
        this.room         = [];
        this.selectedRoom = 0;
        this.player       = undefined;
    }

    /**
     * 创建世界
     * @param {Generator} generator 生成器
     */
    create(generator) {
        this.room[0] = new Room(generator);
    }

    /**
     * 探索方块
     * @param {Number} room 房间索引
     * @param {Number} stage 楼层索引
     * @param {Number} y Y轴
     * @param {Number} x X轴
     * @returns {Object} 探索结果
     */
    search(room, stage, y, x) {
        return this.room[room].search(stage, y, x);
    }

    /**
     * 玩家移动到指定位置
     * @param {Number} room 房间索引
     * @param {Number} stage 楼层索引
     * @param {Number} y Y轴
     * @param {Number} x X轴
     * @returns {Object} 移动结果
     */
    goto(room, stage, y, x) {
        return this.room[room].goto(stage, y, x);
    }

    /**
     * 加入玩家
     * @param {Player} player 玩家
     */
    playerJoin(player) {
        this.player = player;
    }

    /**
     * 切换楼层
     * @param {Number} stage 楼层索引
     * @returns {Number} 楼层索引
     */
    switchStage(stage) {
        return this.room[this.selectedRoom].switchStage(stage);
    }

    /**
     * 设置方块
     * @param {Number} room 房间索引
     * @param {Number} stage 楼层索引
     * @param {Number} y Y轴
     * @param {Number} x X轴
     * @param {String} id 方块ID
     * @param {Object} data 方块数据
     * @returns {Object} 修改后的方块
     */
    setBlock(room, stage, y, x, id, data = undefined) {
        return this.room[room].setBlock(stage, y, x, id, data);
    }

    /**
     * 获取选中房间
     * @returns {Room} 房间
     */
    getSelectedRoom() {
        return this.room[this.selectedRoom];
    }
}