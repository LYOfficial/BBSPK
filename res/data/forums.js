// ============================================================
// 晋级赛选手
// ============================================================
const db_forums = [
    {
        title: "MCBBS",
        url: "https://www.mcbbs.net/",
        state: "unknow",
        createdAt: "2010/10/30",
        updatedAt: "2024/03/06",
        hasICP: "yes",
        hasNetSec: "yes",
        note: "直属B站的我的世界中文论坛",
        reference: []
    },
    {
        title: "网易我的世界论坛",
        url: "https://mc.netease.com/",
        state: "up",
        createdAt: "2016/09/20",
        updatedAt: "2024/03/06",
        hasICP: "yes",
        hasNetSec: "yes",
        note: "网易论坛",
        reference: []
    },
    {
        title: "MineBBS",
        url: "https://www.minebbs.com/",
        state: "up",
        createdAt: "2018/03/16",
        updatedAt: "2024/03/06",
        hasICP: "yes",
        hasNetSec: "no",
        note: "主营基岩版，含有Java版",
        reference: []
    },
    {
        title: "九域资源社区",
        url: "https://bbs.mc9y.net/",
        state: "up",
        createdAt: "2019/01/07",
        updatedAt: "2024/03/06",
        hasICP: "yes",
        hasNetSec: "no",
        note: "",
        reference: []
    },
    {
        title: "暮光方块论坛",
        url: "https://bbs.tsfk.top/",
        state: "up",
        createdAt: "2019/02/15",
        updatedAt: "2024/03/08",
        hasICP: "yes",
        hasNetSec: "no",
        note: "",
        reference: []
    },
    {
        title: "像素点之家",
        url: "https://mcbar.club/",
        state: "up",
        createdAt: "2019/07/14",
        updatedAt: "2024/03/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器，百度minecraft吧的替代品",
        reference: []
    },
    {
        title: "小黑资源论坛",
        url: "https://www.blmcpia.com/",
        state: "up",
        createdAt: "2019/10/04",
        updatedAt: "2024/03/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器，主营基岩版",
        reference: []
    },
    {
        title: "苦力怕论坛",
        url: "https://klpbbs.com/",
        state: "up",
        createdAt: "2020/03/01",
        updatedAt: "2024/03/01",
        hasICP: "yes",
        hasNetSec: "yes",
        note: "主营基岩版，含有Java版",
        reference: []
    },
    {
        title: "像素工坊",
        url: "https://www.pixelecraft.com/",
        state: "up",
        createdAt: "2021/01/09",
        updatedAt: "2024/03/06",
        hasICP: "yes",
        hasNetSec: "yes",
        note: "",
        reference: []
    },
    {
        title: "小僵尸论坛",
        url: "https://www.zitbbs.com/",
        state: "up",
        createdAt: "2021/07/20",
        updatedAt: "2024/03/06",
        hasICP: "yes",
        hasNetSec: "no",
        note: "",
        reference: []
    },
    {
        title: "MCPPS",
        url: "https://mcpps.cn/",
        state: "up",
        createdAt: "2022/02/04",
        updatedAt: "2024/03/06",
        hasICP: "yes",
        hasNetSec: "yes",
        note: "",
        reference: []
    },
    {
        title: "PixelBBS",
        url: "https://www.pixelbbs.cn/",
        state: "up",
        createdAt: "2022/08/12",
        updatedAt: "2024/03/06",
        hasICP: "yes",
        hasNetSec: "no",
        note: "收费服务",
        reference: [
            {
                title: "求求你，让我成为你的下一个mcbbs平替论坛",
                url: "https://www.bilibili.com/video/BV1Hr421s7DK"
            }
        ]
    },
    {
        title: "萝卜我的世界论坛",
        url: "https://www.luobomc.top/",
        state: "failure",
        createdAt: "2022/08/28",
        updatedAt: "2024/03/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器",
        reference: [
            {
                title: "我做了个Minecraft论坛？比MCBBS使用简单？ —MC萝卜论坛！",
                url: "https://www.bilibili.com/video/BV1bG411G7Pk"
            }
        ]
    },
    {
        title: "MC-BBS",
        url: "https://mc-bbs.net/",
        state: "down",
        createdAt: "2022/08/30",
        updatedAt: "2024/03/02",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器",
        reference: []
    },
    {
        title: "MCSBBS",
        url: "https://mcsbbs.cn/",
        state: "up",
        createdAt: "2022/09/12",
        updatedAt: "2024/03/04",
        hasICP: "yes",
        hasNetSec: "no",
        note: "",
        reference: []
    },
    {
        title: "美西螈论坛",
        url: "https://www.mcmxy.cn/",
        state: "up",
        createdAt: "2022/11/10",
        updatedAt: "2024/03/06",
        hasICP: "yes",
        hasNetSec: "yes",
        note: "",
        reference: []
    },
    {
        title: "SarBBS",
        url: "https://forum.sarskin.cn/",
        state: "up",
        createdAt: "2023/01/05",
        updatedAt: "2024/03/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器",
        reference: []
    },
    {
        title: "PiboPibo",
        url: "https://www.pibopibo.com/",
        state: "up",
        createdAt: "2023/01/29",
        updatedAt: "2024/03/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器",
        reference: []
    },
    {
        title: "Tinksp",
        url: "https://www.tinksp.com/",
        state: "up",
        createdAt: "2023/02/25",
        updatedAt: "2024/03/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器",
        reference: []
    },
    {
        title: "MCFUN",
        url: "https://www.mcshuo.com/",
        state: "up",
        createdAt: "2023/04/18",
        updatedAt: "2024/03/06",
        hasICP: "yes",
        hasNetSec: "no",
        note: "",
        reference: [
            {
                title: "再见Mcbbs，新生McFun",
                url: "https://mp.weixin.qq.com/s/jIiF39QaG9hgUTtpoYRA0g"
            }
        ]
    },
    {
        title: "MCSBBS",
        url: "https://www.mcsbbs.com/",
        state: "up",
        createdAt: "2023/05/29",
        updatedAt: "2024/03/04",
        hasICP: "no",
        hasNetSec: "no",
        note: "基于Xenforo",
        reference: []
    },
    {
        title: "MCUTC",
        url: "https://bbs.mcutc.cn/",
        state: "down",
        createdAt: "2023/06/17",
        updatedAt: "2024/03/08",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器，有备案号，但无法查询，备案主体已注销",
        reference: []
    },
    {
        title: "末影论坛",
        url: "https://enderbbs.wavemoe.com/",
        state: "up",
        createdAt: "2023/08/28",
        updatedAt: "2024/03/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器",
        reference: []
    },
    {
        title: "ikunmc",
        url: "https://ikunmc.com/",
        state: "up",
        createdAt: "2023/10/28",
        updatedAt: "2024/03/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器",
        reference: []
    },
    {
        title: "SimpBBS",
        url: "https://www.simpbbs.com/",
        state: "up",
        createdAt: "2023/10/28",
        updatedAt: "2024/03/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器",
        reference: []
    },
    {
        title: "MinePixel",
        url: "https://minepixel.flarum.cloud/",
        state: "down",
        createdAt: "2024/01/12",
        updatedAt: "2024/03/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器，使用免费主机",
        reference: [
            {
                title: "Minepixel 论坛招人了！",
                url: "https://www.bilibili.com/video/BV13A4m137tZ"
            }
        ]
    },
    {
        title: "HiMCBBS",
        url: "https://www.himcbbs.com/",
        state: "up",
        createdAt: "2024/01/28",
        updatedAt: "2024/03/09",
        hasICP: "in_progress",
        hasNetSec: "no",
        note: "板块分区丰富，主营Java，含基岩版。",
        reference: [
            {
                title: "我要做一个可以平替MCBBS的论坛！！！快来加入我们吧~",
                url: "https://www.bilibili.com/video/BV1n2421M7yt"
            }
        ]
    },
    {
        title: "方块社区",
        url: "https://www.mineforum.cn/",
        state: "up",
        createdAt: "2024/02/10",
        updatedAt: "2024/03/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器",
        reference: [
            {
                title: "MineForum，一个全新的Minecraft论坛",
                url: "https://www.bilibili.com/video/BV1Hu4m1P7BY"
            }
        ]
    },
    {
        title: "MineSMS",
        url: "https://bbs.minesms.lol/",
        state: "up",
        createdAt: "2024/02/11",
        updatedAt: "2024/03/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器",
        reference: []
    },
    {
        title: "MineTalk",
        url: "https://www.minetalk.cn/",
        state: "down",
        createdAt: "2024/02/12",
        updatedAt: "2024/03/06",
        hasICP: "in_progress",
        hasNetSec: "no",
        note: "非大陆服务器，五百元卖数据库。临时链接：https://www.minebox.store",
        reference: [
            {
                title: "我的世界中文论坛BBS关停，你们要的新论坛来啦",
                url: "https://www.bilibili.com/video/BV1uA4m1G7KL"
            }
        ]
    },
    {
        title: "喵呜MCBBS",
        url: "https://mcbbs.run/",
        state: "failure",
        createdAt: "2024/02/13",
        updatedAt: "2024/03/08",
        hasICP: "yes",
        hasNetSec: "yes",
        note: "",
        reference: []
    },
    {
        title: "CMCBBS",
        url: "https://www.cmcbbs.cn/",
        state: "up",
        createdAt: "2024/02/20",
        updatedAt: "2024/03/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器",
        reference: [
            {
                title: "@你的小蕉呀 的B站动态",
                url: "https://www.bilibili.com/opus/900600276318158885"
            }
        ]
    },
    {
        title: "MineFriend",
        url: "http://feiyutang.cn/",
        state: "up",
        createdAt: "2024/02/20",
        updatedAt: "2024/03/02",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器，原名SC论坛",
        reference: []
    },
    {
        title: "PRT社区平台",
        url: "https://mcprt.cn/",
        state: "up",
        createdAt: "2024/02/20",
        updatedAt: "2024/03/02",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器，主营光影材质包",
        reference: [
            {
                title: "PRT社区 一个主营光影材质包的社区平台！",
                url: "https://www.bilibili.com/video/BV1GJ4m1h7Ly"
            }
        ]
    },
    {
        title: "大家的世界",
        url: "https://bbs.mclqj.site/",
        state: "up",
        createdAt: "2024/02/22",
        updatedAt: "2024/03/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器",
        reference: []
    },
    {
        title: "黑曜石论坛",
        url: "https://mcobs.fun/",
        state: "up",
        createdAt: "2024/02/24",
        updatedAt: "2024/03/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器",
        reference: [
            {
                title: "【黑曜石论坛】mcbbs关站了？我的世界黑曜石论坛欢迎您！",
                url: "https://www.bilibili.com/video/BV1wm411f7W4"
            }
        ]
    },
    {
        title: "MCBBS 2ND",
        url: "https://mcbbs.app/",
        state: "up",
        createdAt: "2024/02/25",
        updatedAt: "2024/03/03",
        hasICP: "in_progress",
        hasNetSec: "no",
        note: "",
        reference: [
            {
                title: "MCBBS 我的世界论坛 2nd已发布！欢迎各位加入我们！",
                url: "https://www.bilibili.com/video/BV1hW421A7dm"
            }
        ]
    },
    {
        title: "potatobbs",
        url: "http://potato.eeeyt.cn/",
        state: "up",
        createdAt: "2024/02/25",
        updatedAt: "2024/03/06",
        hasICP: "yes",
        hasNetSec: "no",
        note: "",
        reference: []
    },
    {
        title: "基岩我的世界中文论坛",
        url: "http://bedrockmcbbs.web1337.net/",
        state: "up",
        createdAt: "2024/02/26",
        updatedAt: "2024/03/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器，使用免费主机",
        reference: []
    },
    {
        title: "青草原MC社区",
        url: "https://qcymc.top/",
        state: "up",
        createdAt: "2024/02/27",
        updatedAt: "2024/03/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器",
        reference: []
    },
    {
        title: "MineNets",
        url: "https://minenets.com/",
        state: "up",
        createdAt: "2024/03/02",
        updatedAt: "2024/03/04",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器",
        reference: [
            {
                title: "不模仿 MCBBS，而是重新定义 MCBBS",
                url: "https://www.bilibili.com/video/BV1Vz421Q7Bz"
            }
        ]
    },
    {
        title: "米饭MCBBS",
        url: "https://www.mcbbs.top/",
        state: "up",
        createdAt: "2024/03/04",
        updatedAt: "2024/03/04",
        hasICP: "yes",
        hasNetSec: "no",
        note: "米饭私人资源站",
        reference: []
    },
    {
        title: "REMCBBS",
        url: "http://www.remcbbs.top:5100/",
        state: "down",
        createdAt: "2024/03/04",
        updatedAt: "2024/03/08",
        hasICP: "no",
        hasNetSec: "no",
        note: "未按规定进行备案",
        reference: []
    }
];







