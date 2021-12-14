const { ShardingManager } = require('discord.js');

// Create your ShardingManger instance
const manager = new ShardingManager('./aura.js', {
    // for ShardingManager options see:
    // https://discord.js.org/#/docs/main/v12/class/ShardingManager
    totalShards: 1,
    token: process.env.token,
});

// Emitted when a shard is created
manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));

// Spawn your shards
manager.spawn();
