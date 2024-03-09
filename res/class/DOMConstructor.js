class DOMForumList {
    constructor() {}

    static item(item) {
        const icons = {
            up: 'check',
            down: 'close',
            failure: 'alert',
            unknow: 'help'
        }
        let icon = '';
        if (icons[item.state] == undefined) {
            icon = icons.unknow;
        } else {
            icon = icons[item.state];
        }

        const stateName = {
            up: '正常运行',
            down: '停摆',
            failure: '存在故障或访问困难',
            unknow: '未知'
        }

        item = {
            title: "未命名",
            url: "https://www.example.com/",
            state: "unknow",
            createdAt: "1970/01/01",
            updatedAt: "1970/01/01",
            hasICP: "no",
            hasNetSec: "no",
            note: "",
            reference: [],
            ...item
        }

        let url = new URL(item.url);
        return `<div class="forum-item forum-state-${item.state}">
            <div class="forum-item-bg">
                <div class="forum-item-bg-2"></div>
            </div>
            <div class="forum-item-header">
                <div class="state-box" title="${stateName[item.state]}">
                    <div class="state-icon">${Icon[icon]()}</div>
                </div>
                <div class="title-box">
                    <div class="title">${item.title}</div>
                    <div class="url">${url.host}</div>
                </div>
                <div class="time-box">
                    <div class="date-icon-text created-at" title="网站创建时间">${Icon.flag()} ${item.createdAt}</div>
                    <div class="date-icon-text updated-at" title="最后更新时间">${Icon.clockEditOutline()} ${item.updatedAt}</div>
                </div>
                <div class="action-box">
                    <a href="${item.url}" target="_blank">访问网站 ${Icon.openInNew()}</a>
                </div>
            </div>
            <div class="forum-item-content">
                <div class="icp-line">
                    <div class="icp-line-item icp">
                        <div class="attr-label">ICP 备案</div>
                        <div class="value">${DOMForumList.icpState(item.hasICP)}</div>
                    </div>
                    <div class="icp-line-item net-sec">
                        <div class="attr-label">网安备案</div>
                        <div class="value">${DOMForumList.icpState(item.hasNetSec)}</div>
                    </div>
                </div>
                ${ DOMForumList.noteBox(item.note) }
                ${ DOMForumList.referenceBox(item.reference) }
            </div>
        </div>`;
    }

    static list(items = []) {
        let dom = '';
        items = items.sort((a, b) => {
            let da = new Date(a.createdAt).getTime();
            let db = new Date(b.createdAt).getTime();
            return da - db;
        });
        items.forEach(e => {
            dom += DOMForumList.item(e);
        });
        return dom;
    }

    static itemEx(item) {
        item = {
            title: "未命名",
            url: "https://www.example.com/",
            archiveUrl: "",
            updatedAt: "1970/01/01",
            note: "",
            reference: [],
            ...item,
        }

        let url = new URL(item.url);
        return `<div class="forum-item forum-state-unknow">
            <div class="forum-item-bg">
                <div class="forum-item-bg-2"></div>
            </div>
            <div class="forum-item-header">
                <div class="state-box">
                    <div class="state-icon">${Icon.nuke()}</div>
                </div>
                <div class="title-box">
                    <div class="title">${item.title}</div>
                    <div class="url">${url.host}</div>
                </div>
                <div class="time-box">
                    <div class="date-icon-text updated-at" title="最后更新时间">${Icon.clockEditOutline()} ${item.updatedAt}</div>
                </div>
                <div class="action-box">
                    <a href="${item.url}" target="_blank">访问网站 ${Icon.openInNew()}</a>
                </div>
            </div>
            <div class="forum-item-content">
                ${ DOMForumList.archiveUrlBox(item.archiveUrl) }
                ${ DOMForumList.noteBox(item.note) }
                ${ DOMForumList.referenceBox(item.reference) }
            </div>
        </div>`;
    }

    static listEx(items = []) {
        let dom = '';
        items.forEach(e => {
            dom += DOMForumList.itemEx(e);
        });
        return dom;
    }

    static noteBox(value) {
        if (value === "") value = "（空）";
        return `<div class="note">
            <div class="attr-label">备注</div>
            <div class="attr-value">${value}</div>
        </div>`;
    }

    static archiveUrlBox(value) {
        if (value === "") return '';
        return `<div class="archive-url">
            <div class="attr-label">网页存档</div>
            <div class="attr-value">
                <a href="${value}" target="_blank">查看网页存档 ${Icon.openInNew()}</a>
            </div>
        </div>`;
    }

    static referenceBox(value) {
        if (!Array.isArray(value) || value.length <= 0) return '';
        return `<div class="reference">
            <div class="attr-label">参考资料</div>
            <div class="attr-value">
                ${ DOMForumList.referenceList(value) }
            </div>
        </div>`;
    }

    static referenceList(referenceItems) {
        if (!Array.isArray(referenceItems) || referenceItems.length <= 0) return '';
        let dom = '<ol>';
        referenceItems.forEach(e => {
            dom += DOMForumList.reference(e);
        });
        return dom + '</ol>';
    }

    static reference(referenceItem) {
        return `<li>${referenceItem.title}<br><a class="reference-link" href="${referenceItem.url}" target="_blank">${referenceItem.url}</a></li>`;
    }

    static icpState(value) {
        const icons = {
            yes: 'checkCircle',
            no: 'closeCircle',
            in_progress: 'progressClock'
        }
        const label = {
            yes: '已备案',
            no: '未备案',
            in_progress: '备案中'
        }

        return `<span class="icp-state icp-state-${value}">${Icon[icons[value]]()} ${label[value]}</span>`;
    }
}