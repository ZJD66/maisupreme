<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div v-if="this.imglist.length!=0" class="pic-box">
                                <ProductZoomer :baseImages="images" :base-zoomer-options="zoomerOptions">
                                </ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease " :class="{'is-disabled':num==1}">
                                                        <i @click="num==1?1:num--" class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase" :class="{'is-disabled':num==goodsinfo.stock_quantity}">
                                                        <i @click="num<goodsinfo.stock_quantity?num++:goodsinfo.stock_quantity" class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input v-model="num" autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="isShow=true" :class="{selected:isShow}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="isShow=false" :class="{selected:!isShow}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div v-html="goodsinfo.content" class="tab-content entry" :style="{display: isShow?'block':'none'}">

                            </div>
                            <div class="tab-content" :style="{display: !isShow?'block':'none'}">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="commentContent" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="error" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="messageList.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in messageList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page :total="totalcount" :page-size="pageSize" show-elevator @on-change="pagechange($event)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <router-link :to="'/goodinfo/'+item.id">
                                            <div class="img-box">
                                                <a href="#/site/goodsinfo/90" class="">
                                                    <img :src="item.img_url">
                                                </a>
                                            </div>
                                        </router-link>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/90" class="">{{item.title}}</a>
                                            <span>{{item.add_time | cutTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
    </div>
</template>
<script>
//引入zoom
import ProductZoomer from "vue-product-zoomer";

export default {
  data: function() {
    return {
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      num: 1,
      isShow: "true",
      //评论相关信息
      pageIndex: 1,
      pageSize: 5,
      //评论数据
      messageList: [],
      //总条数
      totalcount: 0,
      commentContent: "",
      images: {
        normal_size: []
      },
      zoomerOptions: {
        zoomFactor: 4,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      }
    };
  },
  components: {
    ProductZoomer
  },
  beforeCreate() {
    // console.log(this.$route.params.id);
  },
  created() {
    //   获取商品详情
    this.getGoodsInfo();
    // 获取评论信息
    this.getcomments();
  },
  methods: {
    // 抽取的公共方法 获取商品详情
    getGoodsInfo() {
      this.imglist = [];
      this.images.normal_size = [];
      this.axios
        .get(`/site/goods/getgoodsinfo/${this.$route.params.id}`)
        .then(response => {
          // handle success
          // console.log(response);
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;
          this.imglist.forEach((v, i) => {
            this.images.normal_size.push({
              id: v.id,
              url: v.original_path
            });
          });
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    },

    // 抽取的公共方法 获取评论信息
    getcomments() {
      this.axios
        .get(
          `site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          // handle success
          //   console.log(response);
          this.messageList = response.data.message;
          this.totalcount = response.data.totalcount;
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    },
    //页码改变
    pagechange(page) {
      this.pageIndex = page;
      this.getcomments();
    },

    //提示弹框
    error() {
      if (this.commentContent == "") {
        this.$Message.error({
          content: "对方不想理你,并且想你抛出了世界上最好的语言",
          closable: true
        });
        return;
      }

      //发表评论
      this.axios.post(`site/validate/comment/post/goods/${this.$route.params.id}`,{
          commenttxt:this.commentContent
      }).then(response=>{
        //   console.log(response);
        if(response.data.status==0){
            //成功了
            //提示用户
             this.$Message.success('太阳当空照,花儿对我笑');
             //重新获取数据 看到了第三页
             // 去第一页
             this.pageIndex = 1 ;
             this.getcomments();
        }
      }).catch(err=>{
        //   console.log(err);
      })
      this.commentContent = '';
    },

    cartAdd() {
      this.$store.commit("buyGood",{
          goodId:this.$route.params.id,//商品id
          goodNum:this.num //商品数量


      });
    }
  },
  watch: {
    $route(to, from) {
      //重新获取商品数据
      this.getGoodsInfo();
      //重新获取评论数据
      this.getcomments();
    }
  }
};
</script>
<style>
@import url("../../node_modules/font-awesome/css/font-awesome.min.css");
.inline-zoomer-zoomer-box {
  width: 368px;
}
.control-box .thumb-list img {
  width: 78px;
  height: 78px;
  margin: 5px;
}
.pic-box .control-box .thumb-list {
  display: flex;
}
.control i {
  text-align: center;
}
</style>


