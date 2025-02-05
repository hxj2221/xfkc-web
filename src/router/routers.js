import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    meta: { title: '登录', noCache: true },
    component: (resolve) => require(['@/views/LoginPage'], resolve),
    hidden: true
  },
  {
    path: '/newlogin',
    meta: { title: '新版登录', noCache: true },
    component: (resolve) => require(['@/views/LoginPage'], resolve),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: (resolve) => require(['@/views/home'], resolve),
        name: 'Dashboard',
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/features/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/features/401'], resolve),
    hidden: true
  },
  {
    path: '/403',
    component: (resolve) => require(['@/views/features/403'], resolve),
    hidden: true
  },
  // {
  //   path: '/game4',
  //   component: (resolve) => require(['@/views/games/game4'], resolve),
  //   name: '竹刻小学徒',
  //   meta: { title: '竹刻小学徒' }
  // },
  // {
  //   path: '/game5',
  //   component: (resolve) => require(['@/views/games/game5'], resolve),
  //   name: '博物馆云游记',
  //   meta: { title: '博物馆云游记' }
  // },
  {
    path: '/lesson',
    component: Layout,
    children: [
      {
        path: 'mylesson',
        component: (resolve) => require(['@/views/lesson/myLesson'], resolve),
        name: 'MyLesson',
        meta: { title: '我的课程' }
      },
      {
        path: 'myclass',
        component: (resolve) => require(['@/views/myclass/myClass'], resolve),
        name: 'Myclass',
        meta: { title: '我的班级' }
      },
      {
        path: 'admclass',
        component: (resolve) => require(['@/views/lesson/admLesson'], resolve),
        name: 'admclass',
        meta: { title: '课程管理' }
      },
      {
        path: 'releaselesson',
        component: (resolve) => require(['@/views/lesson/releaselesson'], resolve),
        name: 'Releaselesson',
        meta: { title: '发布课程' }
      },
      {
        path: 'point',
        component: (resolve) => require(['@/views/point/pointcenter'], resolve),
        name: 'Pointcenter',
        meta: { title: '积分中心' }
      },
      {
        path: 'lessondetail',
        component: (resolve) => require(['@/views/lesson/lessondetail'], resolve),
        name: 'LessonDetail',
        meta: { title: '课程详情' }
      }
    ],
    hidden: true,
    meta: { title: '课程' }
  },
  {
    path: '/grlesson',
    component: Layout,
    children: [
      {
        path: 'grlessonlist',
        component: (resolve) => require(['@/views/lesson/grlessonlist'], resolve),
        name: 'Grlessonlist',
        meta: { title: '精品课程' }
      },
      {
        path: 'grreleaselesson',
        component: (resolve) => require(['@/views/lesson/grreleaselesson'], resolve),
        name: 'Grreleaselesson',
        meta: { title: '发布课程' }
      },
      {
        path: 'grpoint',
        component: (resolve) => require(['@/views/point/grpointcenter'], resolve),
        name: 'Grpointcenter',
        meta: { title: '积分中心' }
      },
      {
        path: 'grlessondetail',
        component: (resolve) => require(['@/views/lesson/grlessondetail'], resolve),
        name: 'Grlessondetail',
        meta: { title: '课程详情' }
      },
      {
        path: 'grmyClass',
        component: (resolve) => require(['@/views/myclass/grmyClass'], resolve),
        name: 'gr我的班级',
        meta: { title: '我的班级' }
      },
      {
        path: 'gradmlesson',
        component: (resolve) => require(['@/views/lesson/gradmLesson'], resolve),
        name: 'Gradmlesson',
        meta: { title: '课程管理' }
      },
      {
        path: 'gradmlesson',
        component: (resolve) => require(['@/views/myclass/grmyClass'], resolve),
        name: 'gr我的班级',
        meta: { title: '我的班级' }
      }
    ],
    hidden: true,
    meta: { title: '课程' }
  },
  {
    path: '/challenge',
    component: Layout,
    children: [
      {
        path: 'challenge',
        component: (resolve) => require(['@/views/challenge/challenge'], resolve),
        name: 'Challenge',
        meta: { title: '我的挑战' }
      },
      {
        path: 'index',
        component: (resolve) => require(['@/views/challenge/index'], resolve),
        name: 'Index',
        meta: { title: '挑战中心' }
      },
      {
        path: 'admchallenge',
        component: (resolve) => require(['@/views/challenge/admChallenge'], resolve),
        name: 'Admchallenge',
        meta: { title: '挑战中心' }
      },
      {
        path: 'grchallengecenter',
        component: (resolve) => require(['@/views/challenge/grchallengecenter'], resolve),
        name: 'Grchallengecenter',
        meta: { title: '挑战管理' }
      }
    ],
    hidden: true,
    meta: { title: '挑战' }
  },
  {
    path: '/coursesource',
    component: Layout,
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/coursesource/index'], resolve),
        name: 'CoursesourceIndex',
        meta: { title: '课程资源' }
      }
    ]
  },
  {
    path: '/featureCourse',
    component: Layout,
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/featureCourse/index'], resolve),
        name: 'FeatureCourse',
        meta: { title: '课程资源' }
      }
    ]
  },
  {
    path: '/searchResult',
    component: Layout,
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/searchResult/index'], resolve),
        name: 'SearchResult',
        meta: { title: '课程资源' }
      }
    ]
  },
  {
    path: '/searchAll',
    component: Layout,
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/searchAllResult/index'], resolve),
        name: 'SearchAllResult',
        meta: { title: '全站搜索' }
      }
    ]
  },
  {
    path: '/grchallenge',
    component: Layout,
    children: [
      {
        path: 'gradmChallenge',
        component: (resolve) => require(['@/views/challenge/gradmChallenge'], resolve),
        name: 'GradmChallenge',
        meta: { title: '挑战管理' }
      }
    ],
    hidden: true,
    meta: { title: '幼小管理挑战' }
  },
  {
    path: '/achievement',
    component: Layout,
    children: [
      {
        path: 'achievement',
        component: (resolve) => require(['@/views/achievement/achievement'], resolve),
        name: 'Achivement',
        meta: { title: '成就中心' }
      },
      {
        path: 'achievedetail',
        component: (resolve) => require(['@/views/achievement/achievedetail'], resolve),
        name: 'Achievedetail',
        meta: { title: '成就详情' }
      }
    ],
    hidden: true,
    meta: { title: '成就' }
  },
  // {
  //   path: '/lesson',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'mylesson',
  //       component: (resolve) => require(['@/views/lesson/myLesson'], resolve),
  //       name: 'MyLesson',
  //       meta: { title: '我的课程' }
  //     }
  //   ]
  // },
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path*',
  //       component: (resolve) => require(['@/views/features/redirect'], resolve)
  //     }
  //   ]
  // },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: (resolve) => require(['@/views/home'], resolve),
  //       name: 'Dashboard',
  //       meta: { title: '', icon: '', affix: true, noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/achivedetail',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'achivedetail',
  //       component: (resolve) => require(['@/views/achievement/achievedetail'], resolve),
  //       name: 'Achievedetail',
  //       meta: { title: '成就详情' }
  //     }
  //   ]
  // },
  // {
  //   path: '/challengecenter',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'challengecenter',
  //       component: (resolve) => require(['@/views/challenge/index'], resolve),
  //       name: 'challengecenter',
  //       meta: { title: '挑战中心' }
  //     }
  //   ]
  // },
  // {
  //   path: '/lesson',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'lessondetail',
  //       component: (resolve) => require(['@/views/lesson/lessondetail'], resolve),
  //       name: 'lessondetail',
  //       meta: { title: '课程详情' }
  //     }
  //   ]
  // },
  // {
  //   path: '/point',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'pointcenter',
  //       component: (resolve) => require(['@/views/point/pointcenter'], resolve),
  //       name: 'pointcenter',
  //       meta: { title: '积分中心' }
  //     }
  //   ]
  // },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: (resolve) => require(['@/views/system/user/center'], resolve),
        name: '个人中心',
        meta: { title: '个人中心' }
      },
      {
        path: 'time',
        component: (resolve) => require(['@/views/timemachine/timemachine'], resolve),
        name: 'timemachine',
        meta: { title: '时光机' }
      },
      {
        path: 'grtime',
        component: (resolve) => require(['@/views/timemachine/grtimemachine'], resolve),
        name: 'GrTimemachine',
        meta: { title: '时光机' }
      }
    ]
  },
  {
    path: '/Pchallenge',
    component: Layout,
    hidden: true,
    redirect: 'Pchallenge',
    children: [
      {
        path: 'Pchallenge',
        component: (resolve) => require(['@/views/challenge/Pchallenge'], resolve),
        name: '发布挑战',
        meta: { title: '发布挑战' }
      }
    ]
  },
  {
    path: '/excellentCourse',
    component: Layout,
    hidden: true,
    redirect: 'excellentCourse',
    children: [
      {
        path: 'excellentCourse',
        component: (resolve) => require(['@/views/lesson/excellentCourse'], resolve),
        name: '精品课程',
        meta: { title: '精品课程' }
      }
    ]
  },
  {
    path: '/classChallenge',
    component: Layout,
    hidden: true,
    redirect: 'classChallenge',
    children: [
      {
        path: 'classChallenge',
        component: (resolve) => require(['@/views/challenge/classChallenge'], resolve),
        name: '班级挑战',
        meta: { title: '班级挑战' }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    hidden: true,
    redirect: 'message',
    children: [
      {
        path: 'message',
        component: (resolve) => require(['@/views/message/message'], resolve),
        name: '消息中心',
        meta: { title: '消息中心' }
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'news',
        component: (resolve) => require(['@/views/news/news'], resolve),
        name: 'News',
        meta: { title: '课程动态' }
      },
      {
        path: 'newsDetail',
        component: (resolve) => require(['@/views/news/newsDetail'], resolve),
        name: 'newsDetail',
        meta: { title: '新闻详情' }
      }
    ]
  },
  {
    path: '/messageDetil',
    component: Layout,
    hidden: true,
    redirect: 'messageDetil',
    children: [
      {
        path: 'messageDetil',
        component: (resolve) => require(['@/views/message/messageDetil'], resolve),
        name: '消息详情',
        meta: { title: '详情' }
      }
    ]
  },
  {
    path: '/school',
    component: Layout,
    hidden: true,
    redirect: 'school',
    children: [
      {
        path: 'school',
        component: (resolve) => require(['@/views/school/school'], resolve),
        name: '领衔校',
        meta: { title: '领衔校' }
      }
    ]
  },
  {
    path: '/schoolDetil',
    component: Layout,
    hidden: true,
    redirect: 'schoolDetil',
    children: [
      {
        path: 'schoolDetil',
        component: (resolve) => require(['@/views/school/schoolDetil'], resolve),
        name: '学校详情',
        meta: { title: '学校详情' }
      }
    ]
  },
  {
    path: '/DataUpload',
    component: Layout,
    hidden: true,
    redirect: 'DataUpload',
    children: [
      {
        path: 'DataUpload',
        component: (resolve) => require(['@/views/challenge/DataUpload'], resolve),
        name: '挑战详情',
        meta: { title: '挑战详情' }
      }
    ]
  },
  {
    path: '/challengeList',
    component: Layout,
    hidden: true,
    redirect: 'challengeList',
    children: [
      {
        path: 'challengeList',
        component: (resolve) => require(['@/views/challenge/challengeList'], resolve),
        name: '挑战审核',
        meta: { title: '挑战审核' }
      }
    ]
  },
  {
    path: '/teacherExamine',
    component: Layout,
    hidden: true,
    redirect: 'teacherExamine',
    children: [
      {
        path: 'teacherExamine',
        component: (resolve) => require(['@/views/challenge/teacherExamine'], resolve),
        name: '审核',
        meta: { title: '审核' }
      }
    ]
  },
  {
    path: '/lessonLibrary',
    component: Layout,
    hidden: true,
    redirect: 'lessonLibrary',
    children: [
      {
        path: 'lessonLibrary',
        component: (resolve) => require(['@/views/lesson/lessonLibrary'], resolve),
        name: '课程资源库',
        meta: { title: '课程资源库' }
      }
    ]
  },
  {
    path: '/hardware',
    component: Layout,
    hidden: true,
    redirect: 'hardware',
    children: [
      {
        path: 'hardware',
        component: (resolve) => require(['@/views/lesson/hardware'], resolve),
        name: '实践资源库',
        meta: { title: '实践资源库' }
      },
      {
        path: 'practice',
        component: (resolve) => require(['@/views/lesson/excellentCourse'], resolve),
        name: '实践课程',
        meta: { title: '实践课程' }
      }
    ]
  },
  {
    path: '/grachievement',
    component: Layout,
    hidden: true,
    redirect: 'grachievement',
    children: [
      {
        path: 'grachievement',
        component: (resolve) => require(['@/views/achievement/grachievement'], resolve),
        name: '成就中心',
        meta: { title: '成就中心' }
      },
      {
        path: 'grachievedetail',
        component: (resolve) => require(['@/views/achievement/grachievedetail'], resolve),
        name: 'gr成就详情',
        meta: { title: '成就详情' }
      }
    ]
  },
  {
    path: '/grPchallenge',
    component: Layout,
    hidden: true,
    redirect: 'grPchallenge',
    children: [
      {
        path: 'grPchallenge',
        component: (resolve) => require(['@/views/challenge/grPchallenge'], resolve),
        name: '挑战发布',
        meta: { title: '挑战发布' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    hidden: true,
    redirect: 'grhome',
    children: [
      {
        path: 'grhome',
        component: (resolve) => require(['@/views/grhome'], resolve),
        name: '首页',
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/grDataUpload',
    component: Layout,
    hidden: true,
    redirect: 'grDataUpload',
    children: [
      {
        path: 'grDataUpload',
        component: (resolve) => require(['@/views/challenge/grDataUpload'], resolve),
        name: 'gr挑战详情',
        meta: { title: '挑战详情' }
      }
    ]
  },
  {
    path: '/grteacherExamine',
    component: Layout,
    hidden: true,
    redirect: 'grteacherExamine',
    children: [
      {
        path: 'grteacherExamine',
        component: (resolve) => require(['@/views/challenge/grteacherExamine'], resolve),
        name: 'gr审核',
        meta: { title: '审核' }
      }
    ]
  },
  {
    path: '/grmyLesson',
    component: Layout,
    hidden: true,
    redirect: 'grmyLesson',
    children: [
      {
        path: 'grmyLesson',
        component: (resolve) => require(['@/views/lesson/grmyLesson'], resolve),
        name: 'gr我的课程',
        meta: { title: '我的课程' }
      }
    ]
  },
  {
    path: '/grmessage',
    component: Layout,
    hidden: true,
    redirect: 'grmessage',
    children: [
      {
        path: 'grmessage',
        component: (resolve) => require(['@/views/message/grmessage'], resolve),
        name: 'gr消息中心',
        meta: { title: '消息中心' }
      }
    ]
  },
  {
    path: '/grlessonLibrary',
    component: Layout,
    hidden: true,
    redirect: 'grlessonLibrary',
    children: [
      {
        path: 'grlessonLibrary',
        component: (resolve) => require(['@/views/lesson/grlessonLibrary'], resolve),
        name: 'gr课程资源库',
        meta: { title: '课程资源库' }
      }
    ]
  },
  {
    path: '/grhardware',
    component: Layout,
    hidden: true,
    redirect: 'grhardware',
    children: [
      {
        path: 'grhardware',
        component: (resolve) => require(['@/views/lesson/grhardware'], resolve),
        name: '实践资源库',
        meta: { title: '实践资源库' }
      }
    ]
  },
  {
    path: '/grchallengeList',
    component: Layout,
    hidden: true,
    redirect: 'grchallengeList',
    children: [
      {
        path: 'grchallengeList',
        component: (resolve) => require(['@/views/challenge/grchallengeList'], resolve),
        name: 'gr挑战审核',
        meta: { title: '挑战审核' }
      }
    ]
  },
  {
    path: '/grschool',
    component: Layout,
    hidden: true,
    redirect: 'grschool',
    children: [
      {
        path: 'grschool',
        component: (resolve) => require(['@/views/school/grschool'], resolve),
        name: 'gr优秀校展示',
        meta: { title: '领衔校' }
      },
      {
        path: 'grschoolDetil',
        component: (resolve) => require(['@/views/school/grschoolDetil'], resolve),
        name: 'gr学校详情',
        meta: { title: '学校详情' }
      }
    ]
  },
  {
    path: '/grnews',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'grnews',
        component: (resolve) => require(['@/views/news/grnews'], resolve),
        name: 'grNews',
        meta: { title: '课程动态' }
      },
      {
        path: 'grnewsDetail',
        component: (resolve) => require(['@/views/news/grnewsDetail'], resolve),
        name: 'grnewsDetail',
        meta: { title: '新闻详情' }
      }
    ]
  },
  {
    path: '/grchallenge',
    component: Layout,
    hidden: true,
    redirect: 'grchallenge',
    children: [
      {
        path: 'grchallenge',
        component: (resolve) => require(['@/views/challenge/grchallenge'], resolve),
        name: 'fr我的挑战',
        meta: { title: '我的挑战' }
      }
    ]
  },
  {
    path: '/telUs',
    component: Layout,
    redirect: 'telUs',
    children: [
      {
        path: 'telUs',
        component: (resolve) => require(['@/views/aboutUs/telUs'], resolve),
        name: '联系我们',
        meta: { title: '联系我们' }
      }
    ]
  },
  {
    path: '/grtelUs',
    component: Layout,
    redirect: 'grtelUs',
    children: [
      {
        path: 'grtelUs',
        component: (resolve) => require(['@/views/aboutUs/grtelUs'], resolve),
        name: 'gr联系我们',
        meta: { title: '联系我们' }
      }
    ]
  },
  {
    path: '/we',
    component: Layout,
    children: [
      {
        path: 'we',
        component: (resolve) => require(['@/views/we/we'], resolve),
        name: '关于我们',
        meta: { title: '关于我们' }
      }
    ]
  },
  {
    path: '/grwe',
    component: Layout,
    children: [
      {
        path: 'grwe',
        component: (resolve) => require(['@/views/we/grwe'], resolve),
        name: '关于我们',
        meta: { title: '关于我们' }
      }
    ]
  },
  {
    path: '/helpCenter',
    component: Layout,
    redirect: 'helpCenter',
    children: [
      {
        path: 'helpCenter',
        component: (resolve) => require(['@/views/helpCenter/helpCenter'], resolve),
        name: '帮助中心',
        meta: { title: '帮助中心' }
      }
    ]
  },
  {
    path: '/grhelpCenter',
    component: Layout,
    redirect: 'grhelpCenter',
    children: [
      {
        path: 'grhelpCenter',
        component: (resolve) => require(['@/views/helpCenter/grhelpCenter'], resolve),
        name: 'gr帮助中心',
        meta: { title: '帮助中心' }
      }
    ]
  },
  {
    path: '/games',
    component: Layout,
    redirect: 'games',
    hidden: true,
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/games/index'], resolve),
        name: '交互课程',
        meta: { title: '交互课程' }
      },
      {
        path: 'game1',
        component: (resolve) => require(['@/views/games/game1'], resolve),
        name: '嘉定孔庙行',
        meta: { title: '嘉定孔庙行' }
      },
      {
        path: 'game2',
        component: (resolve) => require(['@/views/games/game2'], resolve),
        name: '51号兵站小老大',
        meta: { title: '51号兵站小老大' }
      },
      {
        path: 'game3',
        component: (resolve) => require(['@/views/games/game3'], resolve),
        name: '嘉定第一个女共产党员陈君起',
        meta: { title: '嘉定第一个女共产党员陈君起' }
      },
      {
        path: 'game4',
        component: (resolve) => require(['@/views/games/game4'], resolve),
        name: '竹刻小学徒',
        meta: { title: '竹刻小学徒' }
      },
      {
        path: 'game5',
        component: (resolve) => require(['@/views/games/game5'], resolve),
        name: '博物馆云游记',
        meta: { title: '博物馆云游记' }
      }
    ]
  },
  {
    path: '/grgames',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'grindex',
        component: (resolve) => require(['@/views/grgames/grindex'], resolve),
        name: '交互课程',
        meta: { title: '交互课程' }
      },
      {
        path: 'grgame1',
        component: (resolve) => require(['@/views/grgames/grgame1'], resolve),
        name: '嘉定孔庙行',
        meta: { title: '嘉定孔庙行' }
      },
      {
        path: 'grgame2',
        component: (resolve) => require(['@/views/grgames/grgame2'], resolve),
        name: '51号兵站小老大',
        meta: { title: '51号兵站小老大' }
      },
      {
        path: 'grgame3',
        component: (resolve) => require(['@/views/grgames/grgame3'], resolve),
        name: '嘉定第一个女共产党员陈君起',
        meta: { title: '嘉定第一个女共产党员陈君起' }
      }
    ]
  },
  {
    path: '/bigData',
    component: Layout,
    children: [
      {
        path: 'bigData',
        name: 'BigData',
        component: () => import('@/views/bigData/bigData'),
        meta: {
          title: '大数据',
          restrictUser: 'admin445'
        }
      },
      {
        path: 'grbigData',
        name: 'GrBigData',
        component: () => import('@/views/bigData/grbigData'),
        meta: {
          title: '大数据',
          restrictUser: 'admin445'
        }
      }
    ]
  },
  {
    path: '/myAchievement',
    component: Layout,
    redirect: 'myAchievement',
    children: [
      {
        path: 'myAchievement',
        component: (resolve) => require(['@/views/achievement/myAchievement'], resolve),
        name: '我的成就',
        meta: { title: '我的成就' }
      }
    ]
  },
  {
    path: '/grmyAchievement',
    component: Layout,
    redirect: 'grmyAchievement',
    children: [
      {
        path: 'grmyAchievement',
        component: (resolve) => require(['@/views/achievement/grmyAchievement'], resolve),
        name: 'gr我的成就',
        meta: { title: '我的成就' }
      }
    ]
  },
  {
    path: '/hardDetail',
    component: Layout,
    redirect: 'hardDetail',
    children: [
      {
        path: 'hardDetail',
        component: (resolve) => require(['@/views/lesson/hardDetail'], resolve),
        name: '硬件详情',
        meta: { title: '硬件详情' }
      }
    ]
  },
  {
    path: '/grhardDetail',
    component: Layout,
    redirect: 'grhardDetail',
    children: [
      {
        path: 'grhardDetail',
        component: (resolve) => require(['@/views/lesson/grhardDetail'], resolve),
        name: 'gr硬件详情',
        meta: { title: '硬件详情' }
      }
    ]
  },
  {
    path: '/activity',
    component: Layout,
    redirect: 'activity',
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/activity/index'], resolve),
        name: '活动详情',
        meta: { title: '活动详情' }
      },
      {
        path: 'vote',
        component: (resolve) => require(['@/views/activity/vote'], resolve),
        name: 'vote',
        meta: { title: '投票' }
      }
    ]
  }
  // {
  //   path: '/activity',
  //   component: (resolve) => require(['@/views/activity/index'], resolve),
  //   hidden: true
  // },
  // {
  //   path: '/vote',
  //   component: (resolve) => require(['@/views/activity/vote'], resolve),
  //   hidden: true
  // }
]

export default new Router({
  mode: 'hash',
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
