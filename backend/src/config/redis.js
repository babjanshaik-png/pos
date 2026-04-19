const Redis = require('ioredis');

let redis;

try {
  redis = new Redis({
    host: '127.0.0.1',
    port: 6379,
    retryStrategy: () => null // ❌ stop retry loop
  });

  redis.on('connect', () => {
    console.log("Redis connected");
  });

  redis.on('error', () => {
    console.log("Redis not running, disabling...");
    redis.disconnect();
  });

} catch (e) {
  console.log("Redis init failed");
}

module.exports = redis;