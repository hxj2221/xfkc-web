export const data = {
  bg: require('../../assets/game2/01游戏开始.png'),
  selects: [{
    title: '开始互动课程',
    next: {
      cg: require('../../assets/video/01游戏开始视频.mp4'),
      next: {
        bg: require('../../assets/game2/02.png'),
        selects: [{
          title: '查看情报',
          next: {
            bg: require('../../assets/game2/02.png'),
            text: '情报：日军侵占苏南地区后，尤其是日军在军事上不定期的进行清乡扫荡，在经济上一方面强行压价收购当地生产的蚕丝、棉花和粮食等；另一方面禁止贩运任何生活用品到抗日根据地，实行经济封锁，致使当地农村条件十分艰苦。新四军指战员的条件更为艰苦，既没有军费来源，还要不断抵抗日伪军的清乡扫荡，“江抗”部队急需军用和民用物资支援！',
            next: {
              bg: require('../../assets/game2/03.png'),
              selects: [{
                title: '收到任务，请查看',
                next: {
                  bg: require('../../assets/game2/03.png'),
                  chats: [{
                    message: '为“江抗”部队筹集急需的物资：包括药物、粮食和其它工业品。'
                  }],
                  selects: [{
                    title: '接受任务',
                    next: {
                      bg: require('../../assets/game2/05.png'),
                      text: '请把任务交给我，我一定可以为苏区筹集到充足的物资！',
                      next: {
                        bg: require('../../assets/game2/04.png'),
                        text: '怎样把各种物资，通过苏州河、黄浦江、长江上层层封锁检查的日伪军岗哨，以及沿途土匪恶霸拦路抢劫，从上海运到长江北岸的皖江抗日根据地呢',
                        next: {
                          bg: require('../../assets/game2/07.png'),
                          selects: [{
                            title: '争取时间，直接用货车运输',
                            tip: '商队运输被识破，货物损失，运输队员跳河逃生，请回到前面再次选择。'
                          }, {
                            title: '敌人狡猾，伪装出发',
                            next: {
                              bg: require('../../assets/game2/08.png'),
                              selects: [{
                                title: '看来还是要走水路，我们可以伪装成外国货轮',
                                tip: '货轮被人发现船长是华人，被伪军敲诈勒索了大半物资。看来这不是个好选择，请重新作出决定。'
                              }, {
                                title: '不入虎穴，焉得虎子，我想办法伪装成日本商队',
                                next: {
                                  bg: require('../../assets/game2/09.png'),
                                  chats: [{
                                    avatar: require('../../assets/koutu/vlcsnap-2022-09-25-11h22m39s186.png'),
                                    message: '吉冈顾问，我的生意需要大一点的货船，需要顾问你支持啊。'
                                  }],
                                  selects: [{
                                    title: '您的军舰可以带上我的货吗？这样不尽快，成本还低',
                                    next: {
                                      bg: require('../../assets/game2/09.png'),
                                      chats: [{
                                        avatar: require('../../assets/koutu/456副本.png'),
                                        message: '不行，那样会被人发现的，这个办法不行！你再想想办法！'
                                      }],
                                      back: true
                                    }
                                  }, {
                                    title: '我可以租你们的退役军舰。',
                                    next: {
                                      bg: require('../../assets/game2/09.png'),
                                      chats: [{
                                        avatar: require('../../assets/koutu/vlcsnap-2022-09-25-11h22m39s186.png'),
                                        message: '只要你动用两艘军舰帮着运货，其他业务上的事你不必操心，你该得到的，分文不少。'
                                      }, {
                                        avatar: require('../../assets/koutu/456副本.png'),
                                        message: '我们的军舰不能夹带货物，你可以考虑退役军舰，我可以调用两艘退役的日本军舰支持你，这样大家都没风险，一起发财！哈哈哈'
                                      }, {
                                        avatar: require('../../assets/koutu/vlcsnap-2022-09-25-11h22m39s186.png'),
                                        message: '成交！'
                                      }],
                                      text: '盛慕莱利用德国商船与日本退伍的军舰将采购的大量军用和民用物资，从上海运往新四军江南抗日义勇军建立了一条从皖江革命根据地到上海的地下交通线。',
                                      next: {
                                        bg: require('../../assets/game2/10.png'),
                                        next: {
                                          bg: require('../../assets/game2/11.png'),
                                          next: {
                                            bg: require('../../assets/game2/12.png'),
                                            next: {
                                              bg: require('../../assets/game2/16.png'),
                                              next: {
                                                bg: require('../../assets/game2/17.png'),
                                                next: {
                                                  bg: require('../../assets/game2/18.png'),
                                                  next: {
                                                    bg: require('../../assets/game2/21.png'),
                                                    next: {
                                                      bg: require('../../assets/game2/19.png'),
                                                      next: {
                                                        bg: require('../../assets/game2/20.png'),
                                                        next: {
                                                          bg: require('../../assets/game2/22.png'),
                                                          selects: [{
                                                            title: '查看情报',
                                                            next: {
                                                              bg: require('../../assets/game2/22.png'),
                                                              text: '蒋介石撕毁了“双十协定”，国共内战爆发，上海强权当道，物价飞涨，民不聊生。',
                                                              next: {
                                                                bg: require('../../assets/game2/23.png'),
                                                                selects: [{
                                                                  title: '接受新任务',
                                                                  next: {
                                                                    bg: require('../../assets/game2/23.png'),
                                                                    text: '把上海的革命干部和军需设备、医疗物资运往解放区。',
                                                                    next: {
                                                                      bg: require('../../assets/game2/24.png'),
                                                                      selects: [{
                                                                        title: '陆路运输',
                                                                        tip: '敌人在关键道路上部署了重兵拦截，没有成功'
                                                                      }, {
                                                                        title: '海路运输',
                                                                        next: {
                                                                          bg: require('../../assets/game2/26.png'),
                                                                          text: '1949年5月9日，盛慕莱为了策反更多的国民党参加共产党，不幸被捕。敌人对他严刑拷打，他始终未透露一个字。同年5月24日，盛慕莱英勇地倒在了黎明前的黑暗中。',
                                                                          next: {
                                                                            cg: require('../../assets/video/END01.mp4'),
                                                                            next: {
                                                                              bg: require('../../assets/game2/END02.png'),
                                                                              text: '在盛慕莱牺牲三天后，上海解放。解放后他被追认为烈士。在上海嘉定革命烈士陵园，依旧能看到静静刻在墓碑上的名字——盛慕莱，激励着人们为理想前行。',
                                                                              next: {
                                                                                bg: require('../../assets/game2/END02.png'),
                                                                                selects: [{
                                                                                  title: '获得成就'
                                                                                }]
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }, {
                                                                        title: '继续观察，待机而动',
                                                                        tip: '时间错过，解放区造成了损失'
                                                                      }]
                                                                    }
                                                                  }
                                                                }]
                                                              }
                                                            }
                                                          }]
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }]
                                }
                              }]
                            }
                          }]
                        }
                      }
                    }
                  }]
                }
              }]
            }
          }
        }]
      }
    }
  },
  {
    title: '关于互动课程',
    next: {
      back: true,
      bg: require('../../assets/game2/01游戏开始.png'),
      text: '51号兵站小老大互动视频互动课程版采用当下流行的AVG游戏方式，用动人心弦的革命斗争故事加上音乐、CG，玩家通过角色动作或者语言的分支选项来干预互动课程进程，互动性较强。'
    }
  }]
}
