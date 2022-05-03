<template>
  <div class="index" style="position: absolute ;height: 100%;width: 100%; " id="se">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">疫情</el-menu-item>
      <el-menu-item index="2">和学博</el-menu-item>
      <el-menu-item index="3">18027240065</el-menu-item>
      <el-menu-item index="4" @click="See('http://localhost:84/ToGNYQ')">国内疫情图</el-menu-item>
      <el-menu-item index="5" @click="see2('http://localhost:84/ToGWYQ')">国外疫情图</el-menu-item>
      <el-menu-item index="6" @click="see3('http://localhost:84/toMain')">简化版</el-menu-item>
<!--      <el-menu-item index="6" class="i1"><a>登录</a></el-menu-item>-->
<!--      <el-menu-item index="7" class="i2"><a>注册</a></el-menu-item>-->
    </el-menu>

    <vue-particles id="particles-js"
                   color="#555"
                   :particleOpacity="0.7"
                   :particlesNumber="160"
                   shapeType="circle"
                   :particleSize="10"
                   linesColor="#555"
                   :linesWidth="1"
                   :lineLinked="true"
                   :lineOpacity="0.5"
                   :linesDistance="150"
                   :moveSpeed="2"
                   :hoverEffect="false"
                   hoverMode="grab"
                   :clickEffect="false"
                   clickMode="push"
                   class="li"/>

    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

        <el-menu router :default-active='$route.path' style="opacity: 0.5">
          <el-submenu v-for="(item,index) in router" :index="index+''" :key="index">
            <template slot="title"><i class="el-icon-setting"><a style="opacity: 1">{{ item.name }}</a></i></template>
            <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path" :key="index2"
            >{{ item2.name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view>

        </router-view>
      </el-main>
    </el-container>


  </div>
</template>

<script>


export default {
  data() {
    return {
      currentMenu: '',
      router: ""
    }
  },

  methods: {
    See(e) {
      window.location.href = e
    },
    see2(e) {
      window.location.href = e
    },
    see3(e) {
      window.location.href = e
    }
  },
  created() {
    this.router = this.$router.options.routes.filter(i => {
      return i.meta
    })
  },

  name: "index"
}
</script>

<style scoped>

#se {
  /*background-image: url("../static/image/star1.jpg");*/
}

#q1 {
  float: right;
}

#se {
  height: 100%;

}


.i1 {
  float: right;
}

.i2 {
  float: right;
}

#q2 {
  float: right;
}

.index {


}

#particles-js {
  opacity: 0.7;
  width: 100%;
  height: calc(100%);
  position: absolute;
}
</style>