// ============================================================
// 表演选手
// ============================================================
const db_forums_ex = [
    {
        title: "新兴我的世界论坛晋级赛",
        url: "https://mcbbs.rip/",
        updatedAt: "2024/03/06",
        note: "本项目",
        reference: []
    },
    {
        title: "回来吧 MCBBS",
        url: "http://mcbbs.win/",
        archiveUrl: "https://web.archive.org/web/20240302042136/http://mcbbs.win/",
        updatedAt: "2024/03/06",
        note: "真诚祷告",
        reference: []
    },
    {
        title: "这里<b>不是</b> MCBBS",
        url: "https://mcbbs.wang/",
        archiveUrl: "https://web.archive.org/web/20240301071710/https://www.mcbbs.wang/",
        updatedAt: "2024/03/01",
        note: "这里不是MCBBS",
        reference: []
    },
    {
        title: "Minecraft中文综合交流站",
        url: "http://mcforum.wikidot.com/",
        updatedAt: "2024/03/06",
        note: "基于 WikiDot 建立",
        reference: []
    },
    {
        title: "坛破山河在，坟头草木深",
        url: "https://mcbbs.homes/",
        archiveUrl: "https://web.archive.org/web/20240302042152/https://mcbbs.homes/",
        updatedAt: "2024/03/01",
        note: "回来吧MCBBS，千万创作者的精神故乡！",
        reference: []
    },
    {
        title: "您今天 MCBBS 了吗？",
        url: "https://mcbbs.today/",
        archiveUrl: "https://web.archive.org/web/20240302042305/https://mcbbs.today/",
        updatedAt: "2024/03/02",
        note: "如果您今天还没有 MCBBS，那就去楼下看看专为您提供的解决方案吧！",
        reference: []
    },
    {
        title: "一站式 MCBBS 解决方案",
        url: "https://mcbbs.solutions/",
        archiveUrl: "https://archive.org/details/fire-shot-capture-minecraft-mcbbs.solutions",
        updatedAt: "2024/03/04",
        note: "专为您打造的一站式回忆 MCBBS 解决方案，但解决不了一点。",
        reference: []
    },
    {
        title: "回来了 MCBBS",
        url: "http://www.mcbbs.red/",
        archiveUrl: "https://web.archive.org/web/20240304124348/http://www.mcbbs.red/",
        updatedAt: "2024/03/04",
        note: "对应上面的 “回来吧 MCBBS”",
        reference: []
    },
    {
        title: "MCBBS - 我的世界中文论坛",
        url: "https://www.mcbbs.info/",
        archiveUrl: "https://web.archive.org/web/20240306053304/https://www.mcbbs.info/",
        updatedAt: "2024/03/06",
        note: "MCBBS 信息状态，复活 MCBBS！！！",
        reference: []
    },
    {
        title: "玩 MCBBS 导致的",
        url: "https://mcbbs.daozhi.de",
        archiveUrl: "https://web.archive.org/web/20240309114439/https://mcbbs.daozhi.de/",
        updatedAt: "2024/03/09",
        note: "不如玩____",
        reference: []
    }
];
