<template>
  <div>
    <div class="common_main_container">
      <div class="content" id="app">
        <div class="wheel_mainbg_item"></div>
        <div class="common_initializing_item" v-if="wechatRedirectingFlag"></div>
        <div class="wheel_realpage_container" v-show="!wechatRedirectingFlag">
          <!--<img id="pointer" src='../image/wheel/pointer_00000.png' style="display: none"/>-->
          <div class="header">
            <div class="nav">
              <div class="left">
                <a @click="" class="a">
                  活动规则
                </a>
                <!--<a>{{accessToken}}</a>-->
              </div>
              <div class="right">
                <a @click="" class="a">
                  我的奖品
                </a>
              </div>
              <!--{{window.webkit?window.webkit:''}}-->
            </div>
            <div class="chance">
              <div class="decoration">
                <span class="left">
                  <i></i>
                  <label></label>
                </span>
                <span class="right">
                  <label></label>
                  <i></i>
                </span>
              </div>
              <p>
                <!--{{checkEnvironment()==='android'?window.android.getToken():''}}-->
                <!--<div>点击</div>-->
                <label v-if="!dailyTimesFlag">点击转盘开始抽奖</label>
                <label v-else>您有<span>{{dailyTimes!==-1?dailyTimes:'无限'}}</span>次领奖机会</label>

              </p>
            </div>

          </div>

          <div class="wheel_wrapper">
            <div class="wheel">
              <canvas :height="remUnit*13.5" :width="remUnit*13.5" id="wheelcanvas">抱歉！浏览器不支持。</canvas>

              <a @click="" class="begin" v-if="!alreadyReleasedPrize&&!alreadyReceivedPrize">
                <!--<span>开始抽奖</span>-->
              </a>
              <a @click="" class="continue" v-else>
                <!--<span>领取奖品</span>-->
              </a>
            </div>
            <div class="prizechance">
              <h1>点击右上角“<span>分享</span>”可以额外获得领奖机会</h1>
              <label>每邀请一位用户参与抽奖，获得一次抽奖机会</label>
            </div>
          </div>

          <div class='common_blocktitle_item'>
            <div>
              <span></span>
              <i></i>
            </div>
            <p>中奖名单</p>
            <div>
              <i></i>
              <span></span>
            </div>
          </div>
          <div class="winninglist">
            <!--            <ul>-->
            <!--              <li v-for="item in rewardRecordList">-->
            <!--                <label>恭喜{{item.loginId.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</label>-->
            <!--                <span>免费获得"{{item.rewardName}}"奖品</span>-->
            <!--              </li>-->
            <!--            </ul>-->
          </div>
        </div>
        <CommonLoading :loading="loading"/>
      </div>
    </div>


  </div>

</template>

<script>
  import Cookies from 'js-cookie'

  export default {
    name: "Wheel",
    data() {
      return {
        $domainUrl: 'localhost',
        getUserInfoByTokenRequest: 'uaa/user',
        oauthTokenRequest: 'uaa/oauth/token',
        getActivityInfoRequest: 'promotion-service/1.0.0/rotary_table_activity/getActivityInfo',
        participate_activityRequest: 'promotion-service/1.0.0/rotary_table_activity/participate_activity',
        verificationCodeRequest: 'message-service/1.0.0/sms/verificationCode',

        queryRewardTraceRequest: 'promotion-service/1.0.0/rotary_table_activity/queryRewardTrace',
        queryRewardTraceByLoginIdRequest: 'promotion-service/1.0.0/rotary_table_activity/queryRewardTraceByLoginIdRequest',


        getSignatureRequest: 'account-service/1.0.0/weChat/getSignature',

        participate_accept_rewardRequest: 'promotion-service/1.0.0/rotary_table_activity/participate_accept_reward',

        get_daily_numberRequest: 'promotion-service/1.0.0/activity_participate_number/get_daily_number',


        // accept_rewardRequest: 'promotion-service/1.0.0/rotary_table_activity/accept_reward',


        // accessToken: '1fac3597-fb4c-4c55-aefe-8439bd3c17fa',
        accessToken: '',
        statisticImageUrl: '',

        wechatRedirectingFlag: true,
        loading: false,
        smsCodeState: false,


        jsCookieInstance: Cookies,
        redirectInfo: '',
        downloadUrl: '',
        colorDictionary: ['#feebcd', '#ffb54c'],
        textColorDictionary: ['#C21515', '#feebcd'],
        dotsColorDictionary: ['#ffd800', '#fe9166'],
        prizeTypeDictionary: [{
          name: '趣豆',
          code: 'coin',
          unit: ''
        }, {
          name: '积分',
          code: 'point',
          unit: ''
        }, {
          name: '百视通会员卡',
          code: 'bes_tv',
          unit: ''
        }, {
          name: 'third_link',
          code: 'third_link',
          unit: ''
        }],
        wheelData: [{
          name: '比萨饼',
          value: 10,
          image: 'https://pic5.40017.cn/01/000/79/0a/rBLkBVpVuxmAUQqmAAARnUFXcFc487.png'
        }, {
          name: '酱肘子',
          value: 20,
          image: 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png'
        }, {
          name: '红烧肉',
          value: 30,
          image: 'http://pic.c-ctrip.com/platform/online/home/un_index_supply.png'
        }, {
          name: '炖排骨',
          value: 30,
          image: 'http://resource.fnvalley.com/test/icon/1534327599157.jpeg-style_100x100'
        }, {
          name: '小鸡炖蘑菇',
          value: 30,
          image: 'http://resource.fnvalley.com/test/icon/1534327599157.jpeg-style_100x100'
        }, {
          name: '牛排',
          value: 30,
          image: 'http://resource.fnvalley.com/test/icon/1534327599157.jpeg-style_100x100'
        }],
        sponsor: [{
          name: ''
        }],
        activityInfo: {},
        wheelCanvas: {},
        remUnit: 0,
        canvasWidth: '400px',
        canvasHeight: '400px',
        canvasReadyFlag: false,
        rotatingFlag: false,
        verificationCode: '',
        rotateDuration: 3000,
        dialogFlag: false,
        phoneNumber: '',
        phoneNumberReceiveFlag: false,
        tokenReceiveFlag: false,
        loginToGetPrizeFlag: false,
        loginToGetPrizeListFlag: false,
        smsCodeCountDown: 0,
        smsCodeCountDownDuration: 60,
        rewardRecordList: [],
        productToken: '',
        prizeData: {},
        alreadyReleasedPrize: false,
        alreadyReceivedPrize: false,
        rewardCode: '',
        actualRotate: 0,
        dailyLimit: '',
        pageFingerPrint: '',
        environment: '',
        stateCodeData: {},
        openId: '',
        loginId: '',
        userInfo: {},

        dailyTimes: 0,
        dailyTimesFlag: false,
        channel: '',
        activityId: '',
        accessTokenReadyFlag: false,
        testString: 'xxx',
        routing: false
      }
    },
    computed: {
      // activityId() {
      //   return this.$route.query.activityId || '';
      // },

      identityCode() {
        // return this.$route.query.state;
        return ''
      },
      wechatAuthCode() {
        // return this.$route.query.code
        return ''
      },
      stateCode() {
        // return this.$route.query.state
        return ''
      },
    },
    watch: {
      remUnit(value) {
        this.$nextTick(() => {
          this.canvasWidth = value * 13.5 + 'px';
          this.canvasHeight = value * 13.5 + 'px';
        })
      },
      weChatAuthorityURL(value) {
        console.log(value)
      },
      wechatRedirectingFlag(value) {
        if (!value) {
        }
      },
      alreadyReleasedPrize(value) {
        this.$nextTick(() => {
          this.$sessionStorage().setItem('alreadyReleasedPrize', value)
        })
      },
      alreadyReceivedPrize(value) {
        this.$nextTick(() => {
          this.$sessionStorage().setItem('alreadyReceivedPrize', value)
        })
      },
      rewardCode(value) {
        this.$sessionStorage().setItem('rewardCode', value)
      },
      activityRewardMappingId(value) {
        this.$sessionStorage().setItem('activityRewardMappingId', value)
      },
      prizeData(value) {
        console.log('prizeData', value);
        this.$sessionStorage().removeItem('prizeData');
        this.$sessionStorage().setItem('prizeData', JSON.stringify(value))
      },
      dailyLimit(value) {
        // alert(value)
        this.$sessionStorage().setItem('dailyLimit', value)
      },
      redirectInfo(value) {
        // alert(value)
        console.log(value)

      },
      // accessToken(value) {
      //   if (value !== '') {
      //     this.$sessionStorage().setItem('wheel-accessToken', value)
      //   }
      // },
      accessTokenReadyFlag(value) {

      },
      loginId(value) {
        this.channel = value;
      },
      channel(value) {
        // alert('set channel+ ' + value)
        Cookies.set('wheel-channel', value)
      },
      activityId(value) {
        this.$sessionStorage().setItem('activityId', value)
      }
    },
    beforeCreate() {
      // this.channel = this.$route.query.channel || '';
      this.activityId = ''
      // alert(this.activityId)
    },
    beforeMount() {
      // let fullPath = window.location.href;


      // if (window.location.href.indexOf('#/') === window.location.href.length - 2) {
      //   window.assign()
      // }

    },
    mounted() {


    },
    methods: {
      $sessionStorage() {
        return {
          getItem: name => {
            return this.globalData[name]
          },
          setItem: (name, data) => {
            this.globalData[name] = data
          },
          removeItem: name => {
            this.globalData[name] = undefined
          }
        }

      }
    }
  }


</script>
<style scoped lang="scss">
  @import '../../sass/reset.scss';
  @import '../../sass/common.scss';
  @import '../../sass/wheel.scss';

</style>
