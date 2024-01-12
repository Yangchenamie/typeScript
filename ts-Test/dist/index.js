//字典 Dictionaries    expire过期时间key    permanent永久不过期
var Dictionaries;
(function (Dictionaries) {
    Dictionaries["expire"] = "__expire__";
    Dictionaries["permanent"] = "permanent";
})(Dictionaries || (Dictionaries = {}));

class Storage {
    //存储接受 key value 和过期时间 默认永久
    set(key, value, expire = Dictionaries.permanent) {
        const data = {
            value,
            [Dictionaries.expire]: expire
        };
        localStorage.setItem(key, JSON.stringify(data));
    }
    ;
    get(key) {
        const value = localStorage.getItem(key);
        // 判断读出来得值是否有效
        if (value) {
            const obj = JSON.parse(value);
            const now = new Date().getTime();
            //  有效并且是数组类型 并且过期 进行删除和提示
            if (typeof obj[Dictionaries.expire] == 'number' && obj[Dictionaries.expire] < now) {
                this.remove(key);
                return {
                    message: `您的key值${key}已过期`,
                    value: null
                };
            }
            else {
                return {
                    message: "成功读取",
                    value: obj.value
                };
            }
        }
        else {
            console.log('key值无效');
            return {
                message: "key值无效",
                value: null
            };
        }
    }
    // 删除某一项
    remove(key) {
        localStorage.removeItem(key);
    }
    // 清空所有值
    clear() {
        localStorage.clear();
    }
    ;
}

export { Storage };
