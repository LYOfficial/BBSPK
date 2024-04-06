// ============================================================
// 晋级赛选手
// ============================================================
const db_forums = [
    {
        title: "MCBBS",
        url: "https://www.mcbbs.net",
        state: "unknow",
        createdAt: "2010/10/30",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "yes",
        note: "直属B站的我的世界中文论坛。",
        reference: []
    },
    {
        title: "最MC",
        url: "http://www.zuimc.com",
        state: "failure",
        createdAt: "2013/04/18",
        updatedAt: "2024/04/05",
        hasICP: "yes",
        hasNetSec: "yes",
        note: "网站处于待出售状态，暂停新用户注册，用户活动基本停止。网站屏蔽了大量机房 IP，存在误伤。",
        reference: []
    },
    {
        title: "网易我的世界论坛",
        url: "https://mc.netease.com",
        state: "up",
        createdAt: "2016/09/20",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "yes",
        note: "由网易运营的我的世界中国版论坛，内嵌于客户端中。目前已禁止客户端以外的用户发帖，且 180 天前的帖子不可见。网易的游戏论坛业务已迁移至网易大神，网易我的世界论坛已基本停止运营。",
        reference: []
    },
    {
        title: "MineBBS",
        url: "https://minebbs.com",
        state: "up",
        createdAt: "2018/03/16",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "no",
        note: "综合性MC论坛，以基岩版服务端资源为主要特色，于今年二月初重启Java版。",
        reference: [
            {
                title: "[MineBBS]何为一个成熟的基岩版社区？",
                url: "https://www.bilibili.com/video/BV1jr4y1u7sD/"
            }
        ]
    },
    {
        title: "九域资源社区",
        url: "https://bbs.mc9y.net",
        state: "up",
        createdAt: "2019/01/07",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "no",
        note: "主营服务器插件。",
        reference: []
    },
    {
        title: "暮光方块论坛",
        url: "https://bbs.tsfk.top",
        state: "up",
        createdAt: "2019/02/15",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "no",
        note: "",
        reference: []
    },
    {
        title: "像素点之家",
        url: "https://mcbar.club",
        state: "up",
        createdAt: "2019/07/14",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器，百度 minecraft 吧的替代品。",
        reference: []
    },
    {
        title: "小黑资源论坛",
        url: "https://www.blmcpia.com",
        state: "up",
        createdAt: "2019/10/04",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器，主营基岩版。",
        reference: []
    },
    {
        title: "苦力怕论坛",
        url: "https://klpbbs.com",
        state: "up",
        createdAt: "2020/03/01",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "yes",
        note: "主营基岩版，含Java版。",
        reference: []
    },
    {
        title: "深空Aurora",
        url: "https://bbs.aurora-sky.top",
        state: "up",
        createdAt: "2020/11/20",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器，Minecraft 基岩版论坛。",
        reference: []
    },
    {
        title: "像素工坊",
        url: "https://www.pixelecraft.com",
        state: "up",
        createdAt: "2021/01/09",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "yes",
        note: "",
        reference: []
    },
    {
        title: "我的世界教育版中文论坛",
        url: "https://www.mceebbs.com",
        state: "up",
        createdAt: "2021/02/23",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: [
            {
                title: "基岩网络科技工作室＆我的世界教育版中文论坛https://www.mceebbs.com正式对外免费开",
                url: "https://www.bilibili.com/read/cv9971960/"
            }
        ]
    },
    {
        title: "小僵尸论坛",
        url: "https://www.zitbbs.com",
        state: "up",
        createdAt: "2021/07/20",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "no",
        note: "",
        reference: [
            {
                title: "MCBBS关站了，于是我们给大家准备了备用站",
                url: "https://www.bilibili.com/video/BV1xm41197Ju/"
            }
        ]
    },
    {
        title: "MCHVH",
        url: "https://mchvh.com",
        state: "up",
        createdAt: "2021/12/30",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: []
    },
    {
        title: "MCPPS",
        url: "https://mcpps.cn",
        state: "up",
        createdAt: "2022/02/04",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "yes",
        note: "",
        reference: []
    },
    {
        title: "我的世界铁路中文社区",
        url: "https://www.mtrbbs.com.cn",
        state: "up",
        createdAt: "2022/02/26",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: [] 
    },
    {
        title: "我的世界UTC论坛",
        url: "https://bbs.mcutc.cn",
        state: "up",
        createdAt: "2022/04/16",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "yes",
        note: "主要发布 Minecraft 衍生资源。",
        reference: [
            {
                title: "MCUTC 我的世界交流论坛！",
                url: "https://www.bilibili.com/video/BV1jh4y1y7pg/"
            },
            {
                title: "MCUTC|全新的我的世界交流社区！",
                url: "https://www.bilibili.com/video/BV1BX4y1n7ew/"
            },
            {
                title: "全新的我的世界交流论坛！界面简洁！无广告！",
                url: "https://www.bilibili.com/video/BV1h8411d7TA/"
            },
            {
                title: "我做了一个全新MC国际版资源论坛，界面简洁，访问迅速!",
                url: "https://www.bilibili.com/video/BV1SC4y1Y7Ha/"
            },
            {
                title: "MCUTC,我的世界资源论坛！欢迎您的访问！",
                url: "https://www.bilibili.com/video/BV1oS421P7XM/"
            },
            {
                title: "MCUTC论坛，欢迎各位开发者和玩家注册，探索无尽可能性，打造你的游戏世界！",
                url: "https://www.bilibili.com/video/BV18W421N7uv/"
            },
            {
                title: "MCUTC论坛宣传，但是是“PVP大佬”？(doge)",
                url: "https://www.bilibili.com/video/BV1aj421D7WK/"
            },
            {
                title: "[MCUTC]新开我的世界论坛，欢迎各位来注册！",
                url: "https://www.bilibili.com/video/BV1Ax421f7Nz/"
            },
            {
                title: "MCUTC论坛，开发者发布资源免费领取MC周边！",
                url: "https://www.bilibili.com/video/BV1vt421h7FG/"
            },
            {
                title: "MCUTCBBS，一个全新的MC资源论坛！发布/转载资源免费送MC周边！",
                url: "https://www.bilibili.com/video/BV1xp421U7Vz/"
            },
            {
                title: "【MCUTC】MC论坛招募管理人员！有企业备案和网安备案！",
                url: "https://www.bilibili.com/video/BV1oJ4m1j7kC/"
            }
        ]
    },
    {
        title: "我的世界铁路中文论坛",
        url: "https://www.mtrbbs.top",
        state: "up",
        createdAt: "2022/05/15",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: []
    },
    {
        title: "MineTalk",
        url: "https://minebox.store",
        state: "up",
        createdAt: "2022/06/06",
        updatedAt: "2024/04/03",
        hasICP: "yes",
        hasNetSec: "no",
        note: "Java版与基岩版论坛。",
        reference: [
            {
                title: "我的世界中文论坛BBS关停，你们要的新论坛来啦",
                url: "https://www.bilibili.com/video/BV1uA4m1G7KL/"
            },
            {
                title: "关于被污蔑“贩卖用户数据”的回应",
                url: "https://www.bilibili.com/opus/906490304257851416/"
            },
            {
                title: "MCBBS已死，快来迁移数据到这里保护你的数据！",
                url: "https://www.bilibili.com/video/BV1jx42117Yd/"
            },
            {
                title: "MC论坛版主招募：主人哥哥们快来啊啊啊！！！",
                url: "https://www.bilibili.com/video/BV1Et421G7hu/"
            },
            {
                title: "MCBBS-MineTalk论坛搬运组招募，加入可得免费周边！",
                url: "https://www.bilibili.com/video/BV1sJ4m177JZ/"
            },
            {
                title: "MineTalk？贵坛用一个月阐释了什么叫一场闹剧",
                url: "https://www.bilibili.com/video/BV1Gm411k7jv/"
            },
            {
                title: "论坛推荐：MineTalk中文论坛，MC玩家必备！",
                url: "https://www.bilibili.com/video/BV15f421f7Ju/"
            },
            {
                title: "MCBBS已死，快来迁移你的账号数据！",
                url: "https://www.bilibili.com/video/BV1J1421U7z2/"
            }
        ]
    },
    {
        title: "氧气社区",
        url: "https://bbs.oxygenstudio.cn",
        state: "up",
        createdAt: "2022/07/25",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "no",
        note: "",
        reference: [] 
    },
    {
        title: "像素世界论坛",
        url: "https://www.pixelbbs.cn",
        state: "up",
        createdAt: "2022/08/12",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "no",
        note: "收费服务。",
        reference: [
            {
                title: "求求你，让我成为你的下一个mcbbs平替论坛",
                url: "https://www.bilibili.com/video/BV1Hr421s7DK/"
            },
            {
                title: "MCBBS回来了？不！新世界中文论坛！",
                url: "https://www.bilibili.com/video/BV1HF4m1c7MN/"
            }
        ]
    },
    {
        title: "萝卜我的世界论坛",
        url: "https://www.luobomc.top",
        state: "down",
        createdAt: "2022/08/28",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: [
            {
                title: "我做了个Minecraft论坛？比MCBBS使用简单？ —MC萝卜论坛！",
                url: "https://www.bilibili.com/video/BV1bG411G7Pk/"
            }
        ]
    },
    {
        title: "MC-BBS",
        url: "https://mc-bbs.net",
        state: "down",
        createdAt: "2022/08/30",
        updatedAt: "2024/04/03",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。域名被墙。",
        reference: []
    },
    {
        title: "MCSbbs",
        url: "https://mcsbbs.cn",
        state: "up",
        createdAt: "2022/09/12",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "no",
        note: "",
        reference: []
    },
    {
        title: "美西螈论坛",
        url: "https://www.mcmxy.cn",
        state: "up",
        createdAt: "2022/11/10",
        updatedAt: "2024/04/03",
        hasICP: "in_progress",
        hasNetSec: "no",
        note: "正在重新备案。",
        reference: []
    },
    {
        title: "SarBBS",
        url: "https://forum.sarskin.cn",
        state: "up",
        createdAt: "2023/01/05",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: [
            {
                title: "新起的MC论坛——",
                url: "https://www.bilibili.com/video/BV1xy421z729/"
            }
        ]
    },
    {
        title: "DoMInecraftBBS",
        url: "https://www.domcbbs.cn",
        state: "close",
        createdAt: "2023/01/23",
        closedAt: "2024/02/23",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: [] 
    },
    {
        title: "PiboPibo论坛",
        url: "https://www.pibopibo.com",
        state: "up",
        createdAt: "2023/01/29",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: []
    },
    {
        title: "Tinksp资源论坛",
        url: "https://www.tinksp.com",
        state: "up",
        createdAt: "2023/02/25",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: [
            {
                title: "一个名不见经传的 我的世界资源论坛",
                url: "https://www.bilibili.com/video/BV1dJ4m187Tj/"
            }
        ]
    },
    {
        title: "McFun",
        url: "https://www.mcshuo.com",
        state: "up",
        createdAt: "2023/04/18",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "no",
        note: "论坛页面（https://www.mcshuo.com/forum.php）标题曾出现 “苦力怕论坛”，网站关键词曾出现 “苦力怕论坛官网”。",
        reference: [
            {
                title: "再见Mcbbs，新生McFun",
                url: "https://mp.weixin.qq.com/s/jIiF39QaG9hgUTtpoYRA0g"
            },
            {
                title: "2024/03/13 论坛页面存档（见上方备注）",
                url: "https://web.archive.org/web/20240312164744/https://www.mcshuo.com/forum.php/"
            }
        ]
    },
    {
        title: "我的世界服务器论坛",
        url: "https://www.mcsbbs.com",
        state: "up",
        createdAt: "2023/05/29",
        updatedAt: "2024/04/05",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: []
    },
    {
        title: "末影论坛",
        url: "https://enderbbs.wavemoe.com",
        state: "up",
        createdAt: "2023/08/28",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: []
    },
    {
        title: "ikunmc",
        url: "https://www.ikunmc.com",
        state: "up",
        createdAt: "2023/10/28",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: []
    },
    {
        title: "SimpBBS",
        url: "https://www.simpbbs.com",
        state: "up",
        createdAt: "2023/10/28",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: []
    },
    {
        title: "Hi世界Minecraft论坛",
        url: "https://www.himcbbs.net",
        state: "up",
        createdAt: "2024/01/28",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "no",
        note: "主营Java版，含基岩版。",
        reference: [
            {
                title: "我要做一个可以平替MCBBS的论坛！！！快来加入我们吧~",
                url: "https://www.bilibili.com/video/BV1n2421M7yt/"
            },
            {
                title: "一个可以替代MCBBS的网站！",
                url: "https://www.bilibili.com/video/BV13r42187th/"
            },
            {
                title: "HiMCBBS大更新 快来加入我们~",
                url: "https://www.bilibili.com/video/BV1VA4m1P7Dy/"
            },
            {
                title: "【余人劫】⚡为什么会变成这样呢？⚡",
                url: "https://www.bilibili.com/video/BV1AA4m1P7rd/"
            },
            {
                title: "MCBBS没了，找不到资源？MC老玩家们组成的论坛欢迎你！已备案不跑路~",
                url: "https://www.bilibili.com/video/BV1iK421Y7RQ/"
            }
        ]
    },
    {
        title: "方块社区",
        url: "https://mineforum.cn",
        state: "up",
        createdAt: "2024/02/10",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: [
            {
                title: "方块社区 —— 一个 Minecraft 交流平台",
                url: "https://www.bilibili.com/video/BV1KK421x7FQ/"
            }
        ]
    },
    {
        title: "MineCSMS",
        url: "https://bbs.minesms.lol",
        state: "up",
        createdAt: "2024/02/11",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: []
    },
    {
        title: "画了个圈中文资源站",
        url: "https://mcbbs.run",
        state: "close",
        createdAt: "2024/02/13",
        closedAt: "2024/04/02",
        updatedAt: "2024/04/02",
        hasICP: "yes",
        hasNetSec: "yes",
        note: "已改为云计算产品交流论坛。",
        reference: []
    },
    {
        title: "CMCBBS",
        url: "https://www.cmcbbs.cn",
        state: "close",
        createdAt: "2024/02/20",
        closedAt: "2024/04/05",
        updatedAt: "2024/04/06",
        hasICP: "no",
        hasNetSec: "no",
        note: "因摄政被强制要求关站，已被墙。",
        reference: [
            {
                title: "@你的小蕉呀 的动态 - 哔哩哔哩",
                url: "https://www.bilibili.com/opus/900600276318158885/"
            }
        ]
    },
    {
        title: "EmeraldBBS",
        url: "http://feiyutang.cn",
        state: "close",
        createdAt: "2024/02/20",
        closedAt: "2024/03/24",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器，原名MineFriend，SC论坛。2024/03/24 改为 Minecraft 镜像下载站，现改为StoneMCBBS，使用 WordPress 搭建。",
        reference: [
            {
                title: "闲来无事搭建的MC论坛（？",
                url: "https://www.bilibili.com/video/BV1TZ42127wN/"
            },
            {
                title: "『Emerald论坛』我们开始恢复MCBBS的资源了？",
                url: "https://www.bilibili.com/video/BV1KH4y1s7aN/"
            }
        ]
    },
    {
        title: "PRT幻界轨迹社区",
        url: "https://mcprt.cn",
        state: "up",
        createdAt: "2024/02/20",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器，主营光影材质包。",
        reference: [
            {
                title: "【minecraft PRT社区】快来白嫖众多光影材质包，patrix,乐高材质包，PTGI光影，全清晰度免费下载！！！",
                url: "https://www.bilibili.com/video/BV1GJ4m1h7Ly/"
            }
        ]
    },
    {
        title: "SodaMC",
        url: "https://sodamc.com",
        state: "up",
        createdAt: "2024/02/20",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "yes",
        note: "综合性社区。",
        reference: []
    },
    {
        title: "大家的世界",
        url: "https://bbs.mclqj.site",
        state: "up",
        createdAt: "2024/02/22",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: [
            {
                title: "自建的我的世界论坛",
                url: "https://www.bilibili.com/video/BV1uA4m137rL/"
            }
        ]
    },
    {
        title: "黑曜石论坛",
        url: "https://mcobs.fun",
        state: "up",
        createdAt: "2024/02/24",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: [
            {
                title: "【黑曜石论坛】mcbbs关站了？我的世界黑曜石论坛欢迎您！",
                url: "https://www.bilibili.com/video/BV1wm411f7W4/"
            },
            {
                title: "【黑曜石论坛】初来乍到，欢迎访问Minecraft黑曜石论坛！",
                url: "https://www.bilibili.com/video/BV1jr421H7JN/"
            }
        ]
    },
    {
        title: "MCBBS 2nd",
        url: "https://mcbbs.app",
        state: "up",
        createdAt: "2024/02/25",
        updatedAt: "2024/04/01",
        hasICP: "in_progress",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: [
            {
                title: "MCBBS 我的世界论坛 2nd已发布！欢迎各位加入我们！",
                url: "https://www.bilibili.com/video/BV1hW421A7dm/"
            },
            {
                title: "【MCBBS 2nd】熟悉的感觉，从新做起！mcbbs.app",
                url: "https://www.bilibili.com/video/BV16W421A77X/"
            },
            {
                title: "我的世界论坛兼容手机端啦！支持网页版！欢迎各位加入我们呐~",
                url: "https://www.bilibili.com/video/BV1jH4y1W7tr/"
            }
        ]
    },
        {
        title: "MINEBBS",
        url: "https://www.minebbs.cc/",
        state: "up",
        createdAt: "2024/02/23",
        updatedAt: "2024/04/04",
        hasICP: "no",
        hasNetSec: "no",
        note: "海外服务器，Cloudflare加速。",
        reference: []
    },
    {
        title: "potatobbs",
        url: "http://potato.eeeyt.cn",
        state: "down",
        createdAt: "2024/02/25",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "no",
        note: "由于违规被河北省公安反诈中心拦截。",
        reference: [
            {
                title: "我的世界土豆论坛-刚开没多久的论坛 欢迎来搬运mcbbs的资源",
                url: "https://www.bilibili.com/video/BV1QS421w7cp/"
            }
        ]
    },
    {
        title: "青草原MC社区",
        url: "https://qcymc.top",
        state: "down",
        createdAt: "2024/02/27",
        updatedAt: "2024/04/03",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: []
    },
    {
        title: "MineNets",
        url: "https://minenets.com",
        state: "up",
        createdAt: "2024/03/02",
        updatedAt: "2024/04/01",
        hasICP: "in_progress",
        hasNetSec: "in_progress",
        note: "非大陆服务器。",
        reference: [
            {
                title: "“不模仿 MCBBS，而是重新定义 MCBBS”?",
                url: "https://www.bilibili.com/video/BV1Vz421Q7Bz/"
            },
            {
                title: "新的MCBBS",
                url: "https://www.bilibili.com/video/BV1xz421Q7R1/"
            },
            {
                title: "什么 BYD 论坛,❤️❤️爱了爱了",
                url: "https://www.bilibili.com/video/BV1TF4m1w7cR/"
            },
            {
                title: "过个正经的愚人节 - MineNets",
                url: "https://www.bilibili.com/video/BV1TD421j7Ka/"
            }
        ]
    },
    {
        title: "米饭MCBBS",
        url: "https://www.mcbbs.top",
        state: "up",
        createdAt: "2024/03/04",
        updatedAt: "2024/04/01",
        hasICP: "yes",
        hasNetSec: "no",
        note: "我的世界资源站。",
        reference: []
    },
    {
        title: "REMCBBS",
        url: "https://www.remcbbs.com",
        state: "up",
        createdAt: "2024/03/04",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: [
            {
                title: "REMCBBS开站公告",
                url: "https://www.bilibili.com/video/BV1Rx42127fw/"
            },
            {
                title: "【Minecraft】MCBBS复兴有望？新一代MC社区！",
                url: "https://www.bilibili.com/video/BV1w2421u7ym/"
            },
            {
                title: "REMCBBS，国内新一代Minecraft开源社区",
                url: "https://www.bilibili.com/video/BV1oi421o7PT/"
            },
            {
                title: "【mcbbs】remcbbs情况汇报，新一届MC论坛。mcbbs复兴有望！",
                url: "https://www.bilibili.com/video/BV1q1421S75B/"
            },
            {
                title: "【REmcbbs】我的世界论坛重大更新",
                url: "https://www.bilibili.com/video/BV1Tu4m1M7KQ/"
            }
        ]
    },
    {
        title: "星辰论坛",
        url: "https://www.mcbbs.website",
        state: "down",
        createdAt: "2024/03/13",
        updatedAt: "2024/04/03",
        hasICP: "yes",
        hasNetSec: "no",
        note: "域名被墙。",
        reference: [
            {
                title: "我的世界中文论坛-星辰论坛开站",
                url: "https://www.bilibili.com/read/cv32076977/"
            }
        ]
    },
    {
        title: "NWBBS新世界中文论坛",
        url: "https://nwbbs.cn",
        state: "up",
        createdAt: "2024/03/16",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: [
            {
                title: "MCBBS回来了？不！新世界中文论坛！",
                url: "https://www.bilibili.com/video/BV1t2421N7bB/"
            }
        ]
    },
    {
        title: "MC星空社",
        url: "https://www.ufacai.top",
        state: "up",
        createdAt: "2024/03/18",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: [
            {
                title: "我的世界交流社区网站！！mc社区",
                url: "https://www.bilibili.com/video/BV1nx4y1D7r2/"
            }
        ]
    },
    {
        title: "BetaMC",
        url: "https://www.betamc.net",
        state: "up",
        createdAt: "2024/03/22",
        updatedAt: "2024/04/01",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: []
    },
    {
        title: "MCBBS 3rd",
        url: "https://mcbbs.asia",
        state: "up",
        createdAt: "2024/04/02",
        updatedAt: "2024/04/04",
        hasICP: "no",
        hasNetSec: "no",
        note: "非大陆服务器。",
        reference: []
    }
];







