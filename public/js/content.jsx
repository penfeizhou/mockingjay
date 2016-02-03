var data = [];

var indexOf = function (obj) {
    if (!obj) {
        return -1;
    }
    for (var i = 0; i < data.length; i++) {
        if (obj.uuid && obj.uuid == data[i].uuid) {
            return i;
        }
    }
    return -1;
};
function update(obj) {
    if (obj) {
        var index = indexOf(obj);
        if (index < 0) {
            data.push(obj);
        } else {
            data.splice(index, 1, obj);
        }
    }
    React.render(
        <List/>,
        document.getElementById('left')
    );
}

function selected(obj) {
    React.render(
        <div>
            <Category className='category-url' label={'Url:'} value={obj.url}/>
            <Category className='category-req-header' label={'Request Headers:'}
                      value={JSON.stringify(obj.requestHeaders)}/>
            <Category className='category-res-header' label={'Response Headers:'}
                      value={JSON.stringify(obj.responsHeaders)}/>
            <Category className='category-res-body' label={'Response body:'} value={obj.data}/>
        </div>,
        document.getElementById('right')
    );
    var text = document.getElementsByClassName("category-value");
    for (var i = 0; i < text.length; i++) {
        autoTextarea(text[i], 400);
    }
}

var autoTextarea = function (elem, maxHeight) {
    var addEvent = function (type, callback) {
            elem.addEventListener ?
                elem.addEventListener(type, callback, false) :
                elem.attachEvent('on' + type, callback);
        },
        getStyle = elem.currentStyle ? function (name) {
            var val = elem.currentStyle[name];

            if (name === 'height' && val.search(/px/i) !== 1) {
                var rect = elem.getBoundingClientRect();
                return rect.bottom - rect.top -
                    parseFloat(getStyle('paddingTop')) -
                    parseFloat(getStyle('paddingBottom')) + 'px';
            }
            return val;
        } : function (name) {
            return getComputedStyle(elem, null)[name];
        },
        minHeight = parseFloat(getStyle('height'));
    elem.style.resize = 'none';
    var change = function () {
        var scrollTop, height,
            padding = 0,
            style = elem.style;
        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            }
            style.height = height + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        }
    };
    addEvent('input', change);
    addEvent('focus', change);
    change();
};

function clearData() {
    if (data) {
        data.length = 0;
    }
    if (update) {
        update();
    }
}

React.render(
    <div>
        <h1>Mocking Joy</h1>
        <a id='clear'>Clear</a>
    </div>,
    document.getElementById('toolbar')
);

document.getElementById("clear").addEventListener("click", clearData);