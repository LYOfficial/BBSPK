# 新兴我的世界论坛晋级赛
![](https://img.shields.io/badge/license-CC--BY--SA--4.0-green) ![](https://img.shields.io/github/stars/LYOfficial/BBSPK) [![Page Views Count](https://badges.toozhao.com/badges/01HQQVTKDKVBPNJRYX9B8VEF3E/green.svg)](https://badges.toozhao.com/stats/01HQQVTKDKVBPNJRYX9B8VEF3E)

**欢迎点击 “Star” 按钮来支持我们的编写。**

**前情提要：我的世界中文论坛 [MCBBS](https://www.mcbbs.net) 仍在关站中，近期出现许多新兴我的世界论坛，在此列出目前可见的我的世界中文论坛，旁观晋级赛现状。**

本项目展示的网站内容均收集自互联网，不代表参与本项目的任何个人或组织的观点。

欢迎各位对此项目做出贡献！教程可在下方查看，Fork 后进行修改 **（虽然会自动排序，但为了方便维护请自觉按照建站时间排序）** ，感谢每一位贡献者的 PR！如果有网站宣传资料等参考资料，请务必添加，谢谢！

**注意：请确保您 Fork 的仓库为最新，可通过自己仓库页面的【Sync fork】更新后再提交 PR！旧版仓库的合并会带来很多麻烦，感谢您的支持！**

## 贡献教程

**您需要拥有一个 GitHub 账号！**

1. [点击这里 Fork 此仓库](https://github.com/LYOfficial/BBSPK/fork)。
2. 在您 Fork 的仓库内进行修改。
3. 点击顶部【Pull requests】— 右上角【New pull request】—【Create pull request】。
4. 合并到 `dev` 分支，填写标题和描述，说明您做了什么修改。
5. 等待此项目所有者 [@LYOfficial](https://github.com/LYOfficial) 和项目管理员 [@sheep-realms](https://github.com/sheep-realms) 通过审核。

### 如何更改数据？

在仓库中找到 [res/data/forums.js](res/data/forums.js) 脚本文件，可以在里面找到 `db_forums`（晋级赛选手） 和 `db_forums_ex`（表演赛选手） 数组数据。

**增加新数据时，不要忘了每条数据之间的英文逗号分隔符！**

对于 `db_forums`（晋级赛选手），对象有以下属性：

| 属性键名称 | 属性值类型 | 相关描述 |
| - | - | - |
| `title` | String | 网站名称。 |
| `url` | String | 网站 URL 地址。 |
| `state` | String | 网站状态：<br>`up` - 正常运行<br>`down` - 停摆<br>`failure` - 存在故障或访问困难<br>`close` - 已宣布关闭或不再提供论坛服务<br>`unknow` - 未知 |
| `createdAt` | String | 网站创建时间，格式为 `yyyy/MM/dd`。<br>请勿填写 “未知” 等其他格式的数据，未知请填写更新时间并在备注中注明。 |
| `closedAt` | String | 网站关闭时间，格式同上，仅在 `state` 值为 `close` 时显示，可不填。 |
| `updatedAt` | String | 最后更新时间，格式同上。 |
| `hasICP` | String | 是否 ICP 备案：<br>`yes` - 已备案<br>`no` - 未备案<br>`in_progress` - 备案中 |
| `hasNetSec` | String | 是否网安备案，同上。 |
| `note` | String | 备注。 |
| `reference` | Array | 参考资料，见下文。 |

`reference` 是一个数组。其中，对象有以下属性：

| 属性键名称 | 属性值类型 | 相关描述 |
| - | - | - |
| `title` | String | 参考资料标题。 |
| `url` | String | 参考资料 URL 地址。 |

示例如下：

``` js
{
    title: "MCBBS",
    url: "https://www.mcbbs.net",
    state: "unknow",
    createdAt: "2010/10/30",
    updatedAt: "2024/03/06",
    hasICP: "yes",
    hasNetSec: "yes",
    note: "直属B站的我的世界中文论坛。",
    reference: [
        {
            title: "这是第一条参考资料",
            url: "https://www.mcbbs.net"
        },
        {
            title: "这是第二条参考资料",
            url: "https://www.mcbbs.net"
        }
    ]
}
```

对于 `db_forums_ex`（表演赛选手），对象有以下属性：

| 属性键名称 | 属性值类型 | 相关描述 |
| - | - | - |
| `title` | String | 网站名称。 |
| `url` | String | 网站 URL 地址。 |
| `archiveUrl` | String | 可选。网站的网页存档 URL 地址。 |
| `updatedAt` | String | 最后更新时间，格式为 `yyyy/MM/dd`。 |
| `note` | String | 备注。 |
| `reference` | Array | 参考资料，见上文。 |

示例如下：

``` js
{
    title: "回来吧 MCBBS",
    url: "http://mcbbs.win",
    archiveUrl: "https://web.archive.org/web/20240302042136/http://mcbbs.win/",
    updatedAt: "2024/03/06",
    note: "真诚祷告。",
    reference: []
}
```

## 统计信息

### 贡献者

[![Contrib](https://contrib.rocks/image?repo=LYOfficial/BBSPK)](https://github.com/LYOfficial/BBSPK/graphs/contributors)

### 星星历史图

[![Stargazers over time](https://starchart.cc/LYOfficial/BBSPK.svg?variant=adaptive)](https://starchart.cc/LYOfficial/BBSPK)