// ============================================================
// 表演赛选手
// * 这里请根据添加时间排序，而不是网站创建时间（因为不可考）
// ============================================================
const db_forums_ex = [
    {
        title: "新兴我的世界论坛晋级赛",
        url: "https://mcbbs.rip",
        updatedAt: "2024/03/21",
        note: "本项目。",
        reference: []
    },
    {
        title: "回来吧 MCBBS",
        url: "http://mcbbs.win",
        archiveUrl: "https://web.archive.org/web/20240302042136/http://mcbbs.win/",
        updatedAt: "2024/03/21",
        note: "真诚祷告。",
        reference: []
    },
    {
        title: "这里<b>不是</b> MCBBS",
        url: "https://mcbbs.wang",
        archiveUrl: "https://web.archive.org/web/20240301071710/https://www.mcbbs.wang/",
        updatedAt: "2024/03/21",
        note: "这里不是 MCBBS。",
        reference: []
    },
    {
        title: "Minecraft中文综合交流站",
        url: "http://mcforum.wikidot.com",
        updatedAt: "2024/03/21",
        note: "基于 WikiDot 建立。",
        reference: []
    },
    {
        title: "坛破山河在，坟头草木深",
        url: "https://mcbbs.homes",
        archiveUrl: "https://web.archive.org/web/20240302042152/https://mcbbs.homes/",
        updatedAt: "2024/03/21",
        note: "回来吧MCBBS，千万创作者的精神故乡！",
        reference: []
    },
    {
        title: "您今天 MCBBS 了吗？",
        url: "https://mcbbs.today",
        archiveUrl: "https://web.archive.org/web/20240302042305/https://mcbbs.today/",
        updatedAt: "2024/03/21",
        note: "如果您今天还没有 MCBBS，那就去楼下看看专为您提供的解决方案吧！",
        reference: []
    },
    {
        title: "一站式 MCBBS 解决方案",
        url: "https://mcbbs.solutions",
        archiveUrl: "https://archive.org/details/fire-shot-capture-minecraft-mcbbs.solutions",
        updatedAt: "2024/03/21",
        note: "专为您打造的一站式回忆 MCBBS 解决方案，但解决不了一点。",
        reference: []
    },
    {
        title: "MCBBS 纪念站",
        url: "http://www.mcbbs.red",
        archiveUrl: "https://web.archive.org/web/20240310130700/https://www.mcbbs.red/",
        updatedAt: "2024/03/21",
        note: "MCBBS 网页快照。",
        reference: []
    },
    {
        title: "MCBBS - 我的世界中文论坛",
        url: "https://www.mcbbs.info",
        archiveUrl: "https://web.archive.org/web/20240306053304/https://www.mcbbs.info/",
        updatedAt: "2024/03/21",
        note: "MCBBS 信息状态，复活 MCBBS！！！",
        reference: []
    },
    {
        title: "玩 MCBBS 导致的",
        url: "https://mcbbs.daozhi.de",
        archiveUrl: "https://web.archive.org/web/20240309114439/https://mcbbs.daozhi.de/",
        updatedAt: "2024/03/21",
        note: "不如玩____",
        reference: []
    },
    {
        title: "MCBBS UK",
        url: "http://mcbbs.uk",
        archiveUrl: "https://web.archive.org/web/20240310060053/http://mcbbs.uk/",
        updatedAt: "2024/03/21",
        note: "MCBBS in the UK.",
        reference: []
    },
    {
        title: "MCBBS 活着",
        url: "https://mcbbs.life",
        archiveUrl: "https://web.archive.org/web/20240310112317/https://mcbbs.life/",
        updatedAt: "2024/03/21",
        note: "MCBBS 还活着！😭😭😭",
        reference: []
    },
    {
        title: "基岩我的世界中文论坛",
        url: "http://bedrockmcbbs.web1337.net",
        updatedAt: "2024/03/21",
        note: "使用FreeFlarum。",
        reference: [
            {
                title: "自搭的MC论坛:BedrockMCBBS",
                url: "https://www.bilibili.com/video/BV1uZ42117iK/"
            }
        ]
    },
    {
        title: "MCBBS帖子存档",
        url: "https://bbs-archive.github.io",
        updatedAt: "2024/03/21",
        note: "MCBBS部分帖子的存档，持续收集中！恭喜牢坛打赢复活赛！",
        reference: []
    },
    {
        title: "Hiluobo萝卜论坛&方块宇宙",
        url: "https://hiluobo.flarum.cloud",
        updatedAt: "2024/03/24",
        note: "使用FreeFlarum。",
        reference: []
    },
    {
        title: "土豆社区",
        url: "https://bbs2.potatokj.top",
        updatedAt: "2024/03/24",
        note: "使用FreeFlarum。",
        reference: []
    },
    {
        title: "BOF-Minecraft中文交流论坛",
        url: "https://laojiang.freeflarum.com",
        updatedAt: "2024/03/26",
        note: "使用FreeFlarum。",
        reference: []
    },
    {
        title: "复活牢坛",
        url: "https://bbs.7c7.icu",
        archiveUrl: "https://web.archive.org/web/20240401165314/https://bbs.7c7.icu/",
        updatedAt: "2024/03/31",
        note: "诸位冒险家们，从3月32日开始，特别公告！在■■斡旋下，我须弥谨此刻之时，宣告一大喜讯。备份渠道现已被轻启，可轻启链接：bbs.7c7.icu/laotan。愿此神奇链接，为你们带来无尽冒险与欢笑。前行吧，勇敢的旅行者们！",
        reference: []
    },
    {
        title: "StoneMCBBS",
        url: "http://feiyutang.cn",
        updatedAt: "2024/04/04",
        note: "非大陆服务器，原名MineFriend，SC论坛，曾用名EmeraldBBS。2024/03/24 改为 Minecraft 镜像下载站，现改为StoneMCBBS，使用 WordPress 搭建。",
        reference: [
            {
                title: "闲来无事搭建的MC论坛（？",
                url: "https://www.bilibili.com/video/BV1TZ42127wN/"
            },
            {
                title: "『Emerald论坛』我们开始恢复MCBBS的资源了？",
                url: "https://www.bilibili.com/video/BV1KH4y1s7aN/"
            }
        ]
    }
];
