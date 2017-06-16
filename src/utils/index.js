export function isPromise(value) {
    if (value !== null && typeof value === 'object') {
        return value.promise && typeof value.promise.then === 'function';
    }
}

export function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

export var appMenu = [
    {
        key: 'pages1',
        name: 'Pages1',
        icon: 'user',
        child: [
            {
                name: 'Home',
                key: 'home'
            },
            {
                name: 'Form',
                key: 'form'
            }
        ]
    },
    {
        key: 'pages2',
        name: 'Pages2',
        icon: 'laptop',
        child: [
            {
                name: 'Table',
                key: 'table'
            },
            {
                name: '选项2',
                key: 'card'
            }
        ]
    },
    {
        key: 'my',
        name: '我的',
        icon: 'smile-o'
    }
]
