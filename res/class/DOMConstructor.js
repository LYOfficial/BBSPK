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
            url: "https://www.example.com",
            state: "unknow",
            createdAt: "1970/01/01",
            updatedAt: "1970/01/01",
            hasICP: "no",
            hasNetSec: "no",
            note: "",
            reference: [],
            __domID: undefined,
            __domClass: undefined,
            ...item
        }

        let url;
        try {
            url = new URL(item.url);
        } catch (error) {
            url = {
                host: item.url
            }
        }
        return `<div class="forum-item forum-state-${item.state} ${ item?.__domClass ? item.__domClass : '' }"${ item?.__domID ? ` id="${item.__domID}"` : '' }>
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
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer">访问网站 ${Icon.openInNew()}</a>
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

    static list(items = [], target = '') {
        let dom = DOMForumList.listHeader(items, target);
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
            url: "https://www.example.com",
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
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer">访问网站 ${Icon.openInNew()}</a>
                </div>
            </div>
            <div class="forum-item-content">
                ${ DOMForumList.archiveUrlBox(item.archiveUrl) }
                ${ DOMForumList.noteBox(item.note) }
                ${ DOMForumList.referenceBox(item.reference) }
            </div>
        </div>`;
    }

    static listEx(items = [], target = '') {
        let dom = DOMForumList.listHeaderEx(items, target);
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
                <a href="${value}" target="_blank" rel="noopener noreferrer">查看网页存档 ${Icon.openInNew()}</a>
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
        const medianRow = 2;
        referenceItems.forEach((e, index) => {
            dom += DOMForumList.reference(e);
            if (index + 1 == medianRow && referenceItems.length > medianRow) dom += `</ol><details><summary> 查看更多....</summary><ol class="reference-more" start="${medianRow + 1}">`;
        });
        return dom + '</ol>';
    }

    static reference(referenceItem) {
        return `<li>${referenceItem.title}<br><a class="reference-link" href="${referenceItem.url}" target="_blank" rel="noopener noreferrer">${referenceItem.url}</a></li>`;
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

    static listHeader(items = [], target = '') {
        let totalCount    = items.length,
            survivalCount = items.filter((e) => {
                return e.state == 'up' || e.state == 'failure';
            }).length,
            upCount       = items.filter((e) => {
                return e.state == 'up';
            }).length,
            failureCount  = items.filter((e) => {
                return e.state == 'failure';
            }).length,
            downCount     = items.filter((e) => {
                return e.state == 'down';
            }).length,
            unknowCount   = items.filter((e) => {
                return e.state == 'unknow';
            }).length;

        return `<div class="forum-list-header">
            <div class="forum-count">
                <span class="forum-count-item now survival"><span class="forum-count-value">${survivalCount}</span></span>
                <span class="forum-count-item total">/<span class="forum-count-value">${totalCount}</span></span>
            </div>
            <div class="forum-count-title">存活 / 总数</div>
            <div class="forum-count-more">
                <span class="forum-count-item up">正常<span class="forum-count-value">${upCount}</span></span>
                <span class="forum-count-item failure">故障<span class="forum-count-value">${failureCount}</span></span>
                <span class="forum-count-item down">淘汰<span class="forum-count-value">${downCount}</span></span>
                <span class="forum-count-item unknow">未知<span class="forum-count-value">${unknowCount}</span></span>
            </div>
            <div class="forum-controller">
                <div class="list-controller">
                    <span class="list-controller-item open" data-target="${target}">全部展开</span>
                    <span class="list-controller-item close" data-target="${target}">全部收起</span>
                </div>
            </div>
        </div>`;
    }

    static listHeaderEx(items = [], target = '') {
        let totalCount    = items.length;

        return `<div class="forum-list-header">
            <div class="forum-count">
                <span class="forum-count-item now"><span class="forum-count-value">${totalCount}</span></span>
            </div>
            <div class="forum-count-title">总数</div>
            <div class="forum-list-description article">
            <p>这些网站之所以列在这里通常是因为其本身不具有论坛性质、依赖于农场建立或纯粹为了节目效果而建立，无法参与晋级赛。这些网站可能随时关闭，请贡献者注意对网页进行存档。</p>
            </div>
            <div class="forum-controller">
                <div class="list-controller">
                    <span class="list-controller-item open" data-target="${target}">全部展开</span>
                    <span class="list-controller-item close" data-target="${target}">全部收起</span>
                </div>
            </div>
        </div>`;
    }
}
