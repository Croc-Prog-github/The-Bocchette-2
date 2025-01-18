import redis from 'redis';
import { promisify } from 'util';

class RedisPresence {
    sub;
    pub;
    subscriptions = {};
    subscribeAsync;
    unsubscribeAsync;
    publishAsync;
    smembersAsync;
    sismemberAsync;
    hgetAsync;
    hlenAsync;
    pubsubAsync;
    incrAsync;
    decrAsync;
    constructor(opts) {
        this.sub = redis.createClient(opts);
        this.pub = redis.createClient(opts);
        // no listener limit
        this.sub.setMaxListeners(0);
        // create promisified pub/sub methods.
        this.subscribeAsync = promisify(this.sub.subscribe).bind(this.sub);
        this.unsubscribeAsync = promisify(this.sub.unsubscribe).bind(this.sub);
        this.publishAsync = promisify(this.pub.publish).bind(this.pub);
        // create promisified redis methods.
        this.smembersAsync = promisify(this.pub.smembers).bind(this.pub);
        this.sismemberAsync = promisify(this.pub.sismember).bind(this.pub);
        this.hgetAsync = promisify(this.pub.hget).bind(this.pub);
        this.hlenAsync = promisify(this.pub.hlen).bind(this.pub);
        this.pubsubAsync = promisify(this.pub.pubsub).bind(this.pub);
        this.incrAsync = promisify(this.pub.incr).bind(this.pub);
        this.decrAsync = promisify(this.pub.decr).bind(this.pub);
    }
    async subscribe(topic, callback) {
        if (!this.subscriptions[topic]) {
            this.subscriptions[topic] = [];
        }
        this.subscriptions[topic].push(callback);
        if (this.sub.listeners('message').length === 0) {
            this.sub.addListener('message', this.handleSubscription);
        }
        await this.subscribeAsync(topic);
        return this;
    }
    async unsubscribe(topic, callback) {
        const topicCallbacks = this.subscriptions[topic];
        if (!topicCallbacks) {
            return;
        }
        if (callback) {
            const index = topicCallbacks.indexOf(callback);
            topicCallbacks.splice(index, 1);
        }
        else {
            this.subscriptions[topic] = [];
        }
        if (this.subscriptions[topic].length === 0) {
            delete this.subscriptions[topic];
            await this.unsubscribeAsync(topic);
        }
        return this;
    }
    async publish(topic, data) {
        if (data === undefined) {
            data = false;
        }
        await this.publishAsync(topic, JSON.stringify(data));
    }
    async exists(roomId) {
        return (await this.pubsubAsync('channels', roomId)).length > 0;
    }
    async setex(key, value, seconds) {
        return new Promise((resolve) => this.pub.setex(key, seconds, value, resolve));
    }
    async get(key) {
        return new Promise((resolve, reject) => {
            this.pub.get(key, (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    }
    async del(roomId) {
        return new Promise((resolve) => {
            this.pub.del(roomId, resolve);
        });
    }
    async sadd(key, value) {
        return new Promise((resolve) => {
            this.pub.sadd(key, value, resolve);
        });
    }
    async smembers(key) {
        return await this.smembersAsync(key);
    }
    async sismember(key, field) {
        return await this.sismemberAsync(key, field);
    }
    async srem(key, value) {
        return new Promise((resolve) => {
            this.pub.srem(key, value, resolve);
        });
    }
    async scard(key) {
        return new Promise((resolve, reject) => {
            this.pub.scard(key, (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    }
    async sinter(...keys) {
        return new Promise((resolve, reject) => {
            this.pub.sinter(...keys, (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    }
    async hset(key, field, value) {
        return new Promise((resolve) => {
            this.pub.hset(key, field, value, resolve);
        });
    }
    async hincrby(key, field, value) {
        return new Promise((resolve, reject) => {
            this.pub.hincrby(key, field, value, (err, result) => {
                if (err)
                    return reject(err);
                resolve(result);
            });
        });
    }
    async hget(key, field) {
        return await this.hgetAsync(key, field);
    }
    async hgetall(key) {
        return new Promise((resolve, reject) => {
            this.pub.hgetall(key, (err, values) => {
                if (err) {
                    return reject(err);
                }
                resolve(values);
            });
        });
    }
    async hdel(key, field) {
        return new Promise((resolve, reject) => {
            this.pub.hdel(key, field, (err, ok) => {
                if (err) {
                    return reject(err);
                }
                resolve(ok);
            });
        });
    }
    async hlen(key) {
        return await this.hlenAsync(key);
    }
    async incr(key) {
        return await this.incrAsync(key);
    }
    async decr(key) {
        return await this.decrAsync(key);
    }
    shutdown() {
        this.sub.quit();
        this.pub.quit();
    }
    handleSubscription = (channel, message) => {
        if (this.subscriptions[channel]) {
            for (let i = 0, l = this.subscriptions[channel].length; i < l; i++) {
                this.subscriptions[channel][i](JSON.parse(message));
            }
        }
    };
}

export { RedisPresence };
//# sourceMappingURL=index.mjs.map
