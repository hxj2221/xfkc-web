export const data = {
  bg: require('../../assets/game3/1.png'),
  selects: [{
    title: '开始互动课程',
    next: {
      cg: require('../../assets/video/陈君起片头.mp4'),
      next: {
        bg: require('../../assets/game3/1.png'),
        test: '1904年初春，一位姑娘为了反抗包办婚姻，从嘉定南翔陈太史府里逃了出来，她叫陈君起。从此，陈君起历经坎坷，追随光明，成为嘉定的第一位共产党员。在本互动课程里，同学们可以体验陈君起在探索中国女性独立和社会解放道路上不屈不挠，在中国革命的艰难征程中英勇无畏的历程。',
        selects: [{
          title: '继续课程',
          next: {
            bg: require('../../assets/game3/02.png'),
            text: '1885年，陈君起出生在嘉定南翔的一个豪绅之家。二十世纪初社会变革风起云涌，19岁的陈君起开始向往外面的世界，而父亲却在此时为她安排了一门亲事。对方是当地富绅的儿子，品行不端，人尽皆知。陈君起在所有反抗都失败的情况下，毅然选择离家出走！',
            next: {
              bg: require('../../assets/game3/02.png'),
              chats: [{
                message: '什么，你们为我 安排好了亲事？'
              }, {
                message: '他是镇上大户人家的孩子，和你是良配。'
              }, {
                message: '我不要嫁给他，他就是一个五毒俱全的人!'
              }, {
                message: '你已经19岁了，父母之命，不得反抗，半个月后你就要结婚。'
              }],
              next: {
                bg: require('../../assets/game3/01.png'),
                selects: [{
                  title: '选择陆路',
                  tip: '被家里安排的人手拦住，被关回家中。请另找出路'
                }, {
                  title: '选择水路',
                  next: {
                    bg: require('../../assets/game3/vlcsnap-2022-10-05-20h37m50s152.png'),
                    text: '家人没有注意，陈君起顺利逃到了上海。',
                    next: {
                      bg: require('../../assets/game3/03 (2).png'),
                      chats: [{
                        message: '我们国家积弱，外交皆是割地赔款，日俄战争爆发，政府竟然宣布局外中立，划定辽河以东为交战区，任由两个强盗在中国领土上厮杀 。'
                      }, {
                        avatar: require('../../assets/koutu/vlcsnap-2022-10-05-20h39m05s938.png'),
                        message: '我要为国家崛起，民族觉醒而读书！'
                      }, {
                        message: '各位都要努力！'
                      }],
                      next: {
                        bg: require('../../assets/game3/03.png'),
                        text: '毕业后，陈君起不顾周围异样的眼光，只身前往南京的一所小学做女教师，成为那个时代少有的独立新女性。',
                        next: {
                          bg: require('../../assets/game3/03.png'),
                          chats: [{
                            avatar: require('../../assets/koutu/vlcsnap-2022-10-05-20h39m05s938.png'),
                            message: '我要去南京担任小学女教师，成为一个独立新女性，传授先进思想!'
                          }],
                          next: {
                            bg: require('../../assets/game3/vlcsnap-2022-10-05-20h38m17s981.png'),
                            text: '她结识了同窗曾琮的哥哥曾科进，两人自由恋爱结婚，并孕育了一双儿女。不料，曾家也是封建思想根深蒂固的大家庭，在一次严重冲突后，陈君起带着儿子离开了这个家。',
                            next: {
                              bg: require('../../assets/game3/图片1.png'),
                              selects: [{
                                title: '忍气吞声',
                                tip: '陈君起为了家庭忍气吞声，却在家中备受欺凌，她觉得再也无法忍受。请重新选择'
                              }, {
                                title: '坚决反抗',
                                next: {
                                  bg: require('../../assets/game3/vlcsnap-2022-10-05-20h38m53s907.png'),
                                  chats: [{
                                    avatar: require('../../assets/koutu/123副本.png'),
                                    message: '你嫁给了我，就要一切都听从父母，不得看这些乱党书籍，更不得上街参加那些乱党活动。'
                                  }, {
                                    avatar: require('../../assets/koutu/vlcsnap-2022-10-05-20h38m53s907副本.png'),
                                    message: '我有独立人格，我带着儿子走，我来抚养他。'
                                  }],
                                  next: {
                                    bg: require('../../assets/game3/图片2.png'),
                                    text: '拥有了人生阅历的支撑和民主思想的洗礼，陈君起这次的“逃离”更为自信和彻底。她深切体会到旧社会女性所遭受的压迫和屈辱，此后她的一生，都在为妇女运动和解放事业奔走呼号。',
                                    next: {
                                      bg: require('../../assets/game3/7.png'),
                                      chats: [{
                                        message: '我志愿加入中国共产党，坚决执行党的决议，遵守党的纪律，不怕困难，不怕牺牲，为共产主义事业奋斗到底。'
                                      }],
                                      next: {
                                        bg: require('../../assets/game3/vlcsnap-2022-10-05-20h39m12s696.png'),
                                        text: '她因参加革命斗争先后两次被捕。1927年4月13日牺牲于南京。',
                                        next: {
                                          cg: require('../../assets/video/陈君起结尾.mp4'),
                                          next: {
                                            bg: require('../../assets/game3/vlcsnap-2022-10-05-20h39m05s938.png'),
                                            text: '墨云惊鸿，梅蕊留芳！作为嘉定的第一位共产党员、中共南京早期党组织成员，陈君起的光辉事迹永为后来者所追念，散发着永远的清芬！',
                                            next: {
                                              bg: require('../../assets/game3/vlcsnap-2022-10-05-20h39m05s938.png'),
                                              selects: [{
                                                title: '获得成就'
                                              }]
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }]
                            }
                          }
                        }
                      }
                    }
                  }
                }]
              }
            }
          }
        }]
      }
    }
  }]
}
